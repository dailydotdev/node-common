import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts', 'src/*/*.ts', 'src/*/*/*.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'node22',
  sourcemap: false,
  splitting: true,
});
