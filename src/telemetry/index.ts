import {
  type Span,
  type SpanOptions,
  SpanStatusCode,
  trace,
} from '@opentelemetry/api';

export const runInSpan = async <T>(
  name: string,
  func: (span: Span) => Promise<T>,
  options?: SpanOptions,
): Promise<T> =>
  trace
    .getTracer('runInSpan')
    .startActiveSpan(name, options ?? {}, async (span) => {
      try {
        return await func(span);
      } catch (originalError) {
        const err = originalError as Error;

        span.recordException(err);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err?.message,
        });
        throw err;
      } finally {
        span.end();
      }
    }) as T;

export const runInSpanSync = <T>(
  name: string,
  func: (span: Span) => T,
  options?: SpanOptions,
): T =>
  trace.getTracer('runInSpan').startActiveSpan(name, options ?? {}, (span) => {
    try {
      return func(span);
    } catch (originalError) {
      const err = originalError as Error;

      span.recordException(err);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err?.message,
      });
      throw err;
    } finally {
      span.end();
    }
  }) as T;

export const runInRootSpan = async <T>(
  name: string,
  func: (span: Span) => Promise<T>,
  options?: SpanOptions,
): Promise<T> => runInSpan(name, func, { ...options, root: true });

export const runInRootSpanSync = <T>(
  name: string,
  func: (span: Span) => T,
  options?: SpanOptions,
): T => runInSpanSync(name, func, { ...options, root: true });
