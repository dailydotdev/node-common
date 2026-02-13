import { env } from 'node:process';

import { createGcpLoggingPinoConfig } from '@google-cloud/pino-logging-gcp-config';
import { type LoggerOptions } from 'pino';

import { isProduction } from '../utils/env';

const OTEL_SEV_MAPPING = {
  10: 1, // TRACE
  20: 5, // DEBUG
  30: 9, // INFO
  40: 13, // WARN
  50: 17, // ERROR
  60: 21, // FATAL
};

const devTransport: LoggerOptions['transport'] = {
  target: 'pino-pretty',
};

/**
 * Builds a Pino logger configuration based on the current environment.
 *
 * - In development: uses pino-pretty for human-readable output.
 * - In production with `OTEL_LOGGER_FORMAT=gcp`: uses GCP-compatible logging.
 * - In production with `OTEL_LOGGER_FORMAT=otel`: uses OpenTelemetry-compatible format.
 * - Otherwise: returns base options with the configured log level.
 */
const buildLoggerConfig = (): LoggerOptions => {
  const baseOptions: LoggerOptions = {
    level: env.LOG_LEVEL || 'info',
  };

  if (!isProduction) {
    return { ...baseOptions, transport: devTransport };
  }

  if (env.OTEL_LOGGER_FORMAT === 'gcp') {
    return createGcpLoggingPinoConfig(
      {
        serviceContext: {
          service: env.OTEL_SERVICE_NAME,
          version: env.OTEL_SERVICE_VERSION,
        },
      },
      baseOptions,
    );
  }

  if (env.OTEL_LOGGER_FORMAT === 'otel') {
    return {
      ...baseOptions,
      timestamp: () => `,"timestamp":"${Date.now()}000000"`,
      messageKey: 'body',
      formatters: {
        level: (severity, level) => ({
          severityText: severity.toUpperCase(),
          severityNumber:
            OTEL_SEV_MAPPING[level as keyof typeof OTEL_SEV_MAPPING] ||
            OTEL_SEV_MAPPING[30], // default to INFO
        }),
      },
    };
  }

  return baseOptions;
};

/** Pino logger configuration for the current environment. */
export const pinoLoggerConfig: LoggerOptions = buildLoggerConfig();
