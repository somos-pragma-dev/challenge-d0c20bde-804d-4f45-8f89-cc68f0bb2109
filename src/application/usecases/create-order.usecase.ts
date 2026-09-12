import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderRepositoryPort, CreateOrderParams } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { Product } from '@domain/entities/product.entity';
import { InsufficientInventoryException } from '@domain/exceptions/insufficient-inventory.exception';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';
import { PaymentServicePort } from '@domain/ports/payment.service.port';
import { v4 as uuidv4 } from 'uuid';

export interface CreateOrderInput {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    sku: string;
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
  payment: {
    method: string;
    cardToken: string;
  };
  notes?: string;
}

export interface CreateOrderOutput {
  order: Order;
  success: boolean;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(forwardRef(() => InventoryServicePort))
    private readonly inventoryService: InventoryServicePort,
    @Inject(forwardRef(() => PaymentServicePort))
    private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const orderNumber = this.generateOrderNumber();
    const subtotal = this.calculateSubtotal(input.items);
    const shippingCost = this.calculateShippingCost(subtotal);
    const tax = this.calculateTax(subtotal);
    const total = subtotal + shippingCost + tax;

    const inventoryCheck = await this.validateInventory(input.items);
    if (!inventoryCheck.valid) {
      throw new InsufficientInventoryException(
        `Insufficient inventory for product: ${inventoryCheck.productName}`,
      );
    }

    const paymentResult = await this.paymentService.processPayment({
      amount: total,
      currency: 'USD',
      method: input.payment.method,
      cardToken: input.payment.cardToken,
      customerId: input.customerId,
      description: `Order ${orderNumber}`,
    });

    if (!paymentResult.success) {
      await this.releaseInventory(input.items);
      throw new PaymentFailedException(
        paymentResult.errorMessage || 'Payment processing failed',
      );
    }

    const createParams: CreateOrderParams = {
      orderNumber,
      customer: {
        id: input.customerId,
        name: input.customerName,
        email: input.customerEmail,
      },
      items: input.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      shippingAddress: {
        street: input.shippingAddress.street,
        city: input.shippingAddress.city,
        state: input.shippingAddress.state,
        postalCode: input.shippingAddress.postalCode,
        country: input.shippingAddress.country,
      },
      payment: {
        method: input.payment.method,
        transactionId: paymentResult.transactionId || '',
        status: paymentResult.success ? 'completed' : 'failed',
      },
      subtotal,
      shippingCost,
      tax,
      total,
      status: OrderStatus.PENDING,
      notes: input.notes,
    };

    const order = await this.orderRepository.create(createParams);

    await this.reserveInventory(input.items);

    return {
      order,
      success: true,
    };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = uuidv4().split('-')[0].toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  private calculateSubtotal(items: CreateOrderInput['items']): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  private calculateShippingCost(subtotal: number): number {
    return subtotal >= 100 ? 0 : 9.99;
  }

  private calculateTax(subtotal: number): number {
    return Math.round(subtotal * 0.08 * 100) / 100;
  }

  private async validateInventory(
    items: CreateOrderInput['items'],
  ): Promise<{ valid: boolean; productName?: string }> {
    for (const item of items) {
      const available = await this.inventoryService.checkAvailability(
        item.productId,
        item.quantity,
      );
      if (!available) {
        return { valid: false, productName: item.productName };
      }
    }
    return { valid: true };
  }

  private async reserveInventory(
    items: CreateOrderInput['items'],
  ): Promise<void> {
    for (const item of items) {
      await this.inventoryService.reserve(item.productId, item.quantity);
    }
  }

  private async releaseInventory(
    items: CreateOrderInput['items'],
  ): Promise<void> {
    for (const item of items) {
      await this.inventoryService.release(item.productId, item.quantity);
    }
  }
}