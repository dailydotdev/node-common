import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts', 'src/**/*.ts', '!src/types'],
  format: ['esm', 'cjs'],
  treeshake: true,
  dts: true,
  clean: true,
  target: 'node22',
  sourcemap: false,
  splitting: true,
});
