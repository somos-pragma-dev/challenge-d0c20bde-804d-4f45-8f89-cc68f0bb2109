import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { InsufficientInventoryException } from '@domain/exceptions/insufficient-inventory.exception';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  status: string;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
  traceId?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const traceId = (request.headers['x-trace-id'] as string) || this.generateTraceId();

    const errorResponse = this.buildErrorResponse(exception, request, traceId);

    this.logException(exception, errorResponse, request);

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, request: Request, traceId: string): ErrorResponse {
    const baseResponse: ErrorResponse = {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      status: 'error',
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: 'Internal server error',
      traceId,
    };

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, baseResponse, request);
    }

    if (exception instanceof PaymentFailedException) {
      return this.handlePaymentException(exception, baseResponse, request);
    }

    if (exception instanceof InsufficientInventoryException) {
      return this.handleInventoryException(exception, baseResponse, request);
    }

    if (exception instanceof OrderNotFoundException) {
      return this.handleOrderNotFoundException(exception, baseResponse, request);
    }

    if (exception instanceof QueryFailedError) {
      return this.handleDatabaseException(exception, baseResponse, request);
    }

    if (exception instanceof Error) {
      return {
        ...baseResponse,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message || 'An unexpected error occurred',
        error: exception.name,
      };
    }

    return baseResponse;
  }

  private handleHttpException(exception: HttpException, base: ErrorResponse, request: Request): ErrorResponse {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as Record<string, unknown>).message || exception.message;

    const errorResponse: ErrorResponse = {
      ...base,
      statusCode: status,
      message,
      error: exception.name,
    };

    if (exception instanceof BadRequestException) {
      errorResponse.details = typeof exceptionResponse === 'object' ? (exceptionResponse as Record<string, unknown>).errors : undefined;
    }

    if (exception instanceof NotFoundException) {
      errorResponse.message = `Resource not found: ${request.url}`;
    }

    if (exception instanceof UnauthorizedException) {
      errorResponse.message = 'Authentication required';
    }

    if (exception instanceof ForbiddenException) {
      errorResponse.message = 'Access denied';
    }

    if (exception instanceof ConflictException) {
      errorResponse.message = 'Resource conflict';
    }

    return errorResponse;
  }

  private handlePaymentException(exception: PaymentFailedException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.PAYMENT_REQUIRED,
      message: exception.message,
      error: 'PaymentFailed',
      details: {
        orderId: exception.orderId,
        transactionId: exception.transactionId,
      },
    };
  }

  private handleInventoryException(exception: InsufficientInventoryException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
      error: 'InsufficientInventory',
      details: {
        productId: exception.productId,
        requestedQuantity: exception.requestedQuantity,
        availableQuantity: exception.availableQuantity,
      },
    };
  }

  private handleOrderNotFoundException(exception: OrderNotFoundException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'OrderNotFound',
      details: {
        orderId: exception.orderId,
      },
    };
  }

  private handleDatabaseException(exception: QueryFailedError, base: ErrorResponse, request: Request): ErrorResponse {
    const errorMessage = exception.message;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database operation failed';

    if (errorMessage.includes('duplicate key')) {
      statusCode = HttpStatus.CONFLICT;
      message = 'Resource already exists';
    } else if (errorMessage.includes('violates foreign key constraint')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Referenced resource does not exist';
    } else if (errorMessage.includes('null value')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Required field is missing';
    }

    return {
      ...base,
      statusCode,
      message,
      error: 'DatabaseError',
      details: {
        code: exception.code,
      },
    };
  }

  private logException(exception: unknown, response: ErrorResponse, request: Request): void {
    const logLevel = response.statusCode >= 500 ? 'error' : response.statusCode >= 400 ? 'warn' : 'log';

    const logMessage = {
      level: logLevel,
      message: response.message,
      statusCode: response.statusCode,
      method: request.method,
      path: request.url,
      traceId: response.traceId,
      error: response.error,
      details: response.details,
    };

    if (logLevel === 'error') {
      this.logger.error(JSON.stringify(logMessage), exception instanceof Error ? exception.stack : undefined);
    } else if (logLevel === 'warn') {
      this.logger.warn(JSON.stringify(logMessage));
    } else {
      this.logger.log(JSON.stringify(logMessage));
    }
  }

  private generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}