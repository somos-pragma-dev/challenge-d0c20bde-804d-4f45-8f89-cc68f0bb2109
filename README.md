# Implementación de API de Pedidos con Manejo de Errores

La empresa necesita una API robusta para gestionar pedidos en su plataforma de e-commerce. La API debe manejar diferentes tipos de errores y asegurar la consistencia de los datos. Los actores involucrados son el cliente, el sistema de inventario y el motor de pagos. La API debe procesar un mínimo de 10 000 pedidos por hora con una latencia máxima de 200ms. Los errores comunes incluyen inventario insuficiente y fallos en la transacción de pago.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | api-de-pedidos-con-manejo-de-errores |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 semanas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Diseño del Modelo de Pedidos

**Objetivo:** Definir el modelo de datos para los pedidos, incluyendo atributos y relaciones.

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Identificar los atributos necesarios para un pedido (ID, cliente, productos, estado, fecha).
- Establecer las relaciones entre pedidos y productos.
- Definir los estados posibles de un pedido (pendiente, procesado, enviado, cancelado).

**Entregable:** Modelo de datos para pedidos con atributos y relaciones definidas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la normalización de datos para evitar redundancias.
- Piensa en cómo manejarías la consistencia entre pedidos y productos.

</details>

### Fase 2: Implementación de la Lógica de Negocio

**Objetivo:** Implementar la lógica de negocio para crear y actualizar pedidos.

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Crear un endpoint para recibir y validar la creación de nuevos pedidos.
- Implementar la lógica para actualizar el estado de los pedidos.
- Manejar errores comunes como inventario insuficiente y fallos en la transacción de pago.

**Entregable:** Endpoint funcional para crear y actualizar pedidos con manejo de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza código de estado HTTP apropiado para cada tipo de error.
- Considera el uso de transacciones para garantizar la consistencia de los datos.

</details>

### Fase 3: Integración con Sistemas Externos

**Objetivo:** Integrar la API de pedidos con el sistema de inventario y el motor de pagos.

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Conectar la API con el sistema de inventario para verificar la disponibilidad de productos.
- Integrar con el motor de pagos para procesar transacciones.
- Manejar respuestas asíncronas y errores de los sistemas externos.

**Entregable:** API integrada con sistemas de inventario y pagos, capaz de manejar respuestas asíncronas y errores.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza patrones de diseño como Circuit Breaker para manejar fallos de sistemas externos.
- Considera el uso de colas de mensajes para manejar respuestas asíncronas.

</details>

### Fase 4: Optimización y Escalabilidad

**Objetivo:** Optimizar la API para manejar un alto volumen de pedidos y garantizar la escalabilidad.

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Implementar caché para reducir la carga en el sistema de inventario.
- Utilizar técnicas de paralelismo para procesar múltiples pedidos simultáneamente.
- Realizar pruebas de carga para identificar y solucionar cuellos de botella.

**Entregable:** API optimizada y escalable para manejar un alto volumen de pedidos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de Redis para implementar caché.
- Utiliza librerías de paralelismo como async/await en Node.js.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un endpoint en el contexto de esta API de pedidos?
- **paraQueSirve**: ¿Para qué sirve manejar errores en la API de pedidos?
- **comoSeUsa**: ¿Cómo se usa un patrón de diseño como Circuit Breaker en la integración con sistemas externos?
- **erroresComunes**: ¿Cuáles son los errores comunes que debe manejar la API de pedidos y cómo se pueden mitigar?
- **queDecisionesImplica**: ¿Qué decisiones implica la integración con sistemas externos y cómo afectan la consistencia de los datos?

## Criterios de Evaluacion

- Diseñar un modelo de datos para pedidos con atributos y relaciones definidas.
- Implementar la lógica de negocio para crear y actualizar pedidos con manejo de errores.
- Integrar la API con sistemas de inventario y pagos, manejando respuestas asíncronas y errores.
- Optimizar la API para manejar un alto volumen de pedidos y garantizar la escalabilidad.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
