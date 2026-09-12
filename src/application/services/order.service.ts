import { Injectable, Logger } from '@nestjs/common';
import { OrderRepositoryPort, CreateOrderParams, UpdateOrderParams, OrderFilter, PaginatedResult } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { CreateOrderUseCase } from '@application/usecases/create-order.usecase';
import { UpdateOrderUseCase } from '@application/usecases/update-order.usecase';
import { PaymentServicePort } from '@domain/ports/payment.service.port';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';

export interface OrderServiceConfig {
  readonly maxRetries: number;
  readonly timeout: number;
  readonly enableNotifications: boolean;
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly config: OrderServiceConfig;

  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderRepository: OrderRepositoryPort,
    private readonly paymentService: PaymentServicePort,
    private readonly inventoryService: InventoryServicePort,
  ) {
    this.config = {
      maxRetries: 3,
      timeout: 30000,
      enableNotifications: true,
    };
  }

  async createOrder(input: CreateOrderParams): Promise<Order> {
    return this.createOrderUseCase.execute(input);
  }

  async updateOrderStatus(input: UpdateOrderParams): Promise<Order> {
    return this.updateOrderUseCase.execute(input);
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async findOrderByNumber(orderNumber: string): Promise<Order | null> {
    return this.orderRepository.findByOrderNumber(orderNumber);
  }

  async findOrders(filter?: OrderFilter, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll(filter, page, limit);
  }

  async findOrdersByCustomer(customerId: string): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }

  async cancelOrder(orderId: string, reason: string): Promise<Order> {
    return this.updateOrderUseCase.cancelOrder(orderId, reason);
  }

  async getOrderCount(filter?: OrderFilter): Promise<number> {
    return this.orderRepository.count(filter);
  }

  async getOrdersByStatus(status: OrderStatus, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll({ status }, page, limit);
  }

  async getRecentOrders(days: number, limit = 10): Promise<Order[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const result = await this.orderRepository.findAll({ startDate }, 1, limit);
    return result.data;
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<Order | null> {
    return this.orderRepository.findByOrderNumber(orderNumber);
  }

  async getOrders(filter?: OrderFilter, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll(filter, page, limit);
  }

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }

  async updateOrder(id: string, params: UpdateOrderParams): Promise<Order> {
    return this.orderRepository.update(id, params);
  }

  async orderExists(id: string): Promise<boolean> {
    return this.orderRepository.exists(id);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('Unknown error occurred');
  }

  getConfig(): OrderServiceConfig {
    return this.config;
  }
}