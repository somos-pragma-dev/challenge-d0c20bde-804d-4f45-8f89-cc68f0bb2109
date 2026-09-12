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