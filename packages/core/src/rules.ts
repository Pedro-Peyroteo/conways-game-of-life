import { RuleConfig } from "./types.js";

export function parseRule(rule: string): RuleConfig {
  const ruleRegex = /^B[0-8]+\/S[0-8]+$/;

  if (!ruleRegex.test(rule)) {
    throw new Error(`Invalid rule format: ${rule}`);
  }

  const parts = rule.split("/");

  if (parts.length != 2) {
    throw new Error(`Malformed rule: ${rule}`);
  }

  const birthPart = parts[0];
  const survivalPart = parts[1];

  if (!birthPart || !survivalPart) {
    throw new Error(`Malformed rule: ${rule}`);
  }

  const birth = birthPart.replace("B", "").split("").map(Number);
  const survival = survivalPart.replace("S", "").split("").map(Number);

  return { birth, survival };
}
