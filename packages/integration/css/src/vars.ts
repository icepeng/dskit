import { Store } from "@dskit/core";
import dedent from "ts-dedent";

export function render(store: Store) {
  const conditions = store.getConditions();

  const scaleVars = conditions
    .map((condition) => {
      const definitions = store.getScaleDefinitions(condition);
      if (definitions.length === 0) return "";

      return dedent`:root[data-theme=${condition}] {
          ${definitions
            .map((definition) => {
              const { token, binding } = definition;
              return `--seed-scale-${token.target}-${token.name}: ${binding};`;
            })
            .join("\n")}
        }`;
    })
    .filter(Boolean)
    .join("\n");

  const semanticVars = conditions
    .map((condition) => {
      const definitions = store
        .getSemanticDefinitions(condition)
        .filter((def) => def.property === "None");
      if (definitions.length === 0) return "";

      return dedent`:root[data-theme=${condition}] {
          ${definitions
            .map((definition) => {
              const { token, binding } = definition;
              return `--seed-semantic-${token.group}-${token.name}: ${binding};`;
            })
            .join("\n")}
        }`;
    })
    .filter(Boolean)
    .join("\n");

  const semanticClasses = conditions
    .map((condition) => {
      const definitions = store
        .getSemanticDefinitions(condition)
        .filter((def) => def.property !== "None");
      if (definitions.length === 0) return "";

      return definitions.map((def) => {
        const { token, binding, property } = def;
        return dedent`.${token.group}-${token.name}[data-theme=${condition}] {
            ${property}: ${binding};
        }`;
      });
    })
    .filter(Boolean)
    .join("\n");

  return [scaleVars, semanticVars, semanticClasses].join("\n");
}
