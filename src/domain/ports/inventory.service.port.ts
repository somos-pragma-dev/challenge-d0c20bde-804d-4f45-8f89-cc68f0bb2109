export interface InventoryReservationResult {
  success: boolean;
  reservationId?: string;
  productId: string;
  quantity: number;
  expiresAt?: Date;
  errorMessage?: string;
}

export interface InventoryCheckResult {
  available: boolean;
  productId: string;
  requestedQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  warehouseLocation?: string;
}

export interface BatchInventoryCheckResult {
  valid: boolean;
  results: Array<{
    productId: string;
    available: boolean;
    requestedQuantity: number;
    availableQuantity: number;
  }>;
}

export interface InventoryServicePort {
  checkAvailability(productId: string, quantity: number): Promise<boolean>;
  checkBatchAvailability(items: Array<{ productId: string; quantity: number }>): Promise<BatchInventoryCheckResult>;
  reserveInventory(productId: string, quantity: number, orderId?: string): Promise<InventoryReservationResult>;
  releaseInventory(productId: string, quantity: number): Promise<InventoryReservationResult>;
  getInventoryInfo(productId: string): Promise<InventoryCheckResult>;
  adjustInventory(productId: string, adjustment: number, reason: string): Promise<InventoryCheckResult>;
  reserve(productId: string, quantity: number): Promise<InventoryReservationResult>;
  release(productId: string, quantity: number): Promise<InventoryReservationResult>;
  confirmReservation(productId: string, quantity: number): Promise<boolean>;
}

export abstract class InventoryServiceAdapter implements InventoryServicePort {
  async checkAvailability(productId: string, quantity: number): Promise<boolean> {
    const result = await this.checkBatchAvailability([{ productId, quantity }]);
    return result.results[0]?.available ?? false;
  }

  async checkBatchAvailability(items: Array<{ productId: string; quantity: number }>): Promise<BatchInventoryCheckResult> {
    const results = await Promise.all(
      items.map(async (item) => {
        const info = await this.getInventoryInfo(item.productId);
        return {
          productId: item.productId,
          available: info.availableQuantity >= item.quantity,
          requestedQuantity: item.quantity,
          availableQuantity: info.availableQuantity,
        };
      }),
    );
    return {
      valid: results.every((r) => r.available),
      results,
    };
  }

  async reserveInventory(productId: string, quantity: number, orderId?: string): Promise<InventoryReservationResult> {
    return this.reserve(productId, quantity);
  }

  async releaseInventory(productId: string, quantity: number): Promise<InventoryReservationResult> {
    return this.release(productId, quantity);
  }

  async getInventoryInfo(productId: string): Promise<InventoryCheckResult> {
    return {
      available: false,
      productId,
      requestedQuantity: 0,
      availableQuantity: 0,
      reservedQuantity: 0,
    };
  }

  async adjustInventory(productId: string, adjustment: number, reason: string): Promise<InventoryCheckResult> {
    return this.getInventoryInfo(productId);
  }

  async reserve(productId: string, quantity: number): Promise<InventoryReservationResult> {
    return {
      success: true,
      reservationId: `res-${productId}-${Date.now()}`,
      productId,
      quantity,
    };
  }

  async release(productId: string, quantity: number): Promise<InventoryReservationResult> {
    return {
      success: true,
      productId,
      quantity,
    };
  }

  async confirmReservation(productId: string, quantity: number): Promise<boolean> {
    return true;
  }
}