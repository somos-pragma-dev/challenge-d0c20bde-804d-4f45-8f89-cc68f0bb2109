import { HttpException, HttpStatus, HttpResponseOptions } from '@nestjs/common';

export interface OrderNotFoundDetails {
  readonly orderId: string;
  readonly searchFields: OrderSearchFields;
  readonly requestedAt: Date;
  readonly requestId?: string;
}

export interface OrderSearchFields {
  readonly orderNumber?: string;
  readonly customerId?: string;
  readonly email?: string;
  readonly createdAfter?: Date;
  readonly createdBefore?: Date;
}

export enum OrderNotFoundReason {
  NOT_EXISTS = 'NOT_EXISTS',
  DELETED = 'DELETED',
  CANCELLED = 'CANCELLED',
  NOT_VISIBLE_TO_CUSTOMER = 'NOT_VISIBLE_TO_CUSTOMER',
  EXPIRED = 'EXPIRED',
}

export class OrderNotFoundException extends HttpException {
  private readonly orderNotFoundDetails: OrderNotFoundDetails;
  private readonly reason: OrderNotFoundReason;
  private readonly searchContext: OrderSearchFields;

  constructor(
    orderId: string,
    reason: OrderNotFoundReason = OrderNotFoundReason.NOT_EXISTS,
    searchFields?: OrderSearchFields,
    message?: string,
    options?: HttpResponseOptions,
  ) {
    const defaultMessage = `Order with ID '${orderId}' was not found`;
    const responseMessage = message || defaultMessage;

    const status = OrderNotFoundException.determineHttpStatus(reason);
    const errorResponse = {
      statusCode: status,
      error: 'Order Not Found',
      message: responseMessage,
      errorCode: OrderNotFoundException.mapReasonToErrorCode(reason),
      details: {
        orderId,
        reason,
        searchFields: searchFields || {},
        requestedAt: new Date().toISOString(),
      },
      suggestion: OrderNotFoundException.generateSuggestion(reason),
      timestamp: new Date().toISOString(),
    };

    super(errorResponse, status, options);
    this.orderNotFoundDetails = {
      orderId,
      searchFields: searchFields || {},
      requestedAt: new Date(),
    };
    this.reason = reason;
    this.searchContext = searchFields || {};
  }

  private static determineHttpStatus(reason: OrderNotFoundReason): HttpStatus {
    switch (reason) {
      case OrderNotFoundReason.DELETED:
      case OrderNotFoundReason.CANCELLED:
        return HttpStatus.GONE;
      case OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER:
        return HttpStatus.FORBIDDEN;
      case OrderNotFoundReason.EXPIRED:
        return HttpStatus.GONE;
      default:
        return HttpStatus.NOT_FOUND;
    }
  }

  private static mapReasonToErrorCode(reason: OrderNotFoundReason): string {
    const errorCodeMap: Record<OrderNotFoundReason, string> = {
      [OrderNotFoundReason.NOT_EXISTS]: 'ORDER_NOT_FOUND',
      [OrderNotFoundReason.DELETED]: 'ORDER_DELETED',
      [OrderNotFoundReason.CANCELLED]: 'ORDER_CANCELLED',
      [OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER]: 'ORDER_NOT_VISIBLE',
      [OrderNotFoundReason.EXPIRED]: 'ORDER_EXPIRED',
    };
    return errorCodeMap[reason] || 'ORDER_NOT_FOUND';
  }

  private static generateSuggestion(reason: OrderNotFoundReason): string {
    switch (reason) {
      case OrderNotFoundReason.NOT_EXISTS:
        return 'Verify that the order ID is correct. If you recently placed the order, please allow a few minutes for it to be processed.';
      case OrderNotFoundReason.DELETED:
        return 'This order has been removed from our system and cannot be retrieved.';
      case OrderNotFoundReason.CANCELLED:
        return 'This order was cancelled. Please create a new order if you wish to proceed.';
      case OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER:
        return 'You do not have permission to view this order. Please contact support if you believe this is an error.';
      case OrderNotFoundReason.EXPIRED:
        return 'This order has expired and is no longer accessible.';
      default:
        return 'Please contact customer support for assistance with this order.';
    }
  }

  getOrderId(): string {
    return this.orderNotFoundDetails.orderId;
  }

  getReason(): OrderNotFoundReason {
    return this.reason;
  }

  getSearchFields(): OrderSearchFields {
    return { ...this.searchContext };
  }

  isDeleted(): boolean {
    return this.reason === OrderNotFoundReason.DELETED;
  }

  isCancelled(): boolean {
    return this.reason === OrderNotFoundReason.CANCELLED;
  }

  isExpired(): boolean {
    return this.reason === OrderNotFoundReason.EXPIRED;
  }

  isPermissionIssue(): boolean {
    return this.reason === OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER;
  }

  getSuggestion(): string {
    return OrderNotFoundException.generateSuggestion(this.reason);
  }

  toLoggableObject(): Record<string, unknown> {
    return {
      exception: 'OrderNotFoundException',
      orderId: this.orderNotFoundDetails.orderId,
      reason: this.reason,
      searchFields: this.searchContext,
      requestedAt: this.orderNotFoundDetails.requestedAt.toISOString(),
    };
  }

  static fromOrderNumber(orderNumber: string): OrderNotFoundException {
    return new OrderNotFoundException(
      orderNumber,
      OrderNotFoundReason.NOT_EXISTS,
      { orderNumber },
    );
  }

  static fromCustomerId(customerId: string): OrderNotFoundException {
    return new OrderNotFoundException(
      customerId,
      OrderNotFoundReason.NOT_EXISTS,
      { customerId },
    );
  }
}