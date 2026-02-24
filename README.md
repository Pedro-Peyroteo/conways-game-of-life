# Conway's Game of Life

A deterministic, infrastructure-grade simulation engine for Conway's Game of Life.

## Overview

A TypeScript monorepo containing a pure logic simulation core (`@life-sim/core`) with zero runtime coupling or external dependencies.

**Key Features:**

- Toroidal grid with O(1) rule evaluation
- Double-buffer swap for deterministic stepping
- B/S rule notation parsing and normalization
- Type-safe, fully tested implementation
- ESM-native with TypeScript

## Documentation

- **[Architecture](docs/architecture.md)** — Design overview, module strategy, internal model
- **[Decisions](docs/decisions.md)** — Architectural Decision Records (ADRs)
- **[Development Log](docs/development-log.md)** — Implementation phases and improvements

## Quick Start

```bash
cd packages/core
pnpm install
pnpm build
pnpm test:core
```

## Packages

### `@life-sim/core`

Pure simulation engine with no rendering or IO.

```typescript
import { Simulation } from '@life-sim/core';

const sim = new Simulation(100, 100, 'B3/S23');
sim.setCell(50, 50, 1);
sim.step();
```

See [architecture.md](docs/architecture.md) for design details.
