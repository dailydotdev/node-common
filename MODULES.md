# Modules

All modules are importable via subpath exports from `@dailydotdev/node-common`.

## logger

**Import:** `@dailydotdev/node-common/logger`

Pino logger configuration that adapts to the current environment.

- **Development:** uses `pino-pretty` for human-readable output.
- **Production (GCP):** uses `@google-cloud/pino-logging-gcp-config` when `OTEL_LOGGER_FORMAT=gcp`.
- **Production (OTel):** uses OpenTelemetry-compatible format when `OTEL_LOGGER_FORMAT=otel`.

| Export             | Type            | Description                                              |
| ------------------ | --------------- | -------------------------------------------------------- |
| `pinoLoggerConfig` | `LoggerOptions` | Pre-built Pino configuration for the current environment |

## utils

**Import:** `@dailydotdev/node-common/utils`

General utility functions.

| Export  | Type                               | Description                               |
| ------- | ---------------------------------- | ----------------------------------------- |
| `sleep` | `(delay: number) => Promise<void>` | Pauses execution for a specified duration |

## utils/env

**Import:** `@dailydotdev/node-common/utils/env`

Environment detection helpers.

| Export          | Type      | Description                             |
| --------------- | --------- | --------------------------------------- |
| `isDevelopment` | `boolean` | `true` when `NODE_ENV` is `development` |
| `isProduction`  | `boolean` | `true` when `NODE_ENV` is `production`  |
| `isTest`        | `boolean` | `true` when `NODE_ENV` is `test`        |
