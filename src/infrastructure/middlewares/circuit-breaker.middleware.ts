import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosInstance, AxiosError } from 'axios';

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  resetTimeout: number;
}

interface CircuitMetrics {
  failures: number;
  successes: number;
  lastFailureTime: number;
  nextAttempt: number;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private config: CircuitBreakerConfig;
  private metrics: CircuitMetrics;
  private httpClient: AxiosInstance;

  constructor(
    private readonly serviceName: string,
    config?: Partial<CircuitBreakerConfig>,
  ) {
    this.config = {
      failureThreshold: config?.failureThreshold ?? 5,
      successThreshold: config?.successThreshold ?? 2,
      timeout: config?.timeout ?? 60000,
      resetTimeout: config?.resetTimeout ?? 30000,
    };
    this.metrics = {
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      nextAttempt: 0,
    };
    this.httpClient = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getState(): CircuitState {
    if (this.state === CircuitState.OPEN) {
      const now = Date.now();
      if (now >= this.metrics.nextAttempt) {
        this.transitionTo(CircuitState.HALF_OPEN);
      }
    }
    return this.state;
  }

  private transitionTo(newState: CircuitState): void {
    const previousState = this.state;
    this.state = newState;

    if (newState === CircuitState.HALF_OPEN) {
      this.metrics.nextAttempt = Date.now() + this.config.resetTimeout;
    } else if (newState === CircuitState.CLOSED) {
      this.metrics.failures = 0;
      this.metrics.successes = 0;
    }

    console.log(
      `[CircuitBreaker] ${this.serviceName}: ${previousState} -> ${newState}`,
    );
  }

  async execute<T>(
    operation: () => Promise<T>,
    fallback?: () => Promise<T>,
  ): Promise<T> {
    const currentState = this.getState();

    if (currentState === CircuitState.OPEN) {
      if (fallback) {
        console.log(
          `[CircuitBreaker] ${this.serviceName}: OPEN - executing fallback`,
        );
        return fallback();
      }
      throw new HttpException(
        `Service ${this.serviceName} is currently unavailable`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    try {
      const result = await operation();
      this.recordSuccess();
      return result;
    } catch (error) {
      this.recordFailure(error as Error);

      if (this.state === CircuitState.HALF_OPEN) {
        this.transitionTo(CircuitState.OPEN);
      }

      if (fallback) {
        return fallback();
      }
      throw error;
    }
  }

  private recordSuccess(): void {
    this.metrics.successes++;
    this.metrics.lastFailureTime = 0;

    if (this.state === CircuitState.HALF_OPEN) {
      if (this.metrics.successes >= this.config.successThreshold) {
        this.transitionTo(CircuitState.CLOSED);
      }
    }
  }

  private recordFailure(error: Error): void {
    this.metrics.failures++;
    this.metrics.lastFailureTime = Date.now();

    const axiosError = error as AxiosError;
    const isServerError =
      axiosError.response?.status &&
      axiosError.response.status >= 500;

    if (
      this.state === CircuitState.CLOSED &&
      this.metrics.failures >= this.config.failureThreshold
    ) {
      this.transitionTo(CircuitState.OPEN);
    } else if (this.state === CircuitState.HALF_OPEN && isServerError) {
      this.transitionTo(CircuitState.OPEN);
    }

    console.error(
      `[CircuitBreaker] ${this.serviceName}: Failure recorded. ` +
        `Total failures: ${this.metrics.failures}, State: ${this.state}`,
      error.message,
    );
  }

  getMetrics(): { state: CircuitState; failures: number; successes: number } {
    return {
      state: this.state,
      failures: this.metrics.failures,
      successes: this.metrics.successes,
    };
  }

  reset(): void {
    this.state = CircuitState.CLOSED;
    this.metrics = {
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      nextAttempt: 0,
    };
    console.log(`[CircuitBreaker] ${this.serviceName}: Circuit manually reset`);
  }
}

@Injectable()
export class CircuitBreakerMiddleware implements NestMiddleware {
  private readonly inventoryCircuit: CircuitBreaker;
  private readonly paymentCircuit: CircuitBreaker;

  constructor() {
    this.inventoryCircuit = new CircuitBreaker('inventory-service', {
      failureThreshold: 5,
      successThreshold: 2,
      timeout: 60000,
      resetTimeout: 30000,
    });

    this.paymentCircuit = new CircuitBreaker('payment-service', {
      failureThreshold: 3,
      successThreshold: 1,
      timeout: 30000,
      resetTimeout: 15000,
    });
  }

  use(req: Request, res: Response, next: NextFunction): void {
    (req as any).circuitBreaker = {
      inventory: this.inventoryCircuit,
      payment: this.paymentCircuit,
    };
    next();
  }

  getInventoryCircuit(): CircuitBreaker {
    return this.inventoryCircuit;
  }

  getPaymentCircuit(): CircuitBreaker {
    return this.paymentCircuit;
  }

  getHealthStatus() {
    return {
      inventory: this.inventoryCircuit.getMetrics(),
      payment: this.paymentCircuit.getMetrics(),
    };
  }
}