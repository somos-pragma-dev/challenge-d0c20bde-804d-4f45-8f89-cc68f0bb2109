export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_TRANSFER';
  transactionId?: string;
  status: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  amount: number;
  processedAt?: Date;
}

export class Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly customer: Customer;
  readonly items: OrderItem[];
  readonly shippingAddress: ShippingAddress;
  readonly payment: PaymentInfo;
  private _status: OrderStatus;
  readonly subtotal: number;
  readonly shippingCost: number;
  readonly tax: number;
  readonly total: number;
  readonly notes?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: {
    id: string;
    orderNumber: string;
    customer: Customer;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    payment: PaymentInfo;
    status?: OrderStatus;
    subtotal: number;
    shippingCost: number;
    tax: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.orderNumber = params.orderNumber;
    this.customer = params.customer;
    this.items = params.items;
    this.shippingAddress = params.shippingAddress;
    this.payment = params.payment;
    this._status = params.status || OrderStatus.PENDING;
    this.subtotal = params.subtotal;
    this.shippingCost = params.shippingCost;
    this.tax = params.tax;
    this.total = this.calculateTotal();
    this.notes = params.notes;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  private calculateTotal(): number {
    return this.subtotal + this.shippingCost + this.tax;
  }

  get status(): OrderStatus {
    return this._status;
  }

  canTransitionTo(newStatus: OrderStatus): boolean {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.FAILED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.FAILED]: [OrderStatus.PENDING],
    };
    return validTransitions[this._status].includes(newStatus);
  }

  transitionTo(newStatus: OrderStatus): void {
    if (!this.canTransitionTo(newStatus)) {
      throw new Error(
        `Transición inválida de ${this._status} a ${newStatus}`,
      );
    }
    this._status = newStatus;
  }

  updatePayment(payment: PaymentInfo): void {
    this.payment = payment;
  }

  toPlainObject(): Record<string, unknown> {
    return {
      id: this.id,
      orderNumber: this.orderNumber,
      customer: this.customer,
      items: this.items,
      shippingAddress: this.shippingAddress,
      payment: this.payment,
      status: this._status,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      tax: this.tax,
      total: this.total,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}