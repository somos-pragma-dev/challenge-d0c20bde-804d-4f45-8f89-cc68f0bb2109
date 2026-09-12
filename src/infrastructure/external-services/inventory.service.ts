import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '../../config/axios-factory';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';
import { Product } from '@domain/entities/product.entity';
import { InsufficientInventoryException } from '@domain/exceptions/insufficient-inventory.exception';

interface InventoryResponse {
  productId: string;
  available: number;
  reserved: number;
  warehouse: string;
  lastUpdated: string;
}

interface ReserveInventoryResponse {
  success: boolean;
  reservationId: string;
  productId: string;
  quantity: number;
  expiresAt: string;
}

@Injectable()
export class InventoryService implements InventoryServicePort {
  private readonly logger = new Logger(InventoryService.name);
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly cacheTtl: number;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('INVENTORY_SERVICE_URL', 'http://inventory-service:3001');
    this.timeout = this.configService.get<number>('INVENTORY_TIMEOUT_MS', 5000);
    this.cacheTtl = this.configService.get<number>('INVENTORY_CACHE_TTL_SECONDS', 60);

    this.axiosInstance = createAxiosInstance({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'X-API-Key': this.configService.get<string>('INVENTORY_API_KEY', ''),
        'Content-Type': 'application/json',
      },
    });

    this.logger.log(`InventoryService inicializado - URL: ${this.baseUrl}`);
  }

  async checkAvailability(productId: string, quantity: number): Promise<boolean> {
    try {
      this.logger.debug(`Verificando disponibilidad para producto ${productId}, cantidad ${quantity}`);

      const response = await this.axiosInstance.get<InventoryResponse>(
        `/inventory/${productId}`,
      );

      const inventory = response.data;
      const isAvailable = inventory.available >= quantity;

      this.logger.debug(
        `Producto ${productId}: disponible=${inventory.available}, solicitado=${quantity}, disponible=${isAvailable}`,
      );

      return isAvailable;
    } catch (error) {
      this.logger.error(`Error al verificar disponibilidad: ${error.message}`);
      
      if (error.response?.status === 404) {
        return false;
      }

      throw new HttpException(
        'Error al verificar disponibilidad del inventario',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async reserveInventory(productId: string, quantity: number, orderId: string): Promise<ReserveInventoryResponse> {
    try {
      this.logger.debug(`Reservando inventario para producto ${productId}, cantidad ${quantity}, orden ${orderId}`);

      const response = await this.axiosInstance.post<ReserveInventoryResponse>(
        '/inventory/reserve',
        {
          productId,
          quantity,
          referenceId: orderId,
          reason: 'order_creation',
        },
      );

      if (!response.data.success) {
        throw new InsufficientInventoryException(
          `No se pudo reservar inventario para el producto ${productId}`,
        );
      }

      this.logger.log(
        `Inventario reservado: ${response.data.reservationId} para producto ${productId}`,
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error al reservar inventario: ${error.message}`);

      if (error instanceof InsufficientInventoryException) {
        throw error;
      }

      if (error.response?.status === 409) {
        throw new InsufficientInventoryException(
          `Inventario insuficiente para el producto ${productId}`,
        );
      }

      throw new HttpException(
        'Error al procesar la reserva de inventario',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async releaseInventory(reservationId: string): Promise<void> {
    try {
      this.logger.debug(`Liberando reserva de inventario: ${reservationId}`);

      await this.axiosInstance.delete(`/inventory/reservations/${reservationId}`);

      this.logger.log(`Reserva ${reservationId} liberada correctamente`);
    } catch (error) {
      this.logger.error(`Error al liberar inventario: ${error.message}`);

      if (error.response?.status === 404) {
        this.logger.warn(`Reserva ${reservationId} no encontrada, omitiendo liberación`);
        return;
      }

      throw new HttpException(
        'Error al liberar la reserva de inventario',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getInventoryInfo(productId: string): Promise<{ available: number; reserved: number }> {
    try {
      this.logger.debug(`Obteniendo información de inventario para producto ${productId}`);

      const response = await this.axiosInstance.get<InventoryResponse>(
        `/inventory/${productId}`,
      );

      return {
        available: response.data.available,
        reserved: response.data.reserved,
      };
    } catch (error) {
      this.logger.error(`Error al obtener información de inventario: ${error.message}`);

      if (error.response?.status === 404) {
        return { available: 0, reserved: 0 };
      }

      throw new HttpException(
        'Error al obtener información del inventario',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async updateInventory(productId: string, quantity: number, operation: 'add' | 'remove'): Promise<void> {
    try {
      this.logger.debug(`Actualizando inventario: producto ${productId}, operación ${operation}, cantidad ${quantity}`);

      await this.axiosInstance.patch(`/inventory/${productId}`, {
        quantity,
        operation,
      });

      this.logger.log(`Inventario actualizado para producto ${productId}`);
    } catch (error) {
      this.logger.error(`Error al actualizar inventario: ${error.message}`);
      throw new HttpException(
        'Error al actualizar el inventario',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}