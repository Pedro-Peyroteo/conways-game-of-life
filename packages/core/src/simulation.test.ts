import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Simulation } from './simulation.js';
import { parseRule } from './rules.js';

describe('Rule parsing', () => {
  it('parses valid rule', () => {
    const rule = parseRule('B3/S23');
    assert.deepStrictEqual(rule.birth, [3]);
    assert.deepStrictEqual(rule.survival, [2, 3]);
  });

  it('throws on invalid rule', () => {
    assert.throws(() => parseRule('invalid'));
  });
});

describe('Simulation invariants', () => {
  it('throws on invalid dimensions', () => {
    assert.throws(() => new Simulation(0, 10));
  });
});

describe('Blinker oscillation', () => {
  it('oscillates correctly', () => {
    const sim = new Simulation(5, 5);

    // vertical blinker
    sim.setCell(2, 1, 1);
    sim.setCell(2, 2, 1);
    sim.setCell(2, 3, 1);

    sim.step();

    // should now be horizontal
    assert.strictEqual(sim.getCell(1, 2), 1);
    assert.strictEqual(sim.getCell(2, 2), 1);
    assert.strictEqual(sim.getCell(3, 2), 1);
  });
});
