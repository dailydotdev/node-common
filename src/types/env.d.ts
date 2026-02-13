namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'production' | 'development' | 'test';
    LOG_LEVEL?: string;
    OTEL_SERVICE_NAME: string;
    OTEL_SERVICE_VERSION: string;
    OTEL_LOGGER_FORMAT: 'otel' | 'gcp';
  }
}
