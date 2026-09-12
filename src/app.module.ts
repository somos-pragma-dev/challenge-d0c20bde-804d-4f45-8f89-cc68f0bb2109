import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { OrderRepository } from './infrastructure/repositories/order.repository';
import { OrderController } from './infrastructure/controllers/order.controller';
import { InventoryService } from './infrastructure/external-services/inventory.service';
import { PaymentService } from './infrastructure/external-services/payment.service';
import { AppConfig } from './infrastructure/config/app.config';
import { CircuitBreakerMiddleware } from './infrastructure/middlewares/circuit-breaker.middleware';
import { GlobalExceptionFilter } from './infrastructure/middlewares/global-exception.filter';
import { OrderService } from './application/services/order.service';
import { CreateOrderUseCase } from './application/usecases/create-order.usecase';
import { UpdateOrderUseCase } from './application/usecases/update-order.usecase';
import { OrderRepositoryPort } from './domain/ports/order.repository.port';
import { InventoryServicePort } from './domain/ports/inventory.service.port';
import { PaymentServicePort } from './domain/ports/payment.service.port';
import configuration from './infrastructure/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    AppConfig,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: OrderRepositoryPort,
      useClass: OrderRepository,
    },
    {
      provide: InventoryServicePort,
      useClass: InventoryService,
    },
    {
      provide: PaymentServicePort,
      useClass: PaymentService,
    },
    OrderService,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    CircuitBreakerMiddleware,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CircuitBreakerMiddleware)
      .forRoutes('*');
  }
}