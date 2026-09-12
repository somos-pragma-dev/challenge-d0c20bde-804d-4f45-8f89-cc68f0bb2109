# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/infrastructure/repositories/order.repository.ts` — `OrderItem.map`: Se invoca `map` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/order.controller.ts` — `OrderService.findById`: Se invoca `findById` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/order.controller.ts` — `OrderService.findByNumber`: Se invoca `findByNumber` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/order.controller.ts` — `OrderService.findAll`: Se invoca `findAll` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/order.controller.ts` — `OrderService.findByCustomerId`: Se invoca `findByCustomerId` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/order.controller.ts` — `OrderService.delete`: Se invoca `delete` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/middlewares/global-exception.filter.ts` — `ErrorResponse.status`: Se invoca `status` sobre `ErrorResponse`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/usecases/create-order.usecase.ts` — `CreateOrderInput.map`: Se invoca `map` sobre `CreateOrderInput`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/usecases/create-order.usecase.ts` — `CreateOrderInput.reduce`: Se invoca `reduce` sobre `CreateOrderInput`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Node, Tecnología Node, Senior

### Brecha de conocimiento
Necesita fortalecer la practica de Node

### Misión / candidato
Liderar la iniciativa de api de pedidos con manejo de errores

### Reto
- Tema: api-de-pedidos-con-manejo-de-errores
- Seniority: senior-l2
- Tipo: practical
- Título: Implementación de API de Pedidos con Manejo de Errores
- Tiempo estimado: 4 semanas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Diseño del Modelo de Pedidos — objetivo: Definir el modelo de datos para los pedidos, incluyendo atributos y relaciones. — entregable (NO resolver): Modelo de datos para pedidos con atributos y relaciones definidas.
- Fase 2: Implementación de la Lógica de Negocio — objetivo: Implementar la lógica de negocio para crear y actualizar pedidos. — entregable (NO resolver): Endpoint funcional para crear y actualizar pedidos con manejo de errores.
- Fase 3: Integración con Sistemas Externos — objetivo: Integrar la API de pedidos con el sistema de inventario y el motor de pagos. — entregable (NO resolver): API integrada con sistemas de inventario y pagos, capaz de manejar respuestas asíncronas y errores.
- Fase 4: Optimización y Escalabilidad — objetivo: Optimizar la API para manejar un alto volumen de pedidos y garantizar la escalabilidad. — entregable (NO resolver): API optimizada y escalable para manejar un alto volumen de pedidos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "order-api",
  "version": "1.0.0",
  "description": "API de pedidos con manejo de errores para e-commerce",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "start:prod": "node dist/main.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "lint": "eslint 'src/**/*.ts'",
    "format": "prettier --write 'src/**/*.ts'"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.1.0",
    "@nestjs/config": "^3.1.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "prisma": "^5.10.0",
    "ioredis": "^5.3.2",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "@nestjs/testing": "^11.0.0",
    "supertest": "^6.3.3",
    "typescript": "^5.7.0",
    "@types/node": "^20.11.0",
    "ts-node": "^10.9.1",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './infrastructure/middlewares/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Order API')
    .setDescription('API para gestión de pedidos en plataforma de e-commerce')
    .setVersion('1.0')
    .addTag('orders', 'Operaciones relacionadas con pedidos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicación corriendo en puerto ${port}`);
  console.log(`Documentación Swagger disponible en /api/docs`);
}

bootstrap();

// === ARCHIVO: src/domain/entities/order.entity.ts ===
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_TRANSFER';
  transactionId?: string;
  status: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  amount: number;
  processedAt?: Date;
}

