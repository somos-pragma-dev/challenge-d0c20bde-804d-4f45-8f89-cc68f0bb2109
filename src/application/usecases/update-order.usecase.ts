import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderRepositoryPort, UpdateOrderParams } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';

export interface UpdateOrderInput {
  orderId: string;
  newStatus: OrderStatus;
  notes?: string;
}

export interface UpdateOrderOutput {
  order: Order;
  success: boolean;
}

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(forwardRef(() => InventoryServicePort))
    private readonly inventoryService: InventoryServicePort,
  ) {}

  async execute(input: UpdateOrderInput): Promise<UpdateOrderOutput> {
    const existingOrder = await this.orderRepository.findById(input.orderId);

    if (!existingOrder) {
      throw new OrderNotFoundException(
        `Order with ID ${input.orderId} not found`,
      );
    }

    if (!existingOrder.canTransitionTo(input.newStatus)) {
      throw new Error(
        `Invalid status transition from ${existingOrder.status} to ${input.newStatus}`,
      );
    }

    await this.handleInventoryForStatusTransition(
      existingOrder,
      input.newStatus,
    );

    const updateParams: UpdateOrderParams = {
      status: input.newStatus,
      notes: input.notes,
    };

    const updatedOrder = await this.orderRepository.update(
      input.orderId,
      updateParams,
    );

    return {
      order: updatedOrder,
      success: true,
    };
  }

  private async handleInventoryForStatusTransition(
    order: Order,
    newStatus: OrderStatus,
  ): Promise<void> {
    if (newStatus === OrderStatus.CANCELLED) {
      await this.releaseOrderInventory(order);
    } else if (newStatus === OrderStatus.CONFIRMED) {
      await this.confirmOrderInventory(order);
    }
  }

  private async releaseOrderInventory(order: Order): Promise<void> {
    for (const item of order.items) {
      await this.inventoryService.release(item.productId, item.quantity);
    }
  }

  private async confirmOrderInventory(order: Order): Promise<void> {
    for (const item of order.items) {
      const confirmed = await this.inventoryService.confirmReservation(
        item.productId,
        item.quantity,
      );
      if (!confirmed) {
        throw new Error(
          `Failed to confirm inventory reservation for product ${item.productId}`,
        );
      }
    }
  }

  async getOrderStatusHistory(orderId: string): Promise<OrderStatus[]> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new OrderNotFoundException(`Order with ID ${orderId} not found`);
    }
    const history: OrderStatus[] = [order.status];
    return history;
  }

  async cancelOrder(orderId: string, reason: string): Promise<UpdateOrderOutput> {
    const existingOrder = await this.orderRepository.findById(orderId);
    if (!existingOrder) {
      throw new OrderNotFoundException(
        `Order with ID ${orderId} not found`,
      );
    }
    if (existingOrder.status === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel a delivered order');
    }
    if (existingOrder.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }
    return this.execute({
      orderId,
      newStatus: OrderStatus.CANCELLED,
      notes: `Cancellation reason: ${reason}`,
    });
  }
}