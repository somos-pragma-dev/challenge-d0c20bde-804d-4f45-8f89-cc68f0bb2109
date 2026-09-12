import { Injectable } from '@nestjs/common';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

export interface PaymentTransaction {
  transactionId: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  customerId: string;
  paymentToken?: string;
  cardLastFour?: string;
  cardBrand?: string;
  gatewayResponse?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface PaymentAuthorizationResult {
  authorized: boolean;
  transactionId: string;
  authorizationCode?: string;
  amount: number;
  currency: string;
  message: string;
  gatewayResponse: Record<string, unknown>;
}

export interface PaymentCaptureResult {
  captured: boolean;
  transactionId: string;
  capturedAmount: number;
  message: string;
  gatewayResponse: Record<string, unknown>;
}

export interface RefundRequest {
  transactionId: string;
  amount?: number;
  reason: string;
}

export interface RefundResult {
  refunded: boolean;
  refundId: string;
  transactionId: string;
  refundedAmount: number;
  message: string;
  gatewayResponse: Record<string, unknown>;
}

export interface PaymentServicePort {
  authorizePayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult>;
  capturePayment(transactionId: string, amount?: number): Promise<PaymentCaptureResult>;
  refundPayment(refundRequest: RefundRequest): Promise<RefundResult>;
  getTransactionStatus(transactionId: string): Promise<PaymentTransaction>;
  processPayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult>;
}

export const PAYMENT_SERVICE_TOKEN = 'PaymentService';

@Injectable()
export abstract class PaymentServiceAdapter implements PaymentServicePort {
  async authorizePayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult> {
    throw new Error('Method not implemented');
  }

  async capturePayment(transactionId: string, amount?: number): Promise<PaymentCaptureResult> {
    throw new Error('Method not implemented');
  }

  async refundPayment(refundRequest: RefundRequest): Promise<RefundResult> {
    throw new Error('Method not implemented');
  }

  async getTransactionStatus(transactionId: string): Promise<PaymentTransaction> {
    throw new Error('Method not implemented');
  }

  async processPayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult> {
    throw new Error('Method not implemented');
  }
}