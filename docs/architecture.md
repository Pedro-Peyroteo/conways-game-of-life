# Architecture Overview

## Packages

### @life-sim/core

Pure deterministic simulation engine.
No networking, no rendering, no IO.

Responsibilities:

- Grid state management
- Rule parsing
- Deterministic stepping
- State mutation

Design Principles:

- Pure logic
- No side effects
- Testable in isolation
- No environment assumptions

## Module System Strategy

The project uses native ESM with NodeNext module resolution.

### Rationale

- Aligns with modern Node (v18+)
- Avoids legacy CommonJS patterns
- Enables future ESM-only ecosystem compatibility
- Matches Vite (ESM-first) on the web side

### Configuration

- `"module": "NodeNext"` in tsconfig
- `"moduleResolution": "NodeNext"`
- `"type": "module"` in package.json

This ensures consistent ESM behavior across packages.
