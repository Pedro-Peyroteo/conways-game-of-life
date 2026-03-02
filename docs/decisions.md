# Architectural Decisions

## ADR-0001: Use TypeScript Monorepo with pnpm

Rationale:

- Clear separation of concerns
- Reusable simulation engine
- Infrastructure-grade structure
- Clean dependency boundaries

---

## ADR-0002: Use Uint8Array for Grid Storage

Rationale:

- Memory-efficient contiguous storage
- Predictable layout
- Fast iteration
- Future-compatible with bit-packing optimization

---

## ADR-0003: Adopt Native ESM with NodeNext

Status: Accepted

Context:
Modern Node environments require alignment with ESM loader behavior.

Decision:
Use:

- "module": "NodeNext"
- "moduleResolution": "NodeNext"
- "type": "module"

Consequences:

- Explicit file extensions required in imports
- Compatible with Vite and modern tooling
- Avoids hybrid CJS/ESM inconsistencies

---

## ADR-0004: Normalize Rules to Lookup Tables

Status: Accepted

Context:
Per-cell rule evaluation previously used `Array.includes()`, introducing repeated O(n) checks.

Decision:
Normalize rules into boolean lookup tables (`boolean[9]`) during initialization.

Consequences:

- O(1) rule evaluation per cell
- Slightly higher upfront rule normalization cost
- Cleaner separation between parsing and execution
