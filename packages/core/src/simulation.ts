import { Grid } from "./grid.js";
import { RuleConfig } from "./types.js";
import { parseRule } from "./rules.js";

export class Simulation {
  readonly width: number;
  readonly height: number;
  readonly current: Grid;
  readonly next: Grid;
  rules: RuleConfig;
  tick: number = 0;

  constructor(width: number, height: number, rule = "B3/S23") {
    if (width <= 0 || height <= 0) {
      throw new Error("Simulation dimensions must be positive integers");
    }

    this.width = width;
    this.height = height;
    this.current = new Grid(width, height);
    this.next = new Grid(width, height);
    this.rules = parseRule(rule);
  }

  step(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const alive = this.current.get(x, y);
        const neighbors = this.countNeighbors(x, y);

        if (alive) {
          this.next.set(x, y, this.rules.survival.includes(neighbors) ? 1 : 0);
        } else {
          this.next.set(x, y, this.rules.birth.includes(neighbors) ? 1 : 0);
        }
      }
    }

    this.swapBuffers();
    this.tick++;
  }

  randomize(density = 0.5): void {
    for (let i = 0; i < this.current.data.length; i++) {
      this.current.data[i] = Math.random() < density ? 1 : 0;
    }
  }

  clear(): void {
    this.current.clear();
    this.next.clear();
    this.tick = 0;
  }

  setRule(rule: string): void {
    this.rules = parseRule(rule);
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

  private swapBuffers(): void {
    const temp = this.current.data;
    this.current.data = this.next.data;
    this.next.data = temp;
  }
}