export class Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly customer: Customer;
  readonly items: OrderItem[];
  readonly shippingAddress: ShippingAddress;
  readonly payment: PaymentInfo;
  private _status: OrderStatus;
  readonly subtotal: number;
  readonly shippingCost: number;
  readonly tax: number;
  readonly total: number;
  readonly notes?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: {
    id: string;
    orderNumber: string;
    customer: Customer;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    payment: PaymentInfo;
    status?: OrderStatus;
    subtotal: number;
    shippingCost: number;
    tax: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.orderNumber = params.orderNumber;
    this.customer = params.customer;
    this.items = params.items;
    this.shippingAddress = params.shippingAddress;
    this.payment = params.payment;
    this._status = params.status || OrderStatus.PENDING;
    this.subtotal = params.subtotal;
    this.shippingCost = params.shippingCost;
    this.tax = params.tax;
    this.total = this.calculateTotal();
    this.notes = params.notes;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  private calculateTotal(): number {
    return this.subtotal + this.shippingCost + this.tax;
  }

  get status(): OrderStatus {
    return this._status;
  }

  canTransitionTo(newStatus: OrderStatus): boolean {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.FAILED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.FAILED]: [OrderStatus.PENDING],
    };
    return validTransitions[this._status].includes(newStatus);
  }

  transitionTo(newStatus: OrderStatus): void {
    if (!this.canTransitionTo(newStatus)) {
      throw new Error(
        `Transición inválida de ${this._status} a ${newStatus}`,
      );
    }
    this._status = newStatus;
  }

  updatePayment(payment: PaymentInfo): void {
    this.payment = payment;
  }

  toPlainObject(): Record<string, unknown> {
    return {
      id: this.id,
      orderNumber: this.orderNumber,
      customer: this.customer,
      items: this.items,
      shippingAddress: this.shippingAddress,
      payment: this.payment,
      status: this._status,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      tax: this.tax,
      total: this.total,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

// === ARCHIVO: src/domain/entities/product.entity.ts ===
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

// === ARCHIVO: src/domain/ports/order.repository.port.ts ===
import { Order, OrderStatus } from '../entities/order.entity';

export interface CreateOrderParams {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_TRANSFER';
  notes?: string;
}

export interface UpdateOrderParams {
  status?: OrderStatus;
  paymentStatus?: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  paymentTransactionId?: string;
  notes?: string;
}

export interface OrderFilter {
  customerId?: string;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
  minTotal?: number;
  maxTotal?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderRepositoryPort {
  findById(id: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  findAll(filter?: OrderFilter, page?: number, limit?: number): Promise<PaginatedResult<Order>>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  create(params: CreateOrderParams): Promise<Order>;
  update(id: string, params: UpdateOrderParams): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filter?: OrderFilter): Promise<number>;
}


// === ARCHIVO: src/domain/ports/inventory.service.port.ts ===
import { Injectable } from '@nestjs/common';

export interface InventoryReservationResult {
  success: boolean;
  productId: string;
  requestedQuantity: number;
  reservedQuantity: number;
  remainingQuantity: number;
  timestamp: Date;
}

export interface InventoryCheckResult {
  productId: string;
  sku: string;
  available: boolean;
  quantity: number;
  reservedQuantity: number;
  warehouseLocation?: string;
}

export interface BatchInventoryCheckResult {
  results: InventoryCheckResult[];
  allAvailable: boolean;
  checkedAt: Date;
}

export interface InventoryServicePort {
  checkAvailability(productId: string, quantity: number): Promise<InventoryCheckResult>;
  checkBatchAvailability(items: Array<{ productId: string; quantity: number }>): Promise<BatchInventoryCheckResult>;
  reserveInventory(productId: string, quantity: number): Promise<InventoryReservationResult>;
  releaseInventory(productId: string, quantity: number): Promise<InventoryReservationResult>;
  getInventoryInfo(productId: string): Promise<InventoryCheckResult>;
  adjustInventory(productId: string, adjustment: number, reason: string): Promise<InventoryCheckResult>;
}

export const INVENTORY_SERVICE_TOKEN = 'InventoryService';

@Injectable()
export abstract class InventoryServiceAdapter implements InventoryServicePort {
  async checkAvailability(productId: string, quantity: number): Promise<InventoryCheckResult> {
    throw new Error('Method not implemented');
  }

  async checkBatchAvailability(
    items: Array<{ productId: string; quantity: number }>,
  ): Promise<BatchInventoryCheckResult> {
    throw new Error('Method not implemented');
  }

  async reserveInventory(
    productId: string,
    quantity: number,
  ): Promise<InventoryReservationResult> {
    throw new Error('Method not implemented');
  }

  async releaseInventory(
    productId: string,
    quantity: number,
  ): Promise<InventoryReservationResult> {
    throw new Error('Method not implemented');
  }

  async getInventoryInfo(productId: string): Promise<InventoryCheckResult> {
    throw new Error('Method not implemented');
  }

  async adjustInventory(
    productId: string,
    adjustment: number,
    reason: string,
  ): Promise<InventoryCheckResult> {
    throw new Error('Method not implemented');
  }
}

// === ARCHIVO: src/domain/ports/payment.service.port.ts ===
import { Injectable } from '@nestjs/common';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

export interface PaymentTransaction {
  transactionId: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  customerId: string;
  paymentToken?: string;
  cardLastFour?: string;
  cardBrand?: string;
  gatewayResponse?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface PaymentAuthorizationResult {
  authorized: boolean;
  transactionId: string;
  authorizationCode?: string;
  amount: number;
  currency: string;
  message: string;
  gatewayResponse: Record<string, unknown>;
}

export interface PaymentCaptureResult {
  captured: boolean;
  transactionId: string;
  capturedAmount: number;
  message: string;
  gatewayResponse: Record<string, unknown>;
}

export interface RefundRequest {
  transactionId: string;
  amount?: number;
  reason: string;
}

export interface RefundResult {
  refunded: boolean;
  refundId: string;
  transactionId: string;
  refundedAmount: number;
  message: string;
  gatewayResponse: Record<string, unknown>;
}

export interface PaymentServicePort {
  authorizePayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult>;
  capturePayment(transactionId: string, amount?: number): Promise<PaymentCaptureResult>;
  refundPayment(refundRequest: RefundRequest): Promise<RefundResult>;
  getTransactionStatus(transactionId: string): Promise<PaymentTransaction>;
  processPayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult>;
}

export const PAYMENT_SERVICE_TOKEN = 'PaymentService';

@Injectable()
export abstract class PaymentServiceAdapter implements PaymentServicePort {
  async authorizePayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult> {
    throw new Error('Method not implemented');
  }

  async capturePayment(transactionId: string, amount?: number): Promise<PaymentCaptureResult> {
    throw new Error('Method not implemented');
  }

  async refundPayment(refundRequest: RefundRequest): Promise<RefundResult> {
    throw new Error('Method not implemented');
  }

  async getTransactionStatus(transactionId: string): Promise<PaymentTransaction> {
    throw new Error('Method not implemented');
  }

  async processPayment(
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    paymentToken: string,
    customerId: string,
  ): Promise<PaymentAuthorizationResult> {
    throw new Error('Method not implemented');
  }
}

// === ARCHIVO: src/domain/exceptions/insufficient-inventory.exception.ts ===
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


// === ARCHIVO: src/domain/exceptions/payment-failed.exception.ts ===
import { HttpException, HttpStatus, HttpResponseOptions } from '@nestjs/common';

export interface PaymentFailureDetails {
  readonly orderId: string;
  readonly customerId: string;
  readonly attemptedAmount: number;
  readonly currency: string;
  readonly paymentMethod: string;
  readonly failureReason: PaymentFailureReason;
  readonly gatewayErrorCode?: string;
  readonly timestamp: Date;
  readonly retryAllowed: boolean;
}

export enum PaymentFailureReason {
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  CARD_EXPIRED = 'CARD_EXPIRED',
  CARD_DECLINED = 'CARD_DECLINED',
  INVALID_CARD = 'INVALID_CARD',
  GATEWAY_UNAVAILABLE = 'GATEWAY_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  FRAUD_DETECTED = 'FRAUD_DETECTED',
  CURRENCY_NOT_SUPPORTED = 'CURRENCY_NOT_SUPPORTED',
  AMOUNT_EXCEEDS_LIMIT = 'AMOUNT_EXCEEDS_LIMIT',
  PAYMENT_METHOD_DISABLED = 'PAYMENT_METHOD_DISABLED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class PaymentFailedException extends HttpException {
  private readonly failureDetails: PaymentFailureDetails;
  private readonly errorCode: string;
  private readonly isRetryable: boolean;
  private readonly originalError?: Error;

  constructor(
    details: PaymentFailureDetails,
    message?: string,
    options?: HttpResponseOptions,
  ) {
    const defaultMessage = `Payment failed for order ${details.orderId}: ${details.failureReason}`;
    const responseMessage = message || defaultMessage;

    const status = PaymentFailedException.determineHttpStatus(details.failureReason);
    const errorResponse = {
      statusCode: status,
      error: 'Payment Failed',
      message: responseMessage,
      errorCode: PaymentFailedException.mapFailureReasonToErrorCode(details.failureReason),
      details: {
        orderId: details.orderId,
        customerId: details.customerId,
        amount: details.attemptedAmount,
        currency: details.currency,
        paymentMethod: details.paymentMethod,
        failureReason: details.failureReason,
        gatewayErrorCode: details.gatewayErrorCode,
        timestamp: details.timestamp.toISOString(),
        retryAllowed: details.retryAllowed,
      },
      timestamp: new Date().toISOString(),
    };

    super(errorResponse, status, options);
    this.failureDetails = details;
    this.errorCode = errorResponse.errorCode;
    this.isRetryable = details.retryAllowed;
  }

  private static determineHttpStatus(reason: PaymentFailureReason): HttpStatus {
    switch (reason) {
      case PaymentFailureReason.INSUFFICIENT_FUNDS:
      case PaymentFailureReason.CARD_EXPIRED:
      case PaymentFailureReason.CARD_DECLINED:
      case PaymentFailureReason.INVALID_CARD:
        return HttpStatus.PAYMENT_REQUIRED;
      case PaymentFailureReason.FRAUD_DETECTED:
        return HttpStatus.FORBIDDEN;
      case PaymentFailureReason.GATEWAY_UNAVAILABLE:
      case PaymentFailureReason.GATEWAY_TIMEOUT:
        return HttpStatus.SERVICE_UNAVAILABLE;
      case PaymentFailureReason.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case PaymentFailureReason.CURRENCY_NOT_SUPPORTED:
      case PaymentFailureReason.AMOUNT_EXCEEDS_LIMIT:
      case PaymentFailureReason.PAYMENT_METHOD_DISABLED:
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private static mapFailureReasonToErrorCode(reason: PaymentFailureReason): string {
    const errorCodeMap: Record<PaymentFailureReason, string> = {
      [PaymentFailureReason.INSUFFICIENT_FUNDS]: 'PAYMENT_INSUFFICIENT_FUNDS',
      [PaymentFailureReason.CARD_EXPIRED]: 'PAYMENT_CARD_EXPIRED',
      [PaymentFailureReason.CARD_DECLINED]: 'PAYMENT_CARD_DECLINED',
      [PaymentFailureReason.INVALID_CARD]: 'PAYMENT_INVALID_CARD',
      [PaymentFailureReason.GATEWAY_UNAVAILABLE]: 'PAYMENT_GATEWAY_UNAVAILABLE',
      [PaymentFailureReason.GATEWAY_TIMEOUT]: 'PAYMENT_GATEWAY_TIMEOUT',
      [PaymentFailureReason.FRAUD_DETECTED]: 'PAYMENT_FRAUD_DETECTED',
      [PaymentFailureReason.CURRENCY_NOT_SUPPORTED]: 'PAYMENT_CURRENCY_NOT_SUPPORTED',
      [PaymentFailureReason.AMOUNT_EXCEEDS_LIMIT]: 'PAYMENT_AMOUNT_EXCEEDS_LIMIT',
      [PaymentFailureReason.PAYMENT_METHOD_DISABLED]: 'PAYMENT_METHOD_DISABLED',
      [PaymentFailureReason.UNAUTHORIZED]: 'PAYMENT_UNAUTHORIZED',
      [PaymentFailureReason.UNKNOWN_ERROR]: 'PAYMENT_UNKNOWN_ERROR',
    };
    return errorCodeMap[reason] || 'PAYMENT_UNKNOWN_ERROR';
  }

  getFailureDetails(): PaymentFailureDetails {
    return { ...this.failureDetails };
  }

  getOrderId(): string {
    return this.failureDetails.orderId;
  }

  getCustomerId(): string {
    return this.failureDetails.customerId;
  }

  getAttemptedAmount(): number {
    return this.failureDetails.attemptedAmount;
  }

  getFailureReason(): PaymentFailureReason {
    return this.failureDetails.failureReason;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  canRetry(): boolean {
    return this.isRetryable;
  }

  isGatewayError(): boolean {
    return (
      this.failureDetails.failureReason === PaymentFailureReason.GATEWAY_UNAVAILABLE ||
      this.failureDetails.failureReason === PaymentFailureReason.GATEWAY_TIMEOUT
    );
  }

  isCardError(): boolean {
    return (
      this.failureDetails.failureReason === PaymentFailureReason.CARD_DECLINED ||
      this.failureDetails.failureReason === PaymentFailureReason.CARD_EXPIRED ||
      this.failureDetails.failureReason === PaymentFailureReason.INVALID_CARD
    );
  }

  isFraudError(): boolean {
    return this.failureDetails.failureReason === PaymentFailureReason.FRAUD_DETECTED;
  }

  getRetryDelay(): number {
    if (!this.isRetryable) {
      return 0;
    }
    if (this.isGatewayError()) {
      return 5000;
    }
    return 0;
  }

  toLoggableObject(): Record<string, unknown> {
    return {
      exception: 'PaymentFailedException',
      orderId: this.failureDetails.orderId,
      customerId: this.failureDetails.customerId,
      amount: this.failureDetails.attemptedAmount,
      currency: this.failureDetails.currency,
      failureReason: this.failureDetails.failureReason,
      errorCode: this.errorCode,
      retryable: this.isRetryable,
      timestamp: this.failureDetails.timestamp.toISOString(),
    };
  }
}

// === ARCHIVO: src/domain/exceptions/order-not-found.exception.ts ===
import { HttpException, HttpStatus, HttpResponseOptions } from '@nestjs/common';

export interface OrderNotFoundDetails {
  readonly orderId: string;
  readonly searchFields: OrderSearchFields;
  readonly requestedAt: Date;
  readonly requestId?: string;
}

export interface OrderSearchFields {
  readonly orderNumber?: string;
  readonly customerId?: string;
  readonly email?: string;
  readonly createdAfter?: Date;
  readonly createdBefore?: Date;
}

export enum OrderNotFoundReason {
  NOT_EXISTS = 'NOT_EXISTS',
  DELETED = 'DELETED',
  CANCELLED = 'CANCELLED',
  NOT_VISIBLE_TO_CUSTOMER = 'NOT_VISIBLE_TO_CUSTOMER',
  EXPIRED = 'EXPIRED',
}

export class OrderNotFoundException extends HttpException {
  private readonly orderNotFoundDetails: OrderNotFoundDetails;
  private readonly reason: OrderNotFoundReason;
  private readonly searchContext: OrderSearchFields;

  constructor(
    orderId: string,
    reason: OrderNotFoundReason = OrderNotFoundReason.NOT_EXISTS,
    searchFields?: OrderSearchFields,
    message?: string,
    options?: HttpResponseOptions,
  ) {
    const defaultMessage = `Order with ID '${orderId}' was not found`;
    const responseMessage = message || defaultMessage;

    const status = OrderNotFoundException.determineHttpStatus(reason);
    const errorResponse = {
      statusCode: status,
      error: 'Order Not Found',
      message: responseMessage,
      errorCode: OrderNotFoundException.mapReasonToErrorCode(reason),
      details: {
        orderId,
        reason,
        searchFields: searchFields || {},
        requestedAt: new Date().toISOString(),
      },
      suggestion: OrderNotFoundException.generateSuggestion(reason),
      timestamp: new Date().toISOString(),
    };

    super(errorResponse, status, options);
    this.orderNotFoundDetails = {
      orderId,
      searchFields: searchFields || {},
      requestedAt: new Date(),
    };
    this.reason = reason;
    this.searchContext = searchFields || {};
  }

  private static determineHttpStatus(reason: OrderNotFoundReason): HttpStatus {
    switch (reason) {
      case OrderNotFoundReason.DELETED:
      case OrderNotFoundReason.CANCELLED:
        return HttpStatus.GONE;
      case OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER:
        return HttpStatus.FORBIDDEN;
      case OrderNotFoundReason.EXPIRED:
        return HttpStatus.GONE;
      default:
        return HttpStatus.NOT_FOUND;
    }
  }

  private static mapReasonToErrorCode(reason: OrderNotFoundReason): string {
    const errorCodeMap: Record<OrderNotFoundReason, string> = {
      [OrderNotFoundReason.NOT_EXISTS]: 'ORDER_NOT_FOUND',
      [OrderNotFoundReason.DELETED]: 'ORDER_DELETED',
      [OrderNotFoundReason.CANCELLED]: 'ORDER_CANCELLED',
      [OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER]: 'ORDER_NOT_VISIBLE',
      [OrderNotFoundReason.EXPIRED]: 'ORDER_EXPIRED',
    };
    return errorCodeMap[reason] || 'ORDER_NOT_FOUND';
  }

  private static generateSuggestion(reason: OrderNotFoundReason): string {
    switch (reason) {
      case OrderNotFoundReason.NOT_EXISTS:
        return 'Verify that the order ID is correct. If you recently placed the order, please allow a few minutes for it to be processed.';
      case OrderNotFoundReason.DELETED:
        return 'This order has been removed from our system and cannot be retrieved.';
      case OrderNotFoundReason.CANCELLED:
        return 'This order was cancelled. Please create a new order if you wish to proceed.';
      case OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER:
        return 'You do not have permission to view this order. Please contact support if you believe this is an error.';
      case OrderNotFoundReason.EXPIRED:
        return 'This order has expired and is no longer accessible.';
      default:
        return 'Please contact customer support for assistance with this order.';
    }
  }

  getOrderId(): string {
    return this.orderNotFoundDetails.orderId;
  }

  getReason(): OrderNotFoundReason {
    return this.reason;
  }

  getSearchFields(): OrderSearchFields {
    return { ...this.searchContext };
  }

  isDeleted(): boolean {
    return this.reason === OrderNotFoundReason.DELETED;
  }

  isCancelled(): boolean {
    return this.reason === OrderNotFoundReason.CANCELLED;
  }

  isExpired(): boolean {
    return this.reason === OrderNotFoundReason.EXPIRED;
  }

  isPermissionIssue(): boolean {
    return this.reason === OrderNotFoundReason.NOT_VISIBLE_TO_CUSTOMER;
  }

  getSuggestion(): string {
    return OrderNotFoundException.generateSuggestion(this.reason);
  }

  toLoggableObject(): Record<string, unknown> {
    return {
      exception: 'OrderNotFoundException',
      orderId: this.orderNotFoundDetails.orderId,
      reason: this.reason,
      searchFields: this.searchContext,
      requestedAt: this.orderNotFoundDetails.requestedAt.toISOString(),
    };
  }

  static fromOrderNumber(orderNumber: string): OrderNotFoundException {
    return new OrderNotFoundException(
      orderNumber,
      OrderNotFoundReason.NOT_EXISTS,
      { orderNumber },
    );
  }

  static fromCustomerId(customerId: string): OrderNotFoundException {
    return new OrderNotFoundException(
      customerId,
      OrderNotFoundReason.NOT_EXISTS,
      { customerId },
    );
  }
}


// === ARCHIVO: src/infrastructure/repositories/order.repository.ts ===
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

    const items: OrderItem[] = (prismaOrder.items || []).map((item) => ({
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

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
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

// === ARCHIVO: src/infrastructure/controllers/order.controller.ts ===
import { 
  Controller, Get, Post, Put, Delete, Body, Param, Query, 
  HttpCode, HttpStatus, UseGuards, ParseUUIDPipe, DefaultValuePipe 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '@application/services/order.service';
import { CreateOrderDto } from '@application/usecases/create-order.usecase';
import { UpdateOrderDto } from '@application/usecases/update-order.usecase';
import { Order } from '@domain/entities/order.entity';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';
import { PaginationDto } from '@application/dto/pagination.dto';
import { OrderResponseMapper } from '../mappers/order-response.mapper';
import { OrderFilterDto } from '../dto/order-filter.dto';

@ApiTags('orders')
@Controller('api/orders')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de pedido inválidos' })
  @ApiResponse({ status: 409, description: 'Conflicto - inventario insuficiente' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    const order = await this.orderService.getOrderById(id);
    if (!order) {
      throw new OrderNotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return order;
  }

  @Get('number/:orderNumber')
  @ApiOperation({ summary: 'Obtener un pedido por número de orden' })
  @ApiParam({ name: 'orderNumber', description: 'Número de pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async getOrderByNumber(@Param('orderNumber') orderNumber: string): Promise<Order> {
    const order = await this.orderService.getOrderByOrderNumber(orderNumber);
    if (!order) {
      throw new OrderNotFoundException(`Pedido ${orderNumber} no encontrado`);
    }
    return order;
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos con filtros y paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  async getOrders(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query() filterDto: OrderFilterDto,
  ): Promise<{ data: Order[]; total: number; page: number; limit: number; totalPages: number }> {
    return this.orderService.getOrders(
      { status: filterDto.status, customerId: filterDto.customerId },
      page,
      limit,
    );
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener pedidos de un cliente' })
  @ApiParam({ name: 'customerId', description: 'UUID del cliente' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del cliente' })
  async getOrdersByCustomer(@Param('customerId', ParseUUIDPipe) customerId: string): Promise<Order[]> {
    return this.orderService.getOrdersByCustomerId(customerId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderService.updateOrder(id, updateOrderDto);
    if (!order) {
      throw new OrderNotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return order;
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de un pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  @ApiResponse({ status: 400, description: 'Transición de estado inválida' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: string,
  ): Promise<Order> {
    const order = await this.orderService.updateOrderStatus(id, status as any);
    if (!order) {
      throw new OrderNotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return order;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 204, description: 'Pedido eliminado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const exists = await this.orderService.orderExists(id);
    if (!exists) {
      throw new OrderNotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return this.orderService.deleteOrder(id);
  }
}

// === ARCHIVO: src/infrastructure/external-services/inventory.service.ts ===
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

// === ARCHIVO: src/infrastructure/external-services/payment.service.ts ===
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { PaymentServicePort } from '@domain/ports/payment.service.port';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { PaymentInfo } from '@domain/entities/order.entity';

interface PaymentGatewayResponse {
  transactionId: string;
  status: 'approved' | 'declined' | 'pending' | 'error';
  amount: number;
  currency: string;
  timestamp: string;
  message?: string;
  authorizationCode?: string;
}

interface PaymentGatewayRequest {
  amount: number;
  currency: string;
  paymentMethod: {
    type: 'credit_card' | 'debit_card' | 'wallet';
    token?: string;
    cardLastFour?: string;
  };
  customerId: string;
  orderId: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class PaymentService implements PaymentServicePort {
  private readonly logger = new Logger(PaymentService.name);
  private readonly httpClient: AxiosInstance;
  private readonly gatewayUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;

  constructor(private readonly configService: ConfigService) {
    this.gatewayUrl = this.configService.get<string>('PAYMENT_GATEWAY_URL', 'https://api.payment-gateway.example.com');
    this.apiKey = this.configService.get<string>('PAYMENT_GATEWAY_API_KEY', 'test-api-key');
    this.timeout = this.configService.get<number>('PAYMENT_GATEWAY_TIMEOUT', 5000);

    this.httpClient = axios.create({
      baseURL: this.gatewayUrl,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Client-Version': '1.0.0',
        'X-Request-Id': this.generateRequestId(),
      },
    });

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.logger.error(`Payment gateway error: ${error.message}`, error.stack);
        return Promise.reject(error);
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  async processPayment(paymentInfo: PaymentInfo, orderId: string): Promise<PaymentInfo> {
    this.logger.log(`Processing payment for order ${orderId}, amount: ${paymentInfo.amount}`);

    const request: PaymentGatewayRequest = {
      amount: paymentInfo.amount,
      currency: paymentInfo.currency || 'USD',
      paymentMethod: {
        type: paymentInfo.method === 'credit_card' ? 'credit_card' : 'debit_card',
        token: paymentInfo.token,
        cardLastFour: paymentInfo.cardLastFour,
      },
      customerId: paymentInfo.customerId,
      orderId: orderId,
      metadata: {
        subtotal: paymentInfo.subtotal,
        tax: paymentInfo.tax,
        shippingCost: paymentInfo.shippingCost,
      },
    };

    try {
      const response = await this.httpClient.post<PaymentGatewayResponse>('/v1/transactions', request);
      const gatewayResponse = response.data;

      this.logger.log(`Payment gateway response for order ${orderId}: ${gatewayResponse.status}`);

      if (gatewayResponse.status === 'approved') {
        return {
          ...paymentInfo,
          transactionId: gatewayResponse.transactionId,
          authorizationCode: gatewayResponse.authorizationCode,
          status: 'completed',
          processedAt: new Date(gatewayResponse.timestamp),
          gatewayResponse: gatewayResponse.message,
        };
      } else if (gatewayResponse.status === 'pending') {
        return {
          ...paymentInfo,
          transactionId: gatewayResponse.transactionId,
          status: 'pending',
          processedAt: new Date(gatewayResponse.timestamp),
          gatewayResponse: gatewayResponse.message,
        };
      } else {
        throw new PaymentFailedException(
          gatewayResponse.message || 'Payment was declined by the payment gateway',
          orderId,
          gatewayResponse.transactionId
        );
      }
    } catch (error) {
      if (error instanceof PaymentFailedException) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : error.message;

        if (statusCode === 401) {
          throw new HttpException('Payment gateway authentication failed', HttpStatus.UNAUTHORIZED);
        } else if (statusCode === 429) {
          throw new HttpException('Payment gateway rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
        } else if (statusCode && statusCode >= 500) {
          throw new PaymentFailedException('Payment gateway temporarily unavailable', orderId);
        }

        throw new PaymentFailedException(`Payment gateway error: ${errorMessage}`, orderId);
      }

      throw new PaymentFailedException('Unexpected error processing payment', orderId);
    }
  }

  async refundPayment(transactionId: string, amount: number, reason: string): Promise<{ success: boolean; refundId: string }> {
    this.logger.log(`Processing refund for transaction ${transactionId}, amount: ${amount}`);

    try {
      const response = await this.httpClient.post('/v1/refunds', {
        transactionId,
        amount,
        reason,
        timestamp: new Date().toISOString(),
      });

      const refundData = response.data as { refundId: string; status: string };

      if (refundData.status === 'completed') {
        return { success: true, refundId: refundData.refundId };
      }

      return { success: false, refundId: '' };
    } catch (error) {
      this.logger.error(`Refund failed for transaction ${transactionId}`, error);
      throw new HttpException('Refund processing failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPaymentStatus(transactionId: string): Promise<{ status: string; timestamp: Date }> {
    this.logger.log(`Checking payment status for transaction ${transactionId}`);

    try {
      const response = await this.httpClient.get(`/v1/transactions/${transactionId}`);
      const data = response.data as { status: string; timestamp: string };

      return { status: data.status, timestamp: new Date(data.timestamp) };
    } catch (error) {
      throw new HttpException('Unable to retrieve payment status', HttpStatus.NOT_FOUND);
    }
  }
}

// === ARCHIVO: src/infrastructure/config/app.config.ts ===
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModuleAsyncOptions } from '@nestjs/common';

export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  database: DatabaseConfig;
  redis: RedisConfig;
  paymentGateway: PaymentGatewayConfig;
  cors: CorsConfig;
  logging: LoggingConfig;
  rateLimit: RateLimitConfig;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  maxConnections: number;
  connectionTimeout: number;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  keyPrefix: string;
  connectionTimeout: number;
  maxRetries: number;
}

export interface PaymentGatewayConfig {
  url: string;
  apiKey: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface CorsConfig {
  origin: string | string[];
  methods: string[];
  credentials: boolean;
  maxAge: number;
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'log' | 'debug' | 'verbose';
  format: 'json' | 'simple';
  fileEnabled: boolean;
  filePath?: string;
  maxFiles?: number;
  maxSize?: string;
}

export interface RateLimitConfig {
  ttl: number;
  limit: number;
  blockDuration: number;
}

export const configuration = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'orders_db',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10),
    keyPrefix: process.env.REDIS_KEY_PREFIX || 'order-api:',
    connectionTimeout: parseInt(process.env.REDIS_CONNECTION_TIMEOUT || '5000', 10),
    maxRetries: parseInt(process.env.REDIS_MAX_RETRIES || '3', 10),
  },

  paymentGateway: {
    url: process.env.PAYMENT_GATEWAY_URL || 'https://api.payment-gateway.example.com',
    apiKey: process.env.PAYMENT_GATEWAY_API_KEY || 'test-api-key',
    timeout: parseInt(process.env.PAYMENT_GATEWAY_TIMEOUT || '5000', 10),
    retryAttempts: parseInt(process.env.PAYMENT_GATEWAY_RETRY_ATTEMPTS || '3', 10),
    retryDelay: parseInt(process.env.PAYMENT_GATEWAY_RETRY_DELAY || '1000', 10),
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    maxAge: 86400,
  },

  logging: {
    level: (process.env.LOG_LEVEL as LoggingConfig['level']) || 'log',
    format: (process.env.LOG_FORMAT as LoggingConfig['format']) || 'json',
    fileEnabled: process.env.LOG_FILE_ENABLED === 'true',
    filePath: process.env.LOG_FILE_PATH || './logs/app.log',
    maxFiles: parseInt(process.env.LOG_MAX_FILES || '7', 10),
    maxSize: process.env.LOG_MAX_SIZE || '10m',
  },

  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
    limit: parseInt(process.env.RATE_LIMIT_LIMIT || '100', 10),
    blockDuration: parseInt(process.env.RATE_LIMIT_BLOCK_DURATION || '300', 10),
  },
});

export async function getDatabaseConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
  const dbConfig = configService.get<DatabaseConfig>('database');

  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: dbConfig.synchronize,
    logging: dbConfig.logging,
    extra: {
      max: dbConfig.maxConnections,
      connectionTimeoutMillis: dbConfig.connectionTimeout,
    },
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    migrationsRun: true,
  };
}

export async function getRedisConfig(configService: ConfigService): Promise<RedisModuleAsyncOptions> {
  const redisConfig = configService.get<RedisConfig>('redis');

  return {
    useFactory: () => ({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
      db: redisConfig.db,
      keyPrefix: redisConfig.keyPrefix,
      connectionTimeout: redisConfig.connectionTimeout,
      maxRetriesPerRequest: redisConfig.maxRetries,
      retryStrategy: (times: number) => {
        if (times > redisConfig.maxRetries) {
          return null;
        }
        return Math.min(times * 200, 2000);
      },
    }),
  };
}

export const validationSchema = {
  NODE_ENV: require('joi').string().valid('development', 'production', 'test').default('development'),
  PORT: require('joi').number().port().default(3000),
  DB_HOST: require('joi').string().required(),
  DB_PORT: require('joi').number().port().required(),
  DB_USERNAME: require('joi').string().required(),
  DB_PASSWORD: require('joi').string().required(),
  DB_NAME: require('joi').string().required(),
  REDIS_HOST: require('joi').string().required(),
  REDIS_PORT: require('joi').number().port().required(),
  PAYMENT_GATEWAY_URL: require('joi').string().uri().required(),
  PAYMENT_GATEWAY_API_KEY: require('joi').string().required(),
};

// === ARCHIVO: src/infrastructure/middlewares/global-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { InsufficientInventoryException } from '@domain/exceptions/insufficient-inventory.exception';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
  traceId?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const traceId = (request.headers['x-trace-id'] as string) || this.generateTraceId();

    const errorResponse = this.buildErrorResponse(exception, request, traceId);

    this.logException(exception, errorResponse, request);

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, request: Request, traceId: string): ErrorResponse {
    const baseResponse: ErrorResponse = {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: 'Internal server error',
      traceId,
    };

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, baseResponse, request);
    }

    if (exception instanceof PaymentFailedException) {
      return this.handlePaymentException(exception, baseResponse, request);
    }

    if (exception instanceof InsufficientInventoryException) {
      return this.handleInventoryException(exception, baseResponse, request);
    }

    if (exception instanceof OrderNotFoundException) {
      return this.handleOrderNotFoundException(exception, baseResponse, request);
    }

    if (exception instanceof QueryFailedError) {
      return this.handleDatabaseException(exception, baseResponse, request);
    }

    if (exception instanceof Error) {
      return {
        ...baseResponse,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message || 'An unexpected error occurred',
        error: exception.name,
      };
    }

    return baseResponse;
  }

  private handleHttpException(exception: HttpException, base: ErrorResponse, request: Request): ErrorResponse {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as Record<string, unknown>).message || exception.message;

    const errorResponse: ErrorResponse = {
      ...base,
      statusCode: status,
      message,
      error: exception.name,
    };

    if (exception instanceof BadRequestException) {
      errorResponse.details = typeof exceptionResponse === 'object' ? (exceptionResponse as Record<string, unknown>).errors : undefined;
    }

    if (exception instanceof NotFoundException) {
      errorResponse.message = `Resource not found: ${request.url}`;
    }

    if (exception instanceof UnauthorizedException) {
      errorResponse.message = 'Authentication required';
    }

    if (exception instanceof ForbiddenException) {
      errorResponse.message = 'Access denied';
    }

    if (exception instanceof ConflictException) {
      errorResponse.message = 'Resource conflict';
    }

    return errorResponse;
  }

  private handlePaymentException(exception: PaymentFailedException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.PAYMENT_REQUIRED,
      message: exception.message,
      error: 'PaymentFailed',
      details: {
        orderId: exception.orderId,
        transactionId: exception.transactionId,
      },
    };
  }

  private handleInventoryException(exception: InsufficientInventoryException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
      error: 'InsufficientInventory',
      details: {
        productId: exception.productId,
        requestedQuantity: exception.requestedQuantity,
        availableQuantity: exception.availableQuantity,
      },
    };
  }

  private handleOrderNotFoundException(exception: OrderNotFoundException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'OrderNotFound',
      details: {
        orderId: exception.orderId,
      },
    };
  }

  private handleDatabaseException(exception: QueryFailedError, base: ErrorResponse, request: Request): ErrorResponse {
    const errorMessage = exception.message;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database operation failed';

    if (errorMessage.includes('duplicate key')) {
      statusCode = HttpStatus.CONFLICT;
      message = 'Resource already exists';
    } else if (errorMessage.includes('violates foreign key constraint')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Referenced resource does not exist';
    } else if (errorMessage.includes('null value')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Required field is missing';
    }

    return {
      ...base,
      statusCode,
      message,
      error: 'DatabaseError',
      details: {
        code: exception.code,
      },
    };
  }

  private logException(exception: unknown, response: ErrorResponse, request: Request): void {
    const logLevel = response.statusCode >= 500 ? 'error' : response.statusCode >= 400 ? 'warn' : 'log';

    const logMessage = {
      level: logLevel,
      message: response.message,
      statusCode: response.statusCode,
      method: request.method,
      path: request.url,
      traceId: response.traceId,
      error: response.error,
      details: response.details,
    };

    if (logLevel === 'error') {
      this.logger.error(JSON.stringify(logMessage), exception instanceof Error ? exception.stack : undefined);
    } else if (logLevel === 'warn') {
      this.logger.warn(JSON.stringify(logMessage));
    } else {
      this.logger.log(JSON.stringify(logMessage));
    }
  }

  private generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}


// === ARCHIVO: src/infrastructure/middlewares/circuit-breaker.middleware.ts ===
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosInstance, AxiosError } from 'axios';

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  resetTimeout: number;
}

interface CircuitMetrics {
  failures: number;
  successes: number;
  lastFailureTime: number;
  nextAttempt: number;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private config: CircuitBreakerConfig;
  private metrics: CircuitMetrics;
  private httpClient: AxiosInstance;

  constructor(
    private readonly serviceName: string,
    config?: Partial<CircuitBreakerConfig>,
  ) {
    this.config = {
      failureThreshold: config?.failureThreshold ?? 5,
      successThreshold: config?.successThreshold ?? 2,
      timeout: config?.timeout ?? 60000,
      resetTimeout: config?.resetTimeout ?? 30000,
    };
    this.metrics = {
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      nextAttempt: 0,
    };
    this.httpClient = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getState(): CircuitState {
    if (this.state === CircuitState.OPEN) {
      const now = Date.now();
      if (now >= this.metrics.nextAttempt) {
        this.transitionTo(CircuitState.HALF_OPEN);
      }
    }
    return this.state;
  }

  private transitionTo(newState: CircuitState): void {
    const previousState = this.state;
    this.state = newState;

    if (newState === CircuitState.HALF_OPEN) {
      this.metrics.nextAttempt = Date.now() + this.config.resetTimeout;
    } else if (newState === CircuitState.CLOSED) {
      this.metrics.failures = 0;
      this.metrics.successes = 0;
    }

    console.log(
      `[CircuitBreaker] ${this.serviceName}: ${previousState} -> ${newState}`,
    );
  }

  async execute<T>(
    operation: () => Promise<T>,
    fallback?: () => Promise<T>,
  ): Promise<T> {
    const currentState = this.getState();

    if (currentState === CircuitState.OPEN) {
      if (fallback) {
        console.log(
          `[CircuitBreaker] ${this.serviceName}: OPEN - executing fallback`,
        );
        return fallback();
      }
      throw new HttpException(
        `Service ${this.serviceName} is currently unavailable`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    try {
      const result = await operation();
      this.recordSuccess();
      return result;
    } catch (error) {
      this.recordFailure(error as Error);

      if (this.state === CircuitState.HALF_OPEN) {
        this.transitionTo(CircuitState.OPEN);
      }

      if (fallback) {
        return fallback();
      }
      throw error;
    }
  }

  private recordSuccess(): void {
    this.metrics.successes++;
    this.metrics.lastFailureTime = 0;

    if (this.state === CircuitState.HALF_OPEN) {
      if (this.metrics.successes >= this.config.successThreshold) {
        this.transitionTo(CircuitState.CLOSED);
      }
    }
  }

  private recordFailure(error: Error): void {
    this.metrics.failures++;
    this.metrics.lastFailureTime = Date.now();

    const axiosError = error as AxiosError;
    const isServerError =
      axiosError.response?.status &&
      axiosError.response.status >= 500;

    if (
      this.state === CircuitState.CLOSED &&
      this.metrics.failures >= this.config.failureThreshold
    ) {
      this.transitionTo(CircuitState.OPEN);
    } else if (this.state === CircuitState.HALF_OPEN && isServerError) {
      this.transitionTo(CircuitState.OPEN);
    }

    console.error(
      `[CircuitBreaker] ${this.serviceName}: Failure recorded. ` +
        `Total failures: ${this.metrics.failures}, State: ${this.state}`,
      error.message,
    );
  }

  getMetrics(): { state: CircuitState; failures: number; successes: number } {
    return {
      state: this.state,
      failures: this.metrics.failures,
      successes: this.metrics.successes,
    };
  }

  reset(): void {
    this.state = CircuitState.CLOSED;
    this.metrics = {
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      nextAttempt: 0,
    };
    console.log(`[CircuitBreaker] ${this.serviceName}: Circuit manually reset`);
  }
}

@Injectable()
export class CircuitBreakerMiddleware implements NestMiddleware {
  private readonly inventoryCircuit: CircuitBreaker;
  private readonly paymentCircuit: CircuitBreaker;

  constructor() {
    this.inventoryCircuit = new CircuitBreaker('inventory-service', {
      failureThreshold: 5,
      successThreshold: 2,
      timeout: 60000,
      resetTimeout: 30000,
    });

    this.paymentCircuit = new CircuitBreaker('payment-service', {
      failureThreshold: 3,
      successThreshold: 1,
      timeout: 30000,
      resetTimeout: 15000,
    });
  }

  use(req: Request, res: Response, next: NextFunction): void {
    (req as any).circuitBreaker = {
      inventory: this.inventoryCircuit,
      payment: this.paymentCircuit,
    };
    next();
  }

  getInventoryCircuit(): CircuitBreaker {
    return this.inventoryCircuit;
  }

  getPaymentCircuit(): CircuitBreaker {
    return this.paymentCircuit;
  }

  getHealthStatus() {
    return {
      inventory: this.inventoryCircuit.getMetrics(),
      payment: this.paymentCircuit.getMetrics(),
    };
  }
}

// === ARCHIVO: src/app.module.ts ===
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


// === ARCHIVO: src/application/usecases/create-order.usecase.ts ===
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderRepositoryPort, CreateOrderParams } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { Product } from '@domain/entities/product.entity';
import { InsufficientInventoryException } from '@domain/exceptions/insufficient-inventory.exception';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';
import { PaymentServicePort } from '@domain/ports/payment.service.port';
import { v4 as uuidv4 } from 'uuid';

export interface CreateOrderInput {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  payment: {
    method: string;
    cardToken: string;
  };
  notes?: string;
}

export interface CreateOrderOutput {
  order: Order;
  success: boolean;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(forwardRef(() => InventoryServicePort))
    private readonly inventoryService: InventoryServicePort,
    @Inject(forwardRef(() => PaymentServicePort))
    private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const orderNumber = this.generateOrderNumber();
    const subtotal = this.calculateSubtotal(input.items);
    const shippingCost = this.calculateShippingCost(subtotal);
    const tax = this.calculateTax(subtotal);
    const total = subtotal + shippingCost + tax;

    const inventoryCheck = await this.validateInventory(input.items);
    if (!inventoryCheck.valid) {
      throw new InsufficientInventoryException(
        `Insufficient inventory for product: ${inventoryCheck.productName}`,
      );
    }

    const paymentResult = await this.paymentService.processPayment({
      amount: total,
      currency: 'USD',
      method: input.payment.method,
      cardToken: input.payment.cardToken,
      customerId: input.customerId,
      description: `Order ${orderNumber}`,
    });

    if (!paymentResult.success) {
      await this.releaseInventory(input.items);
      throw new PaymentFailedException(
        paymentResult.errorMessage || 'Payment processing failed',
      );
    }

    const createParams: CreateOrderParams = {
      orderNumber,
      customer: {
        id: input.customerId,
        name: input.customerName,
        email: input.customerEmail,
      },
      items: input.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      shippingAddress: {
        street: input.shippingAddress.street,
        city: input.shippingAddress.city,
        state: input.shippingAddress.state,
        postalCode: input.shippingAddress.postalCode,
        country: input.shippingAddress.country,
      },
      payment: {
        method: input.payment.method,
        transactionId: paymentResult.transactionId || '',
        status: paymentResult.success ? 'completed' : 'failed',
      },
      subtotal,
      shippingCost,
      tax,
      total,
      status: OrderStatus.PENDING,
      notes: input.notes,
    };

    const order = await this.orderRepository.create(createParams);

    await this.reserveInventory(input.items);

    return {
      order,
      success: true,
    };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = uuidv4().split('-')[0].toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  private calculateSubtotal(items: CreateOrderInput['items']): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  private calculateShippingCost(subtotal: number): number {
    return subtotal >= 100 ? 0 : 9.99;
  }

  private calculateTax(subtotal: number): number {
    return Math.round(subtotal * 0.08 * 100) / 100;
  }

  private async validateInventory(
    items: CreateOrderInput['items'],
  ): Promise<{ valid: boolean; productName?: string }> {
    for (const item of items) {
      const available = await this.inventoryService.checkAvailability(
        item.productId,
        item.quantity,
      );
      if (!available) {
        return { valid: false, productName: item.productName };
      }
    }
    return { valid: true };
  }

  private async reserveInventory(
    items: CreateOrderInput['items'],
  ): Promise<void> {
    for (const item of items) {
      await this.inventoryService.reserve(item.productId, item.quantity);
    }
  }

  private async releaseInventory(
    items: CreateOrderInput['items'],
  ): Promise<void> {
    for (const item of items) {
      await this.inventoryService.release(item.productId, item.quantity);
    }
  }
}

// === ARCHIVO: src/application/usecases/update-order.usecase.ts ===
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderRepositoryPort, UpdateOrderParams } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';

export interface UpdateOrderInput {
  orderId: string;
  newStatus: OrderStatus;
  notes?: string;
}

export interface UpdateOrderOutput {
  order: Order;
  success: boolean;
}

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(forwardRef(() => InventoryServicePort))
    private readonly inventoryService: InventoryServicePort,
  ) {}

  async execute(input: UpdateOrderInput): Promise<UpdateOrderOutput> {
    const existingOrder = await this.orderRepository.findById(input.orderId);

    if (!existingOrder) {
      throw new OrderNotFoundException(
        `Order with ID ${input.orderId} not found`,
      );
    }

    if (!existingOrder.canTransitionTo(input.newStatus)) {
      throw new Error(
        `Invalid status transition from ${existingOrder.status} to ${input.newStatus}`,
      );
    }

    await this.handleInventoryForStatusTransition(
      existingOrder,
      input.newStatus,
    );

    const updateParams: UpdateOrderParams = {
      status: input.newStatus,
      notes: input.notes,
    };

    const updatedOrder = await this.orderRepository.update(
      input.orderId,
      updateParams,
    );

    return {
      order: updatedOrder,
      success: true,
    };
  }

  private async handleInventoryForStatusTransition(
    order: Order,
    newStatus: OrderStatus,
  ): Promise<void> {
    if (newStatus === OrderStatus.CANCELLED) {
      await this.releaseOrderInventory(order);
    } else if (newStatus === OrderStatus.CONFIRMED) {
      await this.confirmOrderInventory(order);
    }
  }

  private async releaseOrderInventory(order: Order): Promise<void> {
    for (const item of order.items) {
      await this.inventoryService.release(item.productId, item.quantity);
    }
  }

  private async confirmOrderInventory(order: Order): Promise<void> {
    for (const item of order.items) {
      const confirmed = await this.inventoryService.confirmReservation(
        item.productId,
        item.quantity,
      );
      if (!confirmed) {
        throw new Error(
          `Failed to confirm inventory reservation for product ${item.productId}`,
        );
      }
    }
  }

  async getOrderStatusHistory(orderId: string): Promise<OrderStatus[]> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new OrderNotFoundException(`Order with ID ${orderId} not found`);
    }
    const history: OrderStatus[] = [order.status];
    return history;
  }

  async cancelOrder(orderId: string, reason: string): Promise<UpdateOrderOutput> {
    const existingOrder = await this.orderRepository.findById(orderId);
    if (!existingOrder) {
      throw new OrderNotFoundException(
        `Order with ID ${orderId} not found`,
      );
    }
    if (existingOrder.status === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel a delivered order');
    }
    if (existingOrder.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }
    return this.execute({
      orderId,
      newStatus: OrderStatus.CANCELLED,
      notes: `Cancellation reason: ${reason}`,
    });
  }
}

// === ARCHIVO: src/application/services/order.service.ts ===
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderRepositoryPort, OrderFilter, PaginatedResult } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { CreateOrderUseCase, CreateOrderInput, CreateOrderOutput } from '@application/usecases/create-order.usecase';
import { UpdateOrderUseCase, UpdateOrderInput, UpdateOrderOutput } from '@application/usecases/update-order.usecase';

export interface OrderServiceConfig {
  maxRetries: number;
  timeout: number;
  enableTransaction: boolean;
}

@Injectable()
export class OrderService {
  private readonly config: OrderServiceConfig;

  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(forwardRef(() => CreateOrderUseCase))
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject(forwardRef(() => UpdateOrderUseCase))
    private readonly updateOrderUseCase: UpdateOrderUseCase,
  ) {
    this.config = {
      maxRetries: 3,
      timeout: 30000,
      enableTransaction: true,
    };
  }

  async createOrder(input: CreateOrderInput): Promise<CreateOrderOutput> {
    try {
      return await this.createOrderUseCase.execute(input);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateOrderStatus(input: UpdateOrderInput): Promise<UpdateOrderOutput> {
    try {
      return await this.updateOrderUseCase.execute(input);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async findOrderByNumber(orderNumber: string): Promise<Order | null> {
    return this.orderRepository.findByOrderNumber(orderNumber);
  }

  async findOrders(
    filter?: OrderFilter,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll(filter, page, limit);
  }

  async findOrdersByCustomer(
    customerId: string,
  ): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }

  async cancelOrder(orderId: string, reason: string): Promise<UpdateOrderOutput> {
    return this.updateOrderUseCase.cancelOrder(orderId, reason);
  }

  async getOrderCount(filter?: OrderFilter): Promise<number> {
    return this.orderRepository.count(filter);
  }

  async getOrdersByStatus(
    status: OrderStatus,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll({ status }, page, limit);
  }

  async getRecentOrders(
    limit: number = 10,
  ): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll(undefined, 1, limit);
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred');
  }

  getConfig(): OrderServiceConfig {
    return { ...this.config };
  }
}

// === ARCHIVO: test/order.controller.spec.ts ===
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

// === ARCHIVO: test/order.usecase.spec.ts ===
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

// === ARCHIVO: test/order.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../src/application/services/order.service';
import { OrderRepositoryPort, PaginatedResult, OrderFilter } from '../src/domain/ports/order.repository.port';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: OrderRepositoryPort, useValue: mockOrderRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepositoryPort>(OrderRepositoryPort);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('debe retornar un pedido cuando existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(mockOrder);

      const result = await service.findById('order-123');

      expect(mockOrderRepository.findById).toHaveBeenCalledWith('order-123');
      expect(result).toEqual(mockOrder);
    });

    it('debe retornar null cuando el pedido no existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      const result = await service.findById('order-999');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('debe retornar pedidos paginados sin filtros', async () => {
      mockOrderRepository.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await service.findAll();

      expect(mockOrderRepository.findAll).toHaveBeenCalledWith(undefined, 1, 10);
      expect(result).toEqual(mockPaginatedResult);
    });

    it('debe aplicar filtros correctamente', async () => {
      const filter: OrderFilter = { status: OrderStatus.PENDING };
      mockOrderRepository.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await service.findAll(filter, 2, 20);

      expect(mockOrderRepository.findAll).toHaveBeenCalledWith(filter, 2, 20);
      expect(result).toEqual(mockPaginatedResult);
    });

    it('debe usar valores por defecto para paginación', async () => {
      mockOrderRepository.findAll.mockResolvedValue(mockPaginatedResult);

      await service.findAll();

      expect(mockOrderRepository.findAll).toHaveBeenCalledWith(undefined, 1, 10);
    });
  });

  describe('findByCustomerId', () => {
    it('debe retornar pedidos de un cliente específico', async () => {
      mockOrderRepository.findByCustomerId.mockResolvedValue([mockOrder]);

      const result = await service.findByCustomerId('customer-456');

      expect(mockOrderRepository.findByCustomerId).toHaveBeenCalledWith('customer-456');
      expect(result).toEqual([mockOrder]);
    });

    it('debe retornar array vacío cuando el cliente no tiene pedidos', async () => {
      mockOrderRepository.findByCustomerId.mockResolvedValue([]);

      const result = await service.findByCustomerId('customer-999');

      expect(result).toEqual([]);
    });
  });

  describe('findByOrderNumber', () => {
    it('debe retornar un pedido por número de orden', async () => {
      mockOrderRepository.findByOrderNumber.mockResolvedValue(mockOrder);

      const result = await service.findByOrderNumber('ORD-2024-001');

      expect(mockOrderRepository.findByOrderNumber).toHaveBeenCalledWith('ORD-2024-001');
      expect(result).toEqual(mockOrder);
    });

    it('debe lanzar OrderNotFoundException cuando el número de orden no existe', async () => {
      mockOrderRepository.findByOrderNumber.mockResolvedValue(null);

      await expect(service.findByOrderNumber('ORD-9999-999')).rejects.toThrow(
        OrderNotFoundException,
      );
    });
  });

  describe('updateStatus', () => {
    it('debe actualizar el estado de un pedido exitosamente', async () => {
      const updatedOrder = { ...mockOrder, _status: OrderStatus.CONFIRMED };
      mockOrderRepository.updateStatus.mockResolvedValue(updatedOrder);

      const result = await service.updateStatus('order-123', OrderStatus.CONFIRMED);

      expect(mockOrderRepository.updateStatus).toHaveBeenCalledWith(
        'order-123',
        OrderStatus.CONFIRMED,
      );
      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });

    it('debe lanzar OrderNotFoundException cuando el pedido no existe', async () => {
      mockOrderRepository.updateStatus.mockRejectedValue(
        new OrderNotFoundException('order-999'),
      );

      await expect(
        service.updateStatus('order-999', OrderStatus.CONFIRMED),
      ).rejects.toThrow(OrderNotFoundException);
    });
  });

  describe('count', () => {
    it('debe retornar el total de pedidos', async () => {
      mockOrderRepository.count.mockResolvedValue(42);

      const result = await service.count();

      expect(mockOrderRepository.count).toHaveBeenCalledWith(undefined);
      expect(result).toBe(42);
    });

    it('debe aplicar filtro al contar', async () => {
      const filter: OrderFilter = { status: OrderStatus.CANCELLED };
      mockOrderRepository.count.mockResolvedValue(5);

      const result = await service.count(filter);

      expect(mockOrderRepository.count).toHaveBeenCalledWith(filter);
      expect(result).toBe(5);
    });
  });

  describe('exists', () => {
    it('debe retornar true cuando el pedido existe', async () => {
      mockOrderRepository.exists.mockResolvedValue(true);

      const result = await service.exists('order-123');

      expect(mockOrderRepository.exists).toHaveBeenCalledWith('order-123');
      expect(result).toBe(true);
    });

    it('debe retornar false cuando el pedido no existe', async () => {
      mockOrderRepository.exists.mockResolvedValue(false);

      const result = await service.exists('order-999');

      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    it('debe eliminar un pedido exitosamente', async () => {
      mockOrderRepository.exists.mockResolvedValue(true);
      mockOrderRepository.delete.mockResolvedValue(undefined);

      await service.delete('order-123');

      expect(mockOrderRepository.exists).toHaveBeenCalledWith('order-123');
      expect(mockOrderRepository.delete).toHaveBeenCalledWith('order-123');
    });

    it('debe lanzar OrderNotFoundException al intentar eliminar un pedido inexistente', async () => {
      mockOrderRepository.exists.mockResolvedValue(false);

      await expect(service.delete('order-999')).rejects.toThrow(OrderNotFoundException);
      expect(mockOrderRepository.delete).not.toHaveBeenCalled();
    });
  });


// === ARCHIVO: Dockerfile ===
# Dockerfile para la API de Pedidos - NestJS con Node.js 22
# Configuración multi-stage para optimizar el tamaño de la imagen final

# Stage 1: Dependencias
FROM node:22-alpine AS deps

# Instalar pnpm para gestión de dependencias más rápida
RUN corepack enable && corepack prepare pnpm@latest --activate

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración primero para aprovechar caché
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias usando pnpm con auditoría de seguridad
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Compilación
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar dependencias del stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar archivos fuente
COPY package.json package-lock.json* ./
COPY tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
COPY src ./src

# Generar el cliente de Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Stage 3: Producción
FROM node:22-alpine AS runner

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios del stage de compilación
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Generar cliente de Prisma en runtime (solo tipos, no necesita BD)
RUN npx prisma generate --generator-client

# Cambiar permisos para usuario no-root
RUN chown -R nestjs:nodejs /app

# Cambiar al usuario no-root
USER nestjs

# Exponer puerto de la aplicación
EXPOSE 3000

# Variables de entorno requeridas
ENV NODE_ENV=production
ENV PORT=3000

# Etiquetas de metadata
LABEL maintainer="dev@empresa.com"
LABEL version="1.0.0"
LABEL description="API de pedidos para e-commerce"

# Configuración de Node.js para producción
ENV NODE_OPTIONS="--max-old-space-size=512"

# Script de inicio con manejo de señales graceful
CMD ["node", "dist/main.js"]

// === ARCHIVO: docker-compose.yml ===
version: '3.9'

services:
  # Servicio principal de la API de Pedidos
  order-api:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    container_name: order-api
    restart: unless-stopped
    ports:
      - "${APP_PORT:-3000}:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - PORT=${APP_PORT:-3000}
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - REDIS_PASSWORD=${REDIS_PASSWORD}
      - SWAGGER_ENABLED=${SWAGGER_ENABLED:-false}
      - LOG_LEVEL=${LOG_LEVEL:-info}
      - JWT_SECRET=${JWT_SECRET}
      - EXTERNAL_INVENTORY_URL=${EXTERNAL_INVENTORY_URL}
      - EXTERNAL_PAYMENT_URL=${EXTERNAL_PAYMENT_URL}
      - CIRCUIT_BREAKER_THRESHOLD=${CIRCUIT_BREAKER_THRESHOLD:-5}
      - CIRCUIT_BREAKER_TIMEOUT=${CIRCUIT_BREAKER_TIMEOUT:-60000}
      - CACHE_TTL=${CACHE_TTL:-300}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - order-network
    volumes:
      - ./logs:/app/logs
      - order-api-data:/app/dist
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3

  # Base de datos PostgreSQL
  postgres:
    image: postgres:16-alpine
    container_name: order-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=${DB_USER:-postgres}
      - POSTGRES_PASSWORD=${DB_PASSWORD:-postgres}
      - POSTGRES_DB=${DB_NAME:-orderdb}
      - POSTGRES_MAX_CONNECTIONS=${DB_MAX_CONNECTIONS:-100}
      - POSTGRES_SHARED_BUFFERS=${DB_SHARED_BUFFERS:-256MB}
    ports:
      - "${DB_PORT:-5432}:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    networks:
      - order-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres} -d ${DB_NAME:-orderdb}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    command:
      - postgres
      - -c
      - max_connections=${DB_MAX_CONNECTIONS:-100}
      - -c
      - shared_buffers=${DB_SHARED_BUFFERS:-256MB}
      - -c
      - effective_cache_size=1GB
      - -c
      - maintenance_work_mem=128MB
      - -c
      - checkpoint_completion_target=0.9
      - -c
      - wal_buffers=16MB
      - -c
      - default_statistics_target=100
      - -c
      - random_page_cost=1.1
      - -c
      - effective_io_concurrency=200
      - -c
      - work_mem=8MB
      - -c
      - min_wal_size=1GB
      - -c
      - max_wal_size=4GB

  # Redis para caché y sesiones
  redis:
    image: redis:7-alpine
    container_name: order-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD:-redispass} --maxmemory 512mb --maxmemory-policy allkeys-lru --appendonly yes
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis-data:/data
    networks:
      - order-network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.25'
          memory: 256M

  # Servicio de migración de base de datos
  db-migrate:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    container_name: order-db-migrate
    environment:
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      postgres:
        condition: service_healthy
    command: ["sh", "-c", "npx prisma migrate deploy"]
    networks:
      - order-network

  # Generador de cliente Prisma
  db-generate:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    container_name: order-db-generate
    command: ["npx", "prisma", "generate"]
    volumes:
      - ./prisma:/app/prisma
    networks:
      - order-network

networks:
  order-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  order-api-data:
    driver: local

// === ARCHIVO: .env ===
# ============================================================
# CONFIGURACIÓN DE APLICACIÓN - API DE PEDIDOS
# ============================================================
# Este archivo contiene las variables de entorno para desarrollo local
# NO incluir en control de versiones con valores sensibles de producción

# ------------------------------------------------------------
# Configuración del Servidor
# ------------------------------------------------------------
NODE_ENV=development
PORT=3000
APP_NAME=order-api
APP_VERSION=1.0.0

# ------------------------------------------------------------
# Configuración de Base de Datos PostgreSQL
# ------------------------------------------------------------
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_MAX_CONNECTIONS=100
DB_SSL=false

# URL de conexión completa (override para Docker/local)
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public&connection_limit=${DB_MAX_CONNECTIONS}

# ------------------------------------------------------------
# Configuración de Redis
# ------------------------------------------------------------
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redispass
REDIS_DB=0
REDIS_KEY_PREFIX=order:cache:

# Configuración de caché
CACHE_ENABLED=true
CACHE_TTL=300
CACHE_MAX_ITEMS=10000

# ------------------------------------------------------------
# Configuración de Swagger/Documentación
# ------------------------------------------------------------
SWAGGER_ENABLED=true
SWAGGER_TITLE="Order API - E-commerce"
SWAGGER_DESCRIPTION="API REST para gestión de pedidos en plataforma de e-commerce"
SWAGGER_VERSION=1.0
SWAGGER_PATH=/api/docs

# ------------------------------------------------------------
# Configuración de Logging
# ------------------------------------------------------------
LOG_LEVEL=debug
LOG_FORMAT=json
LOG_DIR=./logs
LOG_MAX_FILES=7
LOG_MAX_SIZE=100m

# ------------------------------------------------------------
# Configuración de Seguridad
# ------------------------------------------------------------
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# ------------------------------------------------------------
# Integración con Servicios Externos
# ------------------------------------------------------------
# Sistema de Inventario Externo
EXTERNAL_INVENTORY_URL=http://localhost:4000
EXTERNAL_INVENTORY_TIMEOUT=5000
EXTERNAL_INVENTORY_RETRY_ATTEMPTS=3

# Motor de Pagos Externo
EXTERNAL_PAYMENT_URL=http://localhost:5000
EXTERNAL_PAYMENT_TIMEOUT=10000
EXTERNAL_PAYMENT_RETRY_ATTEMPTS=3

# ------------------------------------------------------------
# Configuración de Circuit Breaker
# ------------------------------------------------------------
CIRCUIT_BREAKER_ENABLED=true
CIRCUIT_BREAKER_THRESHOLD=5
CIRCUIT_BREAKER_TIMEOUT=60000
CIRCUIT_BREAKER_RESET_TIMEOUT=30000

# ------------------------------------------------------------
# Configuración de Health Checks
# ------------------------------------------------------------
HEALTH_CHECK_ENABLED=true
HEALTH_CHECK_PATH=/health
HEALTH_CHECK_INTERVAL=30000

# ------------------------------------------------------------
# Configuración de Aplicación (Features Flags)
# ------------------------------------------------------------
FEATURE_PAYMENT_ASYNC=false
FEATURE_INVENTORY_CACHE=true
FEATURE_ORDER_NOTIFICATIONS=true
FEATURE_AUDIT_LOG=true

# ------------------------------------------------------------
# Configuración de Timeout Global
# ------------------------------------------------------------
GLOBAL_TIMEOUT=30000
REQUEST_TIMEOUT=15000


// === ARCHIVO: src/application/services/order.service.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { OrderRepositoryPort, CreateOrderParams, UpdateOrderParams, OrderFilter, PaginatedResult } from '@domain/ports/order.repository.port';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { CreateOrderUseCase } from '@application/usecases/create-order.usecase';
import { UpdateOrderUseCase } from '@application/usecases/update-order.usecase';
import { PaymentServicePort } from '@domain/ports/payment.service.port';
import { InventoryServicePort } from '@domain/ports/inventory.service.port';

export interface OrderServiceConfig {
  readonly maxRetries: number;
  readonly timeout: number;
  readonly enableNotifications: boolean;
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly config: OrderServiceConfig;

  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderRepository: OrderRepositoryPort,
    private readonly paymentService: PaymentServicePort,
    private readonly inventoryService: InventoryServicePort,
  ) {
    this.config = {
      maxRetries: 3,
      timeout: 30000,
      enableNotifications: true,
    };
  }

  async createOrder(input: CreateOrderParams): Promise<Order> {
    return this.createOrderUseCase.execute(input);
  }

  async updateOrderStatus(input: UpdateOrderParams): Promise<Order> {
    return this.updateOrderUseCase.execute(input);
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async findOrderByNumber(orderNumber: string): Promise<Order | null> {
    return this.orderRepository.findByOrderNumber(orderNumber);
  }

  async findOrders(filter?: OrderFilter, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll(filter, page, limit);
  }

  async findOrdersByCustomer(customerId: string): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }

  async cancelOrder(orderId: string, reason: string): Promise<Order> {
    return this.updateOrderUseCase.cancelOrder(orderId, reason);
  }

  async getOrderCount(filter?: OrderFilter): Promise<number> {
    return this.orderRepository.count(filter);
  }

  async getOrdersByStatus(status: OrderStatus, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll({ status }, page, limit);
  }

  async getRecentOrders(days: number, limit = 10): Promise<Order[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const result = await this.orderRepository.findAll({ startDate }, 1, limit);
    return result.data;
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<Order | null> {
    return this.orderRepository.findByOrderNumber(orderNumber);
  }

  async getOrders(filter?: OrderFilter, page = 1, limit = 10): Promise<PaginatedResult<Order>> {
    return this.orderRepository.findAll(filter, page, limit);
  }

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }

  async updateOrder(id: string, params: UpdateOrderParams): Promise<Order> {
    return this.orderRepository.update(id, params);
  }

  async orderExists(id: string): Promise<boolean> {
    return this.orderRepository.exists(id);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('Unknown error occurred');
  }

  getConfig(): OrderServiceConfig {
    return this.config;
  }
}

