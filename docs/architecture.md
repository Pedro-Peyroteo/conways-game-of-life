# Architecture Overview

## Packages

### @life-sim/core

Pure deterministic simulation engine.
No networking, no rendering, no IO.

Responsibilities:

- Grid state management (toroidal wrapping)
- Rule parsing and normalization (B/S notation)
- Deterministic stepping via double buffering
- State mutation (setCell, randomize, clear)
- O(1) rule evaluation via precomputed lookup maps

Design Principles:

- Pure logic
- No transport or runtime coupling
- Encapsulated internal buffers
- Explicit unsafe boundaries (raw buffer access)
- Testable in isolation
- No environment assumptions

Internal Model:

- 1D `Uint8Array` backing storage
- Double-buffer swap by reference (no per-tick copying)
- Rule normalization to boolean lookup tables
- Strict constructor invariants

## Module System Strategy

The project uses native ESM with NodeNext module resolution.

### Rationale

- Aligns with modern Node (v18+)
- Avoids legacy CommonJS patterns
- Enables future ESM-only ecosystem compatibility
- Matches Vite (ESM-first) on the web side
- Prevents hybrid CJS/ESM boundary inconsistencies

### Configuration

- `"module": "NodeNext"` in tsconfig
- `"moduleResolution": "NodeNext"`
- `"type": "module"` in package.json
- Explicit `.js` file extensions in imports

This ensures consistent ESM behavior across packages and environments.
