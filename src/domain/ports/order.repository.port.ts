import { Order, OrderStatus } from '../entities/order.entity';

export interface CreateOrderParams {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_TRANSFER';
  notes?: string;
}

export interface UpdateOrderParams {
  status?: OrderStatus;
  paymentStatus?: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  paymentTransactionId?: string;
  notes?: string;
}

export interface OrderFilter {
  customerId?: string;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
  minTotal?: number;
  maxTotal?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderRepositoryPort {
  findById(id: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  findAll(filter?: OrderFilter, page?: number, limit?: number): Promise<PaginatedResult<Order>>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  create(params: CreateOrderParams): Promise<Order>;
  update(id: string, params: UpdateOrderParams): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filter?: OrderFilter): Promise<number>;
}