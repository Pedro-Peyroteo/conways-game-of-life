# Development Log

## Phase 1 — Core Simulation Engine

### Goals

- Deterministic Game of Life implementation
- Toroidal grid
- Rule parsing (B/S notation)
- Double buffering
- Strict encapsulation
- Infrastructure-grade boundaries

### Technical Decisions

- 1D Uint8Array for memory efficiency
- Explicit buffer swap by reference
- Precomputed boolean lookup maps for rule evaluation (O(1))
- Constructor invariant validation
- Encapsulation of internal grid buffers
- Native Node test runner for unit testing
- Strict TypeScript configuration enabled

### Improvements Added During Hardening

- Rule normalization and deduplication
- Boolean lookup tables replacing `includes()` checks
- Explicit unsafe raw buffer access methods
- Replacement of smoke test with real unit tests
- Blinker oscillation test for deterministic correctness

### Known Limitations

- Neighbor counting remains naive O(n \* 8)
- No bit-packing (1 byte per cell)
- No benchmarking suite yet
- No boundary mode abstraction (toroidal only)

### Adjustment: ESM Migration

During testing, Node threw `ERR_UNKNOWN_FILE_EXTENSION` for `.ts` files.

Resolution:

- Switched to NodeNext module system
- Marked packages as ESM (`"type": "module"`)
- Aligned TypeScript config with modern Node execution

This stabilized runtime behavior and removed loader ambiguity.

### Final Polish & Validation

**ESM Export Correction**

- Fixed `src/index.ts` to export `Simulation` class instead of test file
- Ensures module consumers receive the actual API

**Build Script Robustness**

- Updated `packages/core/package.json` build scripts with explicit relative paths
- Changed: `tsc -p tsconfig.json` → `tsc --project ./tsconfig.json --outDir ./dist`
- Prevents build inconsistencies across different working directories and machines

**Documentation Refactor**

- Condensed root README from detailed explanation to concise overview
- Added links to `/docs` for architecture, decisions, and development details
- Reduces duplication and improves navigation

**Verification**

- ✅ Tests compile and run correctly
- ✅ ESM exports resolve without errors
- ✅ Build is reproducible from any working directory
- ✅ All tests pass (Rule parsing, constructor invariants, blinker oscillation)
