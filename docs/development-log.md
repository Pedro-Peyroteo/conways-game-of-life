# Development Log

## Phase 1 — Core Simulation Engine

### Goals

- Deterministic Game of Life implementation
- Toroidal grid
- Rule parsing (B/S notation)
- Double buffering

### Technical Decisions

- 1D Uint8Array for memory efficiency
- Explicit buffer swap instead of reallocating arrays
- Pure engine with zero IO coupling
- Strict TypeScript mode enabled

### Known Limitations

- Uses naive neighbor counting (O(n \* 8))
- No bit-packing yet
- No performance benchmarking

### Adjustment: ESM Migration

During testing, Node threw `ERR_UNKNOWN_FILE_EXTENSION` for `.ts` files.

Resolution:

- Switched to NodeNext module system
- Marked packages as ESM (`"type": "module"`)
- Aligned TypeScript config with modern Node execution

This stabilizes runtime behavior and avoids loader ambiguity.
