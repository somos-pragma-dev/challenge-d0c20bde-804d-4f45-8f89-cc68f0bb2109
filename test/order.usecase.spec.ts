import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from '../src/application/usecases/create-order.usecase';
import { UpdateOrderUseCase } from '../src/application/usecases/update-order.usecase';
import { OrderRepositoryPort } from '../src/domain/ports/order.repository.port';
import { InventoryServicePort } from '../src/domain/ports/inventory.service.port';
import { PaymentServicePort } from '../src/domain/ports/payment.service.port';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { InsufficientInventoryException } from '../src/domain/exceptions/insufficient-inventory.exception';
import { PaymentFailedException } from '../src/domain/exceptions/payment-failed.exception';
import { OrderNotFoundException } from '../src/domain/exceptions/order-not-found.exception';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  let orderRepository: OrderRepositoryPort;
  let inventoryService: InventoryServicePort;
  let paymentService: PaymentServicePort;

  const mockCreateOrderParams = {
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
      method: 'credit_card' as const,
      amount: 121.00,
    },
    notes: 'Pedido de prueba',
  };

  const mockOrder: Order = {
    id: 'order-123',
    orderNumber: 'ORD-2024-001',
    customer: mockCreateOrderParams.customer,
    items: mockCreateOrderParams.items,
    shippingAddress: mockCreateOrderParams.shippingAddress,
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

  const mockOrderRepository = {
    create: jest.fn().mockResolvedValue(mockOrder),
    findById: jest.fn().mockResolvedValue(mockOrder),
    findByOrderNumber: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(mockOrder),
    updateStatus: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockInventoryService = {
    checkAvailability: jest.fn().mockResolvedValue(true),
    reserve: jest.fn().mockResolvedValue(undefined),
    release: jest.fn().mockResolvedValue(undefined),
  };

  const mockPaymentService = {
    processPayment: jest.fn().mockResolvedValue({
      transactionId: 'txn-abc123',
      status: 'completed',
    }),
    refundPayment: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        { provide: OrderRepositoryPort, useValue: mockOrderRepository },
        { provide: InventoryServicePort, useValue: mockInventoryService },
        { provide: PaymentServicePort, useValue: mockPaymentService },
      ],
    }).compile();

    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    orderRepository = module.get<OrderRepositoryPort>(OrderRepositoryPort);
    inventoryService = module.get<InventoryServicePort>(InventoryServicePort);
    paymentService = module.get<PaymentServicePort>(PaymentServicePort);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('debe crear un pedido exitosamente con inventario y pago válidos', async () => {
      const result = await createOrderUseCase.execute(mockCreateOrderParams);

      expect(inventoryService.checkAvailability).toHaveBeenCalled();
      expect(paymentService.processPayment).toHaveBeenCalled();
      expect(orderRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockOrder);
    });

    it('debe lanzar InsufficientInventoryException cuando el inventario es insuficiente', async () => {
      mockInventoryService.checkAvailability.mockResolvedValue(false);

      await expect(createOrderUseCase.execute(mockCreateOrderParams)).rejects.toThrow(
        InsufficientInventoryException,
      );
      expect(inventoryService.release).not.toHaveBeenCalled();
    });

    it('debe lanzar PaymentFailedException cuando el pago falla', async () => {
      mockPaymentService.processPayment.mockRejectedValue(
        new PaymentFailedException('Transacción rechazada'),
      );

      await expect(createOrderUseCase.execute(mockCreateOrderParams)).rejects.toThrow(
        PaymentFailedException,
      );
      expect(inventoryService.release).toHaveBeenCalled();
    });

    it('debe liberar inventario si el pago falla después de reservar', async () => {
      mockPaymentService.processPayment.mockRejectedValue(
        new PaymentFailedException('Error de conexión'),
      );

      await expect(createOrderUseCase.execute(mockCreateOrderParams)).rejects.toThrow(
        PaymentFailedException,
      );
      expect(inventoryService.release).toHaveBeenCalledWith(
        mockCreateOrderParams.items,
      );
    });
  });
});

describe('UpdateOrderUseCase', () => {
  let updateOrderUseCase: UpdateOrderUseCase;
  let orderRepository: OrderRepositoryPort;
  let inventoryService: InventoryServicePort;

  const mockUpdateOrderParams = {
    status: OrderStatus.CONFIRMED,
    notes: 'Notas actualizadas',
  };

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
    notes: 'Pedido original',
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

  const mockOrderRepository = {
    findById: jest.fn().mockResolvedValue(mockOrder),
    update: jest.fn().mockResolvedValue({ ...mockOrder, ...mockUpdateOrderParams }),
    updateStatus: jest.fn().mockResolvedValue({ ...mockOrder, _status: OrderStatus.CONFIRMED }),
  };

  const mockInventoryService = {
    reserve: jest.fn().mockResolvedValue(undefined),
    release: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOrderUseCase,
        { provide: OrderRepositoryPort, useValue: mockOrderRepository },
        { provide: InventoryServicePort, useValue: mockInventoryService },
      ],
    }).compile();

    updateOrderUseCase = module.get<UpdateOrderUseCase>(UpdateOrderUseCase);
    orderRepository = module.get<OrderRepositoryPort>(OrderRepositoryPort);
    inventoryService = module.get<InventoryServicePort>(InventoryServicePort);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('debe actualizar un pedido exitosamente', async () => {
      const result = await updateOrderUseCase.execute('order-123', mockUpdateOrderParams);

      expect(orderRepository.findById).toHaveBeenCalledWith('order-123');
      expect(orderRepository.update).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('debe lanzar OrderNotFoundException cuando el pedido no existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      await expect(
        updateOrderUseCase.execute('order-999', mockUpdateOrderParams),
      ).rejects.toThrow(OrderNotFoundException);
    });

    it('debe actualizar el estado del pedido correctamente', async () => {
      const statusUpdate = { status: OrderStatus.CONFIRMED };
      await updateOrderUseCase.execute('order-123', statusUpdate);

      expect(orderRepository.updateStatus).toHaveBeenCalledWith(
        'order-123',
        OrderStatus.CONFIRMED,
      );
    });

    it('debe rechazar transiciones de estado inválidas', async () => {
      const invalidTransition = { status: OrderStatus.DELIVERED };

      await expect(
        updateOrderUseCase.execute('order-123', invalidTransition),
      ).rejects.toThrow();
    });
  });
});