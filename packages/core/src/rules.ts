import type { RuleConfig, NormalizedRule } from './types.js';

const ruleRegex = /^B[0-8]+\/S[0-8]+$/;

export function parseRule(rule: string): RuleConfig {
  if (!ruleRegex.test(rule)) {
    throw new Error(`Invalid rule format: ${rule}`);
  }

  const slashIndex = rule.indexOf('/');

  // Because regex validated format, slash must exist.
  const birthPart = rule.slice(0, slashIndex);
  const survivalPart = rule.slice(slashIndex + 1);

  const birth = Array.from(
    new Set(birthPart.slice(1).split('').map(Number)),
  ).sort();

  const survival = Array.from(
    new Set(survivalPart.slice(1).split('').map(Number)),
  ).sort();

  return { birth, survival };
}

export function normalizeRule(rule: RuleConfig): NormalizedRule {
  const birthMap = Array(9).fill(false);
  const survivalMap = Array(9).fill(false);

  for (const n of rule.birth) {
    birthMap[n] = true;
  }

  for (const n of rule.survival) {
    survivalMap[n] = true;
  }

  return { birthMap, survivalMap };
}
