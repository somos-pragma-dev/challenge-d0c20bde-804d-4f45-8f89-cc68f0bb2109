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