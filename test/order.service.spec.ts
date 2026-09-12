import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../src/application/services/order.service';
import { OrderRepositoryPort, PaginatedResult, OrderFilter } from '../src/domain/ports/order.repository.port';
import { InventoryServicePort } from '../src/domain/ports/inventory.service.port';
import { PaymentServicePort } from '../src/domain/ports/payment.service.port';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { OrderNotFoundException } from '../src/domain/exceptions/order-not-found.exception';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: OrderRepositoryPort;

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

  const mockPaginatedResult: PaginatedResult<Order> = {
    data: [mockOrder],
    total: 1,
    page: 1,
    limit: 10,
  };

  const mockOrderRepository = {
    findById: jest.fn(),
    findByOrderNumber: jest.fn(),
    findAll: jest.fn(),
    findByCustomerId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    count: jest.fn(),
  };

  const mockInventoryService = {
    checkAvailability: jest.fn(),
    checkBatchAvailability: jest.fn(),
    reserveInventory: jest.fn(),
    releaseInventory: jest.fn(),
    getInventoryInfo: jest.fn(),
    adjustInventory: jest.fn(),
  };

  const mockPaymentService = {
    authorizePayment: jest.fn(),
    capturePayment: jest.fn(),
    refundPayment: jest.fn(),
    getTransactionStatus: jest.fn(),
    processPayment: jest.fn(),
  };

  const mockConfig = {
    pagination: { defaultLimit: 10, maxLimit: 100 },
    orderNumber: { prefix: 'ORD', length: 8 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: OrderRepositoryPort, useValue: mockOrderRepository },
        { provide: InventoryServicePort, useValue: mockInventoryService },
        { provide: PaymentServicePort, useValue: mockPaymentService },
        { provide: 'OrderServiceConfig', useValue: mockConfig },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepositoryPort>(OrderRepositoryPort);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOrderById', () => {
    it('debe retornar un pedido cuando existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(mockOrder);

      const result = await service.findOrderById('order-123');

      expect(mockOrderRepository.findById).toHaveBeenCalledWith('order-123');
      expect(result).toEqual(mockOrder);
    });

    it('debe retornar null cuando el pedido no existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      const result = await service.findOrderById('order-999');

      expect(result).toBeNull();
    });
  });

  describe('findOrders', () => {
    it('debe retornar pedidos paginados sin filtros', async () => {
      mockOrderRepository.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await service.findOrders();

      expect(mockOrderRepository.findAll).toHaveBeenCalledWith(undefined, 1, 10);
      expect(result).toEqual(mockPaginatedResult);
    });

    it('debe aplicar filtros correctamente', async () => {
      const filter: OrderFilter = { status: OrderStatus.PENDING };
      mockOrderRepository.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await service.findOrders(filter, 2, 20);

      expect(mockOrderRepository.findAll).toHaveBeenCalledWith(filter, 2, 20);
      expect(result).toEqual(mockPaginatedResult);
    });

    it('debe usar valores por defecto para paginación', async () => {
      mockOrderRepository.findAll.mockResolvedValue(mockPaginatedResult);

      await service.findOrders();

      expect(mockOrderRepository.findAll).toHaveBeenCalledWith(undefined, 1, 10);
    });
  });

  describe('findOrdersByCustomer', () => {
    it('debe retornar pedidos de un cliente específico', async () => {
      mockOrderRepository.findByCustomerId.mockResolvedValue([mockOrder]);

      const result = await service.findOrdersByCustomer('customer-456');

      expect(mockOrderRepository.findByCustomerId).toHaveBeenCalledWith('customer-456');
      expect(result).toEqual([mockOrder]);
    });

    it('debe retornar array vacío cuando el cliente no tiene pedidos', async () => {
      mockOrderRepository.findByCustomerId.mockResolvedValue([]);

      const result = await service.findOrdersByCustomer('customer-999');

      expect(result).toEqual([]);
    });
  });

  describe('findOrderByNumber', () => {
    it('debe retornar un pedido por número de orden', async () => {
      mockOrderRepository.findByOrderNumber.mockResolvedValue(mockOrder);

      const result = await service.findOrderByNumber('ORD-2024-001');

      expect(mockOrderRepository.findByOrderNumber).toHaveBeenCalledWith('ORD-2024-001');
      expect(result).toEqual(mockOrder);
    });

    it('debe lanzar OrderNotFoundException cuando el número de orden no existe', async () => {
      mockOrderRepository.findByOrderNumber.mockResolvedValue(null);

      await expect(service.findOrderByNumber('ORD-9999-999')).rejects.toThrow(
        OrderNotFoundException,
      );
    });
  });

  describe('updateOrderStatus', () => {
    it('debe actualizar el estado de un pedido exitosamente', async () => {
      const updatedOrder = { ...mockOrder, _status: OrderStatus.CONFIRMED };
      mockOrderRepository.updateStatus.mockResolvedValue(updatedOrder);

      const result = await service.updateOrderStatus({ id: 'order-123', status: OrderStatus.CONFIRMED });

      expect(mockOrderRepository.updateStatus).toHaveBeenCalledWith(
        'order-123',
        OrderStatus.CONFIRMED,
      );
      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });

    it('debe lanzar OrderNotFoundException cuando el pedido no existe', async () => {
      mockOrderRepository.updateStatus.mockRejectedValue(
        new OrderNotFoundException('order-999', 'ORDER_NOT_FOUND', { orderId: 'order-999' }),
      );

      await expect(
        service.updateOrderStatus({ id: 'order-999', status: OrderStatus.CONFIRMED }),
      ).rejects.toThrow(OrderNotFoundException);
    });
  });

  describe('getOrderCount', () => {
    it('debe retornar el total de pedidos', async () => {
      mockOrderRepository.count.mockResolvedValue(42);

      const result = await service.getOrderCount();

      expect(mockOrderRepository.count).toHaveBeenCalledWith(undefined);
      expect(result).toBe(42);
    });

    it('debe aplicar filtro al contar', async () => {
      const filter: OrderFilter = { status: OrderStatus.CANCELLED };
      mockOrderRepository.count.mockResolvedValue(5);

      const result = await service.getOrderCount(filter);

      expect(mockOrderRepository.count).toHaveBeenCalledWith(filter);
      expect(result).toBe(5);
    });
  });

  describe('getConfig', () => {
    it('debe retornar la configuración del servicio', async () => {
      const config = service.getConfig();

      expect(config).toEqual(mockConfig);
    });
  });
}