# Architectural Decisions

## ADR-0001: Use TypeScript Monorepo with pnpm

Rationale:

- Clear separation of concerns
- Reusable simulation engine
- Infrastructure-grade structure

## ADR-0002: Use Uint8Array for Grid Storage

Rationale:

- Memory-efficient
- Fast contiguous memory layout
- Easy future upgrade to bit-packing

## ADR-0003: Adopt Native ESM with NodeNext

Status: Accepted

Context:
Running TypeScript directly with modern Node requires alignment with ESM loader behavior.

Decision:
Use:

- "module": "NodeNext"
- "moduleResolution": "NodeNext"
- "type": "module"

Consequences:

- Explicit file extensions required in imports
- Compatible with Vite and modern tooling
- Avoids hybrid CJS/ESM inconsistencies
