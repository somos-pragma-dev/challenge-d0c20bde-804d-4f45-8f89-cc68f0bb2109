import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Order as PrismaOrder, OrderItem as PrismaOrderItem } from '@prisma/client';
import { OrderRepositoryPort, CreateOrderParams, UpdateOrderParams, OrderFilter, PaginatedResult } from '@domain/ports/order.repository.port';
import { Order, OrderStatus, OrderItem, Customer, ShippingAddress, PaymentInfo } from '@domain/entities/order.entity';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class OrderRepository implements OrderRepositoryPort {
  private readonly logger = new Logger(OrderRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(prismaOrder: PrismaOrder & { items?: PrismaOrderItem[] }): Order {
    const customer: Customer = {
      id: prismaOrder.customerId,
      email: prismaOrder.customerEmail,
      name: prismaOrder.customerName,
      phone: prismaOrder.customerPhone,
    };

    const shippingAddress: ShippingAddress = {
      street: prismaOrder.shippingStreet,
      city: prismaOrder.shippingCity,
      state: prismaOrder.shippingState,
      postalCode: prismaOrder.shippingPostalCode,
      country: prismaOrder.shippingCountry,
    };

    const payment: PaymentInfo = {
      method: prismaOrder.paymentMethod,
      transactionId: prismaOrder.paymentTransactionId,
      status: prismaOrder.paymentStatus as 'pending' | 'completed' | 'failed',
      amount: Number(prismaOrder.paymentAmount),
    };

    const itemsList: PrismaOrderItem[] = prismaOrder.items || [];
    const items: OrderItem[] = itemsList.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      sku: item.productSku,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      subtotal: Number(item.subtotal),
    }));

    return new Order({
      id: prismaOrder.id,
      orderNumber: prismaOrder.orderNumber,
      customer,
      items,
      shippingAddress,
      payment,
      status: prismaOrder.status as OrderStatus,
      subtotal: Number(prismaOrder.subtotal),
      shippingCost: Number(prismaOrder.shippingCost),
      tax: Number(prismaOrder.tax),
      total: Number(prismaOrder.total),
      notes: prismaOrder.notes || undefined,
      createdAt: prismaOrder.createdAt,
      updatedAt: prismaOrder.updatedAt,
    });
  }

  async findById(id: string): Promise<Order | null> {
    this.logger.debug(`Buscando pedido por ID: ${id}`);
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? this.mapPrismaToDomain(order) : null;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    this.logger.debug(`Buscando pedido por número: ${orderNumber}`);
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });
    return order ? this.mapPrismaToDomain(order) : null;
  }

  async findAll(filter?: OrderFilter, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    this.logger.debug(`Listando pedidos - página: ${page}, límite: ${limit}`);

    const where: Prisma.OrderWhereInput = {};

    if (filter) {
      if (filter.status) {
        where.status = filter.status;
      }
      if (filter.customerId) {
        where.customerId = filter.customerId;
      }
      if (filter.startDate && filter.endDate) {
        where.createdAt = {
          gte: filter.startDate,
          lte: filter.endDate,
        };
      }
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: { items: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders.map((o) => this.mapPrismaToDomain(o)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    this.logger.debug(`Buscando pedidos del cliente: ${customerId}`);
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((o) => this.mapPrismaToDomain(o));
  }

  async create(params: CreateOrderParams): Promise<Order> {
    this.logger.debug(`Creando nuevo pedido para cliente: ${params.customer.email}`);

    const { customer, items, shippingAddress, payment, notes } = params;

    const itemsInput = items as Array<{ subtotal: number }>;
    const subtotal = itemsInput.reduce((sum, item) => sum + item.subtotal, 0);
    const shippingCost = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.16;
    const total = subtotal + shippingCost + tax;

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const prismaOrder = await this.prisma.order.create({
      data: {
        id: crypto.randomUUID(),
        orderNumber,
        customerId: customer.id,
        customerEmail: customer.email,
        customerName: customer.name,
        customerPhone: customer.phone,
        shippingStreet: shippingAddress.street,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingPostalCode: shippingAddress.postalCode,
        shippingCountry: shippingAddress.country,
        paymentMethod: payment.method,
        paymentTransactionId: payment.transactionId,
        paymentStatus: payment.status,
        paymentAmount: payment.amount,
        status: OrderStatus.PENDING,
        subtotal,
        shippingCost,
        tax,
        total,
        notes,
        items: {
          create: items.map((item) => ({
            id: crypto.randomUUID(),
            productId: item.productId,
            productName: item.productName,
            productSku: item.sku,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: true },
    });

    return this.mapPrismaToDomain(prismaOrder);
  }

  async update(id: string, params: UpdateOrderParams): Promise<Order> {
    this.logger.debug(`Actualizando pedido: ${id}`);

    const updateData: Prisma.OrderUpdateInput = {};

    if (params.shippingAddress) {
      updateData.shippingStreet = params.shippingAddress.street;
      updateData.shippingCity = params.shippingAddress.city;
      updateData.shippingState = params.shippingAddress.state;
      updateData.shippingPostalCode = params.shippingAddress.postalCode;
      updateData.shippingCountry = params.shippingAddress.country;
    }

    if (params.notes !== undefined) {
      updateData.notes = params.notes;
    }

    const prismaOrder = await this.prisma.order.update({
      where: { id },
      data: {
        shippingStreet: params.shippingAddress?.street,
        shippingCity: params.shippingAddress?.city,
        shippingState: params.shippingAddress?.state,
        shippingPostalCode: params.shippingAddress?.postalCode,
        shippingCountry: params.shippingAddress?.country,
        notes: params.notes,
      },
      include: { items: true },
    });

    return this.mapPrismaToDomain(prismaOrder);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    this.logger.debug(`Actualizando estado del pedido ${id} a ${status}`);
    const prismaOrder = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
    return this.mapPrismaToDomain(prismaOrder);
  }

  async delete(id: string): Promise<void> {
    this.logger.debug(`Eliminando pedido: ${id}`);
    await this.prisma.order.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.order.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filter?: OrderFilter): Promise<number> {
    const where: Prisma.OrderWhereInput = {};

    if (filter) {
      if (filter.status) {
        where.status = filter.status;
      }
      if (filter.customerId) {
        where.customerId = filter.customerId;
      }
      if (filter.startDate && filter.endDate) {
        where.createdAt = {
          gte: filter.startDate,
          lte: filter.endDate,
        };
      }
    }

    return this.prisma.order.count({ where });
  }
}