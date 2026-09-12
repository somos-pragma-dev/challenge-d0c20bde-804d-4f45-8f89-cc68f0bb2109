# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de API de Pedidos con Manejo de Errores**.

| | |
|---|---|
| Tema | api-de-pedidos-con-manejo-de-errores |
| Nivel | senior-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript 5.7 / NestJS 11 |
| Patron arquitectonico | hexagonal/clean con capas estándar |
| Tiempo estimado | 4 semanas |

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Diseño del Modelo de Pedidos**: Modelo de datos para pedidos con atributos y relaciones definidas.
- **Fase 2 — Implementación de la Lógica de Negocio**: Endpoint funcional para crear y actualizar pedidos con manejo de errores.
- **Fase 3 — Integración con Sistemas Externos**: API integrada con sistemas de inventario y pagos, capaz de manejar respuestas asíncronas y errores.
- **Fase 4 — Optimización y Escalabilidad**: API optimizada y escalable para manejar un alto volumen de pedidos.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (9)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/infrastructure/repositories/order.repository.ts` — `OrderItem.map`
      Se invoca `map` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/order.controller.ts` — `OrderService.findById`
      Se invoca `findById` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/order.controller.ts` — `OrderService.findByNumber`
      Se invoca `findByNumber` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/order.controller.ts` — `OrderService.findAll`
      Se invoca `findAll` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/order.controller.ts` — `OrderService.findByCustomerId`
      Se invoca `findByCustomerId` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/order.controller.ts` — `OrderService.delete`
      Se invoca `delete` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/middlewares/global-exception.filter.ts` — `ErrorResponse.status`
      Se invoca `status` sobre `ErrorResponse`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/usecases/create-order.usecase.ts` — `CreateOrderInput.map`
      Se invoca `map` sobre `CreateOrderInput`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/usecases/create-order.usecase.ts` — `CreateOrderInput.reduce`
      Se invoca `reduce` sobre `CreateOrderInput`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (28)

- `package.json`
- `tsconfig.json`
- `src/main.ts`
- `src/domain/entities/order.entity.ts`
- `src/domain/entities/product.entity.ts`
- `src/domain/ports/order.repository.port.ts`
- `src/domain/ports/inventory.service.port.ts`
- `src/domain/ports/payment.service.port.ts`
- `src/domain/exceptions/insufficient-inventory.exception.ts`
- `src/domain/exceptions/payment-failed.exception.ts`
- `src/domain/exceptions/order-not-found.exception.ts`
- `src/infrastructure/repositories/order.repository.ts`
- `src/infrastructure/controllers/order.controller.ts`
- `src/infrastructure/external-services/inventory.service.ts`
- `src/infrastructure/external-services/payment.service.ts`
- `src/infrastructure/config/app.config.ts`
- `src/infrastructure/middlewares/global-exception.filter.ts`
- `src/infrastructure/middlewares/circuit-breaker.middleware.ts`
- `src/app.module.ts`
- `src/application/usecases/create-order.usecase.ts`
- `src/application/usecases/update-order.usecase.ts`
- `src/application/services/order.service.ts`
- `test/order.controller.spec.ts`
- `test/order.usecase.spec.ts`
- `test/order.service.spec.ts`
- `Dockerfile`
- `docker-compose.yml`
- `.env`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/domain/entities`
- `src/domain/ports`
- `src/domain/exceptions`
- `src/application/usecases`
- `src/application/services`
- `src/infrastructure/controllers`
- `src/infrastructure/repositories`
- `src/infrastructure/external-services`
- `src/infrastructure/config`
- `src/infrastructure/middlewares`
- `test`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **hexagonal/clean con capas estándar**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Node, Tecnología Node, Senior
- Brecha que el reto ataca: Necesita fortalecer la practica de Node
- Mision: Liderar la iniciativa de api de pedidos con manejo de errores

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
