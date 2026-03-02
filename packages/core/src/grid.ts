import type { CellState } from './types.js';

export class Grid {
  readonly width: number;
  readonly height: number;
  private _data: Uint8Array;

  constructor(width: number, height: number) {
    if (width <= 0 || height <= 0) {
      throw new Error('Grid dimensions must be positive integers');
    }

    this.width = width;
    this.height = height;
    this._data = new Uint8Array(width * height);
  }

  private index(x: number, y: number): number {
    const wrappedX = (x + this.width) % this.width;
    const wrappedY = (y + this.height) % this.height;
    return wrappedY * this.width + wrappedX;
  }

  get(x: number, y: number): CellState {
    return this._data[this.index(x, y)] as CellState;
  }

  set(x: number, y: number, value: CellState): void {
    this._data[this.index(x, y)] = value;
  }

  clear(): void {
    this._data.fill(0);
  }

  /** Internal use only — performance critical */
  getRawBufferUnsafe(): Uint8Array {
    return this._data;
  }

  /** Internal use only — performance critical */
  setRawBufferUnsafe(buffer: Uint8Array): void {
    this._data = buffer;
  }
}
