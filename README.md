# @dailydotdev/node-common

Shared packages for daily.dev Node.js projects.

## Installation

```sh
pnpm add @dailydotdev/node-common
```

## Usage

Each module is importable via subpath exports:

```ts
import { sleep } from "@dailydotdev/node-common/utils";

await sleep(1000); // pause for 1 second
```

## Modules

| Module | Import Path                       | Description           |
| ------ | --------------------------------- | --------------------- |
| utils  | `@dailydotdev/node-common/utils`  | General utilities     |
| logger | `@dailydotdev/node-common/logger` | Logging (coming soon) |

## Development

**Prerequisites:** Node.js 22+, pnpm

| Script      | Command          | Description                      |
| ----------- | ---------------- | -------------------------------- |
| `build`     | `pnpm build`     | Build all modules to `dist/`     |
| `dev`       | `pnpm dev`       | Watch mode with automatic rebuilds |
| `typecheck` | `pnpm typecheck` | Run TypeScript type checking     |
| `lint`      | `pnpm lint`      | Lint the codebase                |
| `lint:fix`  | `pnpm lint:fix`  | Lint and auto-fix issues         |
| `format`    | `pnpm format`    | Format all files with Prettier   |

## License

BSD-3-Clause
