import { HttpException, HttpStatus, HttpResponseOptions } from '@nestjs/common';

export interface PaymentFailureDetails {
  readonly orderId: string;
  readonly customerId: string;
  readonly attemptedAmount: number;
  readonly currency: string;
  readonly paymentMethod: string;
  readonly failureReason: PaymentFailureReason;
  readonly gatewayErrorCode?: string;
  readonly timestamp: Date;
  readonly retryAllowed: boolean;
}

export enum PaymentFailureReason {
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  CARD_EXPIRED = 'CARD_EXPIRED',
  CARD_DECLINED = 'CARD_DECLINED',
  INVALID_CARD = 'INVALID_CARD',
  GATEWAY_UNAVAILABLE = 'GATEWAY_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  FRAUD_DETECTED = 'FRAUD_DETECTED',
  CURRENCY_NOT_SUPPORTED = 'CURRENCY_NOT_SUPPORTED',
  AMOUNT_EXCEEDS_LIMIT = 'AMOUNT_EXCEEDS_LIMIT',
  PAYMENT_METHOD_DISABLED = 'PAYMENT_METHOD_DISABLED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class PaymentFailedException extends HttpException {
  private readonly failureDetails: PaymentFailureDetails;
  private readonly errorCode: string;
  private readonly isRetryable: boolean;
  private readonly originalError?: Error;

  constructor(
    details: PaymentFailureDetails,
    message?: string,
    options?: HttpResponseOptions,
  ) {
    const defaultMessage = `Payment failed for order ${details.orderId}: ${details.failureReason}`;
    const responseMessage = message || defaultMessage;

    const status = PaymentFailedException.determineHttpStatus(details.failureReason);
    const errorResponse = {
      statusCode: status,
      error: 'Payment Failed',
      message: responseMessage,
      errorCode: PaymentFailedException.mapFailureReasonToErrorCode(details.failureReason),
      details: {
        orderId: details.orderId,
        customerId: details.customerId,
        amount: details.attemptedAmount,
        currency: details.currency,
        paymentMethod: details.paymentMethod,
        failureReason: details.failureReason,
        gatewayErrorCode: details.gatewayErrorCode,
        timestamp: details.timestamp.toISOString(),
        retryAllowed: details.retryAllowed,
      },
      timestamp: new Date().toISOString(),
    };

    super(errorResponse, status, options);
    this.failureDetails = details;
    this.errorCode = errorResponse.errorCode;
    this.isRetryable = details.retryAllowed;
  }

  private static determineHttpStatus(reason: PaymentFailureReason): HttpStatus {
    switch (reason) {
      case PaymentFailureReason.INSUFFICIENT_FUNDS:
      case PaymentFailureReason.CARD_EXPIRED:
      case PaymentFailureReason.CARD_DECLINED:
      case PaymentFailureReason.INVALID_CARD:
        return HttpStatus.PAYMENT_REQUIRED;
      case PaymentFailureReason.FRAUD_DETECTED:
        return HttpStatus.FORBIDDEN;
      case PaymentFailureReason.GATEWAY_UNAVAILABLE:
      case PaymentFailureReason.GATEWAY_TIMEOUT:
        return HttpStatus.SERVICE_UNAVAILABLE;
      case PaymentFailureReason.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case PaymentFailureReason.CURRENCY_NOT_SUPPORTED:
      case PaymentFailureReason.AMOUNT_EXCEEDS_LIMIT:
      case PaymentFailureReason.PAYMENT_METHOD_DISABLED:
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private static mapFailureReasonToErrorCode(reason: PaymentFailureReason): string {
    const errorCodeMap: Record<PaymentFailureReason, string> = {
      [PaymentFailureReason.INSUFFICIENT_FUNDS]: 'PAYMENT_INSUFFICIENT_FUNDS',
      [PaymentFailureReason.CARD_EXPIRED]: 'PAYMENT_CARD_EXPIRED',
      [PaymentFailureReason.CARD_DECLINED]: 'PAYMENT_CARD_DECLINED',
      [PaymentFailureReason.INVALID_CARD]: 'PAYMENT_INVALID_CARD',
      [PaymentFailureReason.GATEWAY_UNAVAILABLE]: 'PAYMENT_GATEWAY_UNAVAILABLE',
      [PaymentFailureReason.GATEWAY_TIMEOUT]: 'PAYMENT_GATEWAY_TIMEOUT',
      [PaymentFailureReason.FRAUD_DETECTED]: 'PAYMENT_FRAUD_DETECTED',
      [PaymentFailureReason.CURRENCY_NOT_SUPPORTED]: 'PAYMENT_CURRENCY_NOT_SUPPORTED',
      [PaymentFailureReason.AMOUNT_EXCEEDS_LIMIT]: 'PAYMENT_AMOUNT_EXCEEDS_LIMIT',
      [PaymentFailureReason.PAYMENT_METHOD_DISABLED]: 'PAYMENT_METHOD_DISABLED',
      [PaymentFailureReason.UNAUTHORIZED]: 'PAYMENT_UNAUTHORIZED',
      [PaymentFailureReason.UNKNOWN_ERROR]: 'PAYMENT_UNKNOWN_ERROR',
    };
    return errorCodeMap[reason] || 'PAYMENT_UNKNOWN_ERROR';
  }

  getFailureDetails(): PaymentFailureDetails {
    return { ...this.failureDetails };
  }

  getOrderId(): string {
    return this.failureDetails.orderId;
  }

  getCustomerId(): string {
    return this.failureDetails.customerId;
  }

  getAttemptedAmount(): number {
    return this.failureDetails.attemptedAmount;
  }

  getFailureReason(): PaymentFailureReason {
    return this.failureDetails.failureReason;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  canRetry(): boolean {
    return this.isRetryable;
  }

  isGatewayError(): boolean {
    return (
      this.failureDetails.failureReason === PaymentFailureReason.GATEWAY_UNAVAILABLE ||
      this.failureDetails.failureReason === PaymentFailureReason.GATEWAY_TIMEOUT
    );
  }

  isCardError(): boolean {
    return (
      this.failureDetails.failureReason === PaymentFailureReason.CARD_DECLINED ||
      this.failureDetails.failureReason === PaymentFailureReason.CARD_EXPIRED ||
      this.failureDetails.failureReason === PaymentFailureReason.INVALID_CARD
    );
  }

  isFraudError(): boolean {
    return this.failureDetails.failureReason === PaymentFailureReason.FRAUD_DETECTED;
  }

  getRetryDelay(): number {
    if (!this.isRetryable) {
      return 0;
    }
    if (this.isGatewayError()) {
      return 5000;
    }
    return 0;
  }

  toLoggableObject(): Record<string, unknown> {
    return {
      exception: 'PaymentFailedException',
      orderId: this.failureDetails.orderId,
      customerId: this.failureDetails.customerId,
      amount: this.failureDetails.attemptedAmount,
      currency: this.failureDetails.currency,
      failureReason: this.failureDetails.failureReason,
      errorCode: this.errorCode,
      retryable: this.isRetryable,
      timestamp: this.failureDetails.timestamp.toISOString(),
    };
  }
}