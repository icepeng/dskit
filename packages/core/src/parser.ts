import { ScaleToken, SemanticToken, Token, TokenDefinition } from "./data";

/**
 * $prefix.target.name
 */
export function parseScaleToken(str: string): ScaleToken {
  const [prefix, target, name] = str.split(".");
  return { prefix, target, name } as ScaleToken;
}

/**
 * $prefix.group.name
 */
export function parseSemanticToken(str: string): SemanticToken {
  const [prefix, group, name] = str.split(".");
  return { prefix, group, name } as SemanticToken;
}

/**
 * token -> binding (condition)
 * token -[:property]> binding (condition)
 */
export function parseLine(str: string): TokenDefinition {
  const regex = /(?<token>.+?)\s*>\s*(?<binding>.+) \((?<condition>.+)\)/;
  const propertyRegex =
    /(?<token>.+?)\s*-\[:(?<property>.+?)\]>\s*(?<binding>.+) \((?<condition>.+)\)/;

  const match = str.match(regex);
  if (match) {
    const { token, binding, condition } = match.groups!;

    if (token.startsWith("$scale")) {
      return {
        token: parseScaleToken(token),
        binding,
        condition,
      };
    }

    if (token.startsWith("$semantic")) {
      return {
        token: parseSemanticToken(token),
        property: "None",
        binding,
        condition,
      };
    }
  }

  const propertyMatch = str.match(propertyRegex);
  if (propertyMatch) {
    const { token, property, binding, condition } = propertyMatch.groups!;
    return {
      token: parseSemanticToken(token),
      property,
      binding,
      condition,
    };
  }

  throw new Error(`Invalid line: ${str}`);
}
