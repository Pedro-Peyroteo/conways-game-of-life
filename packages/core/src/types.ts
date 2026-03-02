export interface GridSize {
  width: number;
  height: number;
}

export interface RuleConfig {
  birth: number[];
  survival: number[];
}

export interface NormalizedRule {
  birthMap: boolean[];
  survivalMap: boolean[];
}

export type CellState = 0 | 1;
