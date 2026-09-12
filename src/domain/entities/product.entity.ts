export interface ProductDimensions {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface InventoryInfo {
  availableQuantity: number;
  reservedQuantity: number;
  reorderPoint: number;
  reorderQuantity: number;
  lastRestockedAt?: Date;
}

export class Product {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: ProductCategory;
  readonly dimensions?: ProductDimensions;
  private _inventory: InventoryInfo;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: {
    id: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    dimensions?: ProductDimensions;
    inventory: InventoryInfo;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.sku = params.sku;
    this.name = params.name;
    this.description = params.description;
    this.price = params.price;
    this.category = params.category;
    this.dimensions = params.dimensions;
    this._inventory = params.inventory;
    this.isActive = params.isActive ?? true;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  get inventory(): InventoryInfo {
    return this._inventory;
  }

  get availableQuantity(): number {
    return this._inventory.availableQuantity;
  }

  get isInStock(): boolean {
    return this._inventory.availableQuantity > 0;
  }

  get isLowStock(): boolean {
    return (
      this._inventory.availableQuantity > 0 &&
      this._inventory.availableQuantity <= this._inventory.reorderPoint
    );
  }

  canReserve(quantity: number): boolean {
    return (
      this.isActive &&
      this._inventory.availableQuantity >= quantity
    );
  }

  reserve(quantity: number): void {
    if (!this.canReserve(quantity)) {
      throw new Error(
        `No se puede reservar ${quantity} unidades del producto ${this.sku}`,
      );
    }
    this._inventory = {
      ...this._inventory,
      availableQuantity: this._inventory.availableQuantity - quantity,
      reservedQuantity: this._inventory.reservedQuantity + quantity,
    };
  }

  release(quantity: number): void {
    if (this._inventory.reservedQuantity < quantity) {
      throw new Error(
        `No se pueden liberar ${quantity} unidades del producto ${this.sku}`,
      );
    }
    this._inventory = {
      ...this._inventory,
      availableQuantity: this._inventory.availableQuantity + quantity,
      reservedQuantity: this._inventory.reservedQuantity - quantity,
    };
  }

  restock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('La cantidad a reponer debe ser mayor a cero');
    }
    this._inventory = {
      ...this._inventory,
      availableQuantity: this._inventory.availableQuantity + quantity,
      lastRestockedAt: new Date(),
    };
  }

  toPlainObject(): Record<string, unknown> {
    return {
      id: this.id,
      sku: this.sku,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      dimensions: this.dimensions,
      inventory: this._inventory,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}