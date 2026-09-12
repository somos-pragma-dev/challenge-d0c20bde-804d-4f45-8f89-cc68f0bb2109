import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  DefaultValuePipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OrderService } from '@application/services/order.service';
import { CreateOrderUseCase } from '@application/usecases/create-order.usecase';
import { UpdateOrderUseCase } from '@application/usecases/update-order.usecase';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { OrderFilterDto } from './dtos/order-filter.dto';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente', type: Order })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Conflicto de inventario' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const result = await this.createOrderUseCase.execute(createOrderDto);
    return result.order;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Order })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    const order = await this.orderService.findById(id);
    if (!order) {
      throw new OrderNotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Get('number/:orderNumber')
  @ApiOperation({ summary: 'Obtener un pedido por número de orden' })
  @ApiParam({ name: 'orderNumber', description: 'Número de orden' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Order })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async getOrderByNumber(@Param('orderNumber') orderNumber: string): Promise<Order> {
    const order = await this.orderService.findByNumber(orderNumber);
    if (!order) {
      throw new OrderNotFoundException(`Order with number ${orderNumber} not found`);
    }
    return order;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista paginada de pedidos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  async getOrders(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto?: OrderFilterDto,
  ) {
    return this.orderService.findAll(
      filterDto,
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener pedidos de un cliente' })
  @ApiParam({ name: 'customerId', description: 'UUID del cliente' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del cliente', type: [Order] })
  async getOrdersByCustomer(@Param('customerId', ParseUUIDPipe) customerId: string): Promise<Order[]> {
    return this.orderService.findByCustomerId(customerId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado', type: Order })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const result = await this.updateOrderUseCase.execute({
      orderId: id,
      newStatus: updateOrderDto.status,
      notes: updateOrderDto.notes,
    });
    return result.order;
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar solo el estado de un pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Estado actualizado', type: Order })
  async updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    const result = await this.updateOrderUseCase.execute({
      orderId: id,
      newStatus: status,
    });
    return result.order;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 204, description: 'Pedido eliminado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.orderService.delete(id);
  }
}