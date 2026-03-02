import { Grid } from './grid.js';
import type { CellState, NormalizedRule } from './types.js';
import { parseRule, normalizeRule } from './rules.js';

export class Simulation {
  readonly width: number;
  readonly height: number;

  private current: Grid;
  private next: Grid;
  private rule: NormalizedRule;

  private _tick = 0;

  constructor(width: number, height: number, rule = 'B3/S23') {
    if (width <= 0 || height <= 0) {
      throw new Error('Simulation dimensions must be positive integers');
    }

    this.width = width;
    this.height = height;

    this.current = new Grid(width, height);
    this.next = new Grid(width, height);

    this.rule = normalizeRule(parseRule(rule));
  }

  get tick(): number {
    return this._tick;
  }

  getCell(x: number, y: number): CellState {
    return this.current.get(x, y);
  }

  setCell(x: number, y: number, state: CellState): void {
    this.current.set(x, y, state);
  }

  /**
   * Returns internal state buffer reference.
   * DO NOT mutate externally.
   * Intended for serialization only.
   */
  getState(): Uint8Array {
    return this.current.getRawBufferUnsafe();
  }

  setRule(rule: string): void {
    this.rule = normalizeRule(parseRule(rule));
  }

  step(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const alive = this.current.get(x, y);
        const neighbors = this.countNeighbors(x, y);

        let nextState: CellState = 0;

        if (alive) {
          nextState = this.rule.survivalMap[neighbors] ? 1 : 0;
        } else {
          nextState = this.rule.birthMap[neighbors] ? 1 : 0;
        }

        this.next.set(x, y, nextState);
      }
    }

    this.swapBuffers();
    this._tick++;
  }

  randomize(density = 0.5): void {
    const buffer = this.current.getRawBufferUnsafe();

    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.random() < density ? 1 : 0;
    }
  }

  clear(): void {
    this.current.clear();
    this.next.clear();
    this._tick = 0;
  }

  private swapBuffers(): void {
    const currentBuffer = this.current.getRawBufferUnsafe();
    const nextBuffer = this.next.getRawBufferUnsafe();

    this.current.setRawBufferUnsafe(nextBuffer);
    this.next.setRawBufferUnsafe(currentBuffer);
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        count += this.current.get(x + dx, y + dy);
      }
    }

    return count;
  }
}
