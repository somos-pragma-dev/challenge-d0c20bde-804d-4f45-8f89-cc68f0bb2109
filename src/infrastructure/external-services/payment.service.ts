import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { PaymentServicePort } from '@domain/ports/payment.service.port';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { PaymentInfo } from '@domain/entities/order.entity';

interface PaymentGatewayResponse {
  transactionId: string;
  status: 'approved' | 'declined' | 'pending' | 'error';
  amount: number;
  currency: string;
  timestamp: string;
  message?: string;
  authorizationCode?: string;
}

interface PaymentGatewayRequest {
  amount: number;
  currency: string;
  paymentMethod: {
    type: 'credit_card' | 'debit_card' | 'wallet';
    token?: string;
    cardLastFour?: string;
  };
  customerId: string;
  orderId: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class PaymentService implements PaymentServicePort {
  private readonly logger = new Logger(PaymentService.name);
  private readonly httpClient: AxiosInstance;
  private readonly gatewayUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;

  constructor(private readonly configService: ConfigService) {
    this.gatewayUrl = this.configService.get<string>('PAYMENT_GATEWAY_URL', 'https://api.payment-gateway.example.com');
    this.apiKey = this.configService.get<string>('PAYMENT_GATEWAY_API_KEY', 'test-api-key');
    this.timeout = this.configService.get<number>('PAYMENT_GATEWAY_TIMEOUT', 5000);

    this.httpClient = axios.create({
      baseURL: this.gatewayUrl,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Client-Version': '1.0.0',
        'X-Request-Id': this.generateRequestId(),
      },
    });

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.logger.error(`Payment gateway error: ${error.message}`, error.stack);
        return Promise.reject(error);
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  async processPayment(paymentInfo: PaymentInfo, orderId: string): Promise<PaymentInfo> {
    this.logger.log(`Processing payment for order ${orderId}, amount: ${paymentInfo.amount}`);

    const request: PaymentGatewayRequest = {
      amount: paymentInfo.amount,
      currency: paymentInfo.currency || 'USD',
      paymentMethod: {
        type: paymentInfo.method === 'credit_card' ? 'credit_card' : 'debit_card',
        token: paymentInfo.token,
        cardLastFour: paymentInfo.cardLastFour,
      },
      customerId: paymentInfo.customerId,
      orderId: orderId,
      metadata: {
        subtotal: paymentInfo.subtotal,
        tax: paymentInfo.tax,
        shippingCost: paymentInfo.shippingCost,
      },
    };

    try {
      const response = await this.httpClient.post<PaymentGatewayResponse>('/v1/transactions', request);
      const gatewayResponse = response.data;

      this.logger.log(`Payment gateway response for order ${orderId}: ${gatewayResponse.status}`);

      if (gatewayResponse.status === 'approved') {
        return {
          ...paymentInfo,
          transactionId: gatewayResponse.transactionId,
          authorizationCode: gatewayResponse.authorizationCode,
          status: 'completed',
          processedAt: new Date(gatewayResponse.timestamp),
          gatewayResponse: gatewayResponse.message,
        };
      } else if (gatewayResponse.status === 'pending') {
        return {
          ...paymentInfo,
          transactionId: gatewayResponse.transactionId,
          status: 'pending',
          processedAt: new Date(gatewayResponse.timestamp),
          gatewayResponse: gatewayResponse.message,
        };
      } else {
        throw new PaymentFailedException(
          gatewayResponse.message || 'Payment was declined by the payment gateway',
          orderId,
          gatewayResponse.transactionId
        );
      }
    } catch (error) {
      if (error instanceof PaymentFailedException) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : error.message;

        if (statusCode === 401) {
          throw new HttpException('Payment gateway authentication failed', HttpStatus.UNAUTHORIZED);
        } else if (statusCode === 429) {
          throw new HttpException('Payment gateway rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
        } else if (statusCode && statusCode >= 500) {
          throw new PaymentFailedException('Payment gateway temporarily unavailable', orderId);
        }

        throw new PaymentFailedException(`Payment gateway error: ${errorMessage}`, orderId);
      }

      throw new PaymentFailedException('Unexpected error processing payment', orderId);
    }
  }

  async refundPayment(transactionId: string, amount: number, reason: string): Promise<{ success: boolean; refundId: string }> {
    this.logger.log(`Processing refund for transaction ${transactionId}, amount: ${amount}`);

    try {
      const response = await this.httpClient.post('/v1/refunds', {
        transactionId,
        amount,
        reason,
        timestamp: new Date().toISOString(),
      });

      const refundData = response.data as { refundId: string; status: string };

      if (refundData.status === 'completed') {
        return { success: true, refundId: refundData.refundId };
      }

      return { success: false, refundId: '' };
    } catch (error) {
      this.logger.error(`Refund failed for transaction ${transactionId}`, error);
      throw new HttpException('Refund processing failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPaymentStatus(transactionId: string): Promise<{ status: string; timestamp: Date }> {
    this.logger.log(`Checking payment status for transaction ${transactionId}`);

    try {
      const response = await this.httpClient.get(`/v1/transactions/${transactionId}`);
      const data = response.data as { status: string; timestamp: string };

      return { status: data.status, timestamp: new Date(data.timestamp) };
    } catch (error) {
      throw new HttpException('Unable to retrieve payment status', HttpStatus.NOT_FOUND);
    }
  }
}