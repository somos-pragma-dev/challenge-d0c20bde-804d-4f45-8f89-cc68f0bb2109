import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, Post, Put, Body, Param, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { OrderController } from '../src/infrastructure/controllers/order.controller';
import { OrderService } from '../src/application/services/order.service';
import { CreateOrderUseCase } from '../src/application/usecases/create-order.usecase';
import { UpdateOrderUseCase } from '../src/application/usecases/update-order.usecase';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { OrderRepositoryPort } from '../src/domain/ports/order.repository.port';
import { InventoryServicePort } from '../src/domain/ports/inventory.service.port';
import { PaymentServicePort } from '../src/domain/ports/payment.service.port';
import { InsufficientInventoryException } from '../src/domain/exceptions/insufficient-inventory.exception';
import { PaymentFailedException } from '../src/domain/exceptions/payment-failed.exception';
import { OrderNotFoundException } from '../src/domain/exceptions/order-not-found.exception';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderUseCase: CreateOrderUseCase;
  let updateOrderUseCase: UpdateOrderUseCase;
  let orderService: OrderService;

  const mockOrder: Order = {
    id: 'order-123',
    orderNumber: 'ORD-2024-001',
    customer: {
      id: 'customer-456',
      email: 'cliente@ejemplo.com',
      name: 'Juan Pérez',
      phone: '+1234567890',
    },
    items: [
      {
        productId: 'prod-789',
        productName: 'Producto de prueba',
        quantity: 2,
        unitPrice: 50.00,
        subtotal: 100.00,
      },
    ],
    shippingAddress: {
      street: 'Calle Principal',
      city: 'Ciudad de Prueba',
      state: 'Estado',
      country: 'País',
      postalCode: '12345',
    },
    payment: {
      method: 'credit_card',
      transactionId: 'txn-abc123',
      status: 'completed',
      amount: 121.00,
    },
    _status: OrderStatus.PENDING,
    subtotal: 100.00,
    shippingCost: 15.00,
    tax: 6.00,
    total: 121.00,
    notes: 'Pedido de prueba',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    get status() { return this._status; },
    canTransitionTo(newStatus: OrderStatus): boolean {
      const transitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
        [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
        [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
        [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
        [OrderStatus.DELIVERED]: [],
        [OrderStatus.CANCELLED]: [],
      };
      return transitions[this._status]?.includes(newStatus) ?? false;
    },
    transitionTo(newStatus: OrderStatus): void {
      if (!this.canTransitionTo(newStatus)) {
        throw new Error(`Invalid transition from ${this._status} to ${newStatus}`);
      }
      this._status = newStatus;
    },
    updatePayment(payment: any): void {
      this.payment = payment;
    },
    toPlainObject(): Record<string, unknown> {
      return JSON.parse(JSON.stringify(this));
    },
  };

  const mockCreateOrderUseCase = {
    execute: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockUpdateOrderUseCase = {
    execute: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockOrderService = {
    findById: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue({
      data: [mockOrder],
      total: 1,
      page: 1,
      limit: 10,
    }),
    findByCustomerId: jest.fn().mockResolvedValue([mockOrder]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: CreateOrderUseCase, useValue: mockCreateOrderUseCase },
        { provide: UpdateOrderUseCase, useValue: mockUpdateOrderUseCase },
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    updateOrderUseCase = module.get<UpdateOrderUseCase>(UpdateOrderUseCase);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('debe crear un pedido exitosamente', async () => {
      const createOrderDto = {
        customer: mockOrder.customer,
        items: mockOrder.items,
        shippingAddress: mockOrder.shippingAddress,
        payment: {
          method: 'credit_card' as const,
          amount: 121.00,
        },
        notes: 'Pedido de prueba',
      };

      const result = await controller.createOrder(createOrderDto);

      expect(createOrderUseCase.execute).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrder);
    });

    it('debe lanzar InsufficientInventoryException cuando no hay inventario', async () => {
      const createOrderDto = {
        customer: mockOrder.customer,
        items: mockOrder.items,
        shippingAddress: mockOrder.shippingAddress,
        payment: { method: 'credit_card' as const, amount: 121.00 },
      };

      mockCreateOrderUseCase.execute.mockRejectedValue(
        new InsufficientInventoryException('prod-789'),
      );

      await expect(controller.createOrder(createOrderDto)).rejects.toThrow(
        InsufficientInventoryException,
      );
    });

    it('debe lanzar PaymentFailedException cuando el pago falla', async () => {
      const createOrderDto = {
        customer: mockOrder.customer,
        items: mockOrder.items,
        shippingAddress: mockOrder.shippingAddress,
        payment: { method: 'credit_card' as const, amount: 121.00 },
      };

      mockCreateOrderUseCase.execute.mockRejectedValue(
        new PaymentFailedException('Transacción rechazada'),
      );

      await expect(controller.createOrder(createOrderDto)).rejects.toThrow(
        PaymentFailedException,
      );
    });
  });

  describe('updateOrder', () => {
    it('debe actualizar un pedido exitosamente', async () => {
      const updateOrderDto = {
        status: OrderStatus.CONFIRMED,
        notes: 'Pedido actualizado',
      };

      const result = await controller.updateOrder('order-123', updateOrderDto);

      expect(updateOrderUseCase.execute).toHaveBeenCalledWith('order-123', updateOrderDto);
      expect(result).toEqual(mockOrder);
    });

    it('debe lanzar OrderNotFoundException cuando el pedido no existe', async () => {
      const updateOrderDto = { status: OrderStatus.CONFIRMED };

      mockUpdateOrderUseCase.execute.mockRejectedValue(
        new OrderNotFoundException('order-999'),
      );

      await expect(controller.updateOrder('order-999', updateOrderDto)).rejects.toThrow(
        OrderNotFoundException,
      );
    });
  });

  describe('getOrder', () => {
    it('debe retornar un pedido por ID', async () => {
      const result = await controller.getOrder('order-123');

      expect(orderService.findById).toHaveBeenCalledWith('order-123');
      expect(result).toEqual(mockOrder);
    });

    it('debe lanzar OrderNotFoundException cuando el pedido no existe', async () => {
      orderService.findById.mockResolvedValue(null);

      await expect(controller.getOrder('order-999')).rejects.toThrow(
        OrderNotFoundException,
      );
    });
  });

  describe('getOrders', () => {
    it('debe retornar lista paginada de pedidos', async () => {
      const result = await controller.getOrders({ page: 1, limit: 10 });

      expect(orderService.findAll).toHaveBeenCalledWith(undefined, 1, 10);
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('total');
    });

    it('debe aplicar filtros correctamente', async () => {
      const filter = { status: OrderStatus.PENDING };
      await controller.getOrders({ page: 1, limit: 10, ...filter });

      expect(orderService.findAll).toHaveBeenCalledWith(filter, 1, 10);
    });
  });

  describe('getOrdersByCustomer', () => {
    it('debe retornar pedidos de un cliente específico', async () => {
      const result = await controller.getOrdersByCustomer('customer-456');

      expect(orderService.findByCustomerId).toHaveBeenCalledWith('customer-456');
      expect(result).toEqual([mockOrder]);
    });
  });
});