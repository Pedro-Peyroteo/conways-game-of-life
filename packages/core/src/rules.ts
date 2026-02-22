import { RuleConfig } from "./types.js";

export function parseRule(rule: string): RuleConfig {
    const [birthPart, survivalPart] = rule.split("/")

    const birth = birthPart
        .replace("B", "")
        .split("")
        .map(Number)

    const survival = survivalPart
        .replace("S", "")
        .split("")
        .map(Number)

    return { birth, survival }
}