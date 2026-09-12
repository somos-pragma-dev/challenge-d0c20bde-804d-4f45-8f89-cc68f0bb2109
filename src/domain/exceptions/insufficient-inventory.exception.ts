import { HttpException, HttpStatus } from '@nestjs/common';

export interface InsufficientInventoryDetails {
  productId: string;
  sku: string;
  productName: string;
  requestedQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  warehouse?: string;
  canRestock: boolean;
  estimatedRestockDate?: Date;
}

export class InsufficientInventoryException extends HttpException {
  private readonly inventoryDetails: InsufficientInventoryDetails;

  constructor(details: InsufficientInventoryDetails) {
    const message = `Inventario insuficiente para el producto ${details.sku}. ` +
      `Solicitado: ${details.requestedQuantity}, disponible: ${details.availableQuantity}`;

    super(
      {
        statusCode: HttpStatus.CONFLICT,
        error: 'Insufficient Inventory',
        message: message,
        details: details,
      },
      HttpStatus.CONFLICT,
    );

    this.inventoryDetails = details;
  }

  getProductId(): string {
    return this.inventoryDetails.productId;
  }

  getSku(): string {
    return this.inventoryDetails.sku;
  }

  getRequestedQuantity(): number {
    return this.inventoryDetails.requestedQuantity;
  }

  getAvailableQuantity(): number {
    return this.inventoryDetails.availableQuantity;
  }

  getInventoryDetails(): InsufficientInventoryDetails {
    return { ...this.inventoryDetails };
  }

  canFulfillPartial(): boolean {
    return this.inventoryDetails.availableQuantity > 0;
  }

  getShortage(): number {
    return Math.max(0, this.inventoryDetails.requestedQuantity - this.inventoryDetails.availableQuantity);
  }

  toPlainObject(): Record<string, unknown> {
    return {
      name: 'InsufficientInventoryException',
      statusCode: HttpStatus.CONFLICT,
      error: 'Insufficient Inventory',
      message: this.message,
      details: this.inventoryDetails,
      timestamp: new Date().toISOString(),
    };
  }
}

export class InventoryNotFoundException extends HttpException {
  constructor(productId: string, sku?: string) {
    const identifier = sku || productId;
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Inventory Not Found',
        message: `No se encontró información de inventario para el producto: ${identifier}`,
        productId,
        sku,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class InventoryReservationException extends HttpException {
  constructor(productId: string, quantity: number, reason: string) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Inventory Reservation Failed',
        message: `No se pudo reservar inventario para el producto ${productId}: ${reason}`,
        productId,
        quantity,
        reason,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class InventoryOperationException extends HttpException {
  constructor(operation: string, productId: string, originalError: Error) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Inventory Operation Failed',
        message: `La operación '${operation}' falló para el producto ${productId}: ${originalError.message}`,
        operation,
        productId,
        originalError: originalError.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}