// === ARCHIVO: src/infrastructure/middlewares/global-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PaymentFailedException } from '@domain/exceptions/payment-failed.exception';
import { InsufficientInventoryException } from '@domain/exceptions/insufficient-inventory.exception';
import { OrderNotFoundException } from '@domain/exceptions/order-not-found.exception';

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  status: string;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
  traceId?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const traceId = (request.headers['x-trace-id'] as string) || this.generateTraceId();

    const errorResponse = this.buildErrorResponse(exception, request, traceId);

    this.logException(exception, errorResponse, request);

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, request: Request, traceId: string): ErrorResponse {
    const baseResponse: ErrorResponse = {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      status: 'error',
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: 'Internal server error',
      traceId,
    };

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, baseResponse, request);
    }

    if (exception instanceof PaymentFailedException) {
      return this.handlePaymentException(exception, baseResponse, request);
    }

    if (exception instanceof InsufficientInventoryException) {
      return this.handleInventoryException(exception, baseResponse, request);
    }

    if (exception instanceof OrderNotFoundException) {
      return this.handleOrderNotFoundException(exception, baseResponse, request);
    }

    if (exception instanceof QueryFailedError) {
      return this.handleDatabaseException(exception, baseResponse, request);
    }

    if (exception instanceof Error) {
      return {
        ...baseResponse,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message || 'An unexpected error occurred',
        error: exception.name,
      };
    }

    return baseResponse;
  }

  private handleHttpException(exception: HttpException, base: ErrorResponse, request: Request): ErrorResponse {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as Record<string, unknown>).message || exception.message;

    const errorResponse: ErrorResponse = {
      ...base,
      statusCode: status,
      message,
      error: exception.name,
    };

    if (exception instanceof BadRequestException) {
      errorResponse.details = typeof exceptionResponse === 'object' ? (exceptionResponse as Record<string, unknown>).errors : undefined;
    }

    if (exception instanceof NotFoundException) {
      errorResponse.message = `Resource not found: ${request.url}`;
    }

    if (exception instanceof UnauthorizedException) {
      errorResponse.message = 'Authentication required';
    }

    if (exception instanceof ForbiddenException) {
      errorResponse.message = 'Access denied';
    }

    if (exception instanceof ConflictException) {
      errorResponse.message = 'Resource conflict';
    }

    return errorResponse;
  }

  private handlePaymentException(exception: PaymentFailedException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.PAYMENT_REQUIRED,
      message: exception.message,
      error: 'PaymentFailed',
      details: {
        orderId: exception.orderId,
        transactionId: exception.transactionId,
      },
    };
  }

  private handleInventoryException(exception: InsufficientInventoryException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
      error: 'InsufficientInventory',
      details: {
        productId: exception.productId,
        requestedQuantity: exception.requestedQuantity,
        availableQuantity: exception.availableQuantity,
      },
    };
  }

  private handleOrderNotFoundException(exception: OrderNotFoundException, base: ErrorResponse, request: Request): ErrorResponse {
    return {
      ...base,
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'OrderNotFound',
      details: {
        orderId: exception.orderId,
      },
    };
  }

  private handleDatabaseException(exception: QueryFailedError, base: ErrorResponse, request: Request): ErrorResponse {
    const errorMessage = exception.message;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database operation failed';

    if (errorMessage.includes('duplicate key')) {
      statusCode = HttpStatus.CONFLICT;
      message = 'Resource already exists';
    } else if (errorMessage.includes('violates foreign key constraint')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Referenced resource does not exist';
    } else if (errorMessage.includes('null value')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Required field is missing';
    }

    return {
      ...base,
      statusCode,
      message,
      error: 'DatabaseError',
      details: {
        code: exception.code,
      },
    };
  }

  private logException(exception: unknown, response: ErrorResponse, request: Request): void {
    const logLevel = response.statusCode >= 500 ? 'error' : response.statusCode >= 400 ? 'warn' : 'log';

    const logMessage = {
      level: logLevel,
      message: response.message,
      statusCode: response.statusCode,
      method: request.method,
      path: request.url,
      traceId: response.traceId,
      error: response.error,
      details: response.details,
    };

    if (logLevel === 'error') {
      this.logger.error(JSON.stringify(logMessage), exception instanceof Error ? exception.stack : undefined);
    } else if (logLevel === 'warn') {
      this.logger.warn(JSON.stringify(logMessage));
    } else {
      this.logger.log(JSON.stringify(logMessage));
    }
  }

  private generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}

// === ARCHIVO: src/infrastructure/repositories/order.repository.ts ===
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


// === ARCHIVO: src/domain/ports/inventory.service.port.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/order.controller.ts ===
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


// === ARCHIVO: test/order.service.spec.ts ===
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
```
