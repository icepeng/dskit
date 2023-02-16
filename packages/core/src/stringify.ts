import {
  isColorHexLit,
  isColorRgbaLit,
  isColorRgbLit,
  isCubicBezierLit,
  isFontWeightLit,
  isMacro,
  isMillisecondLit,
  isPercentLit,
  isPointLit,
  isScaleToken,
  isScaleTokenDefinition,
  isSemanticToken,
  isSemanticTokenDefinition,
} from "./guard";
import {
  AST,
  ColorHexLit,
  ColorRgbaLit,
  ColorRgbLit,
  Command,
  CubicBezierLit,
  FontWeightLit,
  Macro,
  MillisecondLit,
  PercentLit,
  PointLit,
  ScaleToken,
  ScaleTokenDefinition,
  SemanticToken,
  SemanticTokenDefinition,
  Token,
} from "./interface";
import { tokenNameRegex } from "./regex";

export function stringifyRgbLit(rgb: ColorRgbLit) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function stringifyRgbaLit(rgba: ColorRgbaLit) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export function stringifyHexLit(hex: ColorHexLit) {
  return hex.value;
}

export function stringifyPercentLit(percent: PercentLit) {
  return `${percent.value}%`;
}

export function stringifyFontWeightLit(fontWeight: FontWeightLit) {
  return `${fontWeight.value}`;
}

export function stringifyPointLit(point: PointLit) {
  return `${point.value}pt`;
}

export function stringifyMillisecondLit(ms: MillisecondLit) {
  return `${ms.value}ms`;
}

export function stringifyCubicBezierLit(cubicBezier: CubicBezierLit) {
  return `cubic-bezier(${cubicBezier.p0}, ${cubicBezier.p1}, ${cubicBezier.p2}, ${cubicBezier.p3})`;
}

export function stringifyScaleTokenBinding(
  binding: ScaleTokenDefinition["binding"],
) {
  if (isColorHexLit(binding)) {
    return stringifyHexLit(binding);
  }
  if (isColorRgbLit(binding)) {
    return stringifyRgbLit(binding);
  }
  if (isColorRgbaLit(binding)) {
    return stringifyRgbaLit(binding);
  }
  if (isPercentLit(binding)) {
    return stringifyPercentLit(binding);
  }
  if (isFontWeightLit(binding)) {
    return stringifyFontWeightLit(binding);
  }
  if (isPointLit(binding)) {
    return stringifyPointLit(binding);
  }
  if (isMillisecondLit(binding)) {
    return stringifyMillisecondLit(binding);
  }
  if (isCubicBezierLit(binding)) {
    return stringifyCubicBezierLit(binding);
  }
  throw new Error(`Unknown binding: ${JSON.stringify(binding)}`);
}

export function stringifyMacro(macro: Macro) {
  const stringifyParam = (param: Macro["params"][0]): string => {
    if (typeof param === "string") {
      if (tokenNameRegex.test(param)) {
        return param;
      }
      return `"${param}"`;
    }
    if (isSemanticToken(param)) {
      return stringifySemanticToken(param);
    }
    if (isScaleToken(param)) {
      return stringifyScaleToken(param);
    }
    throw new Error(`Unknown macro param type: ${typeof param}`);
  };
  return `%${macro.extension}:${macro.name}(${macro.params
    .map(stringifyParam)
    .join(", ")})`;
}

export function stringifyScaleToken(scale: ScaleToken) {
  return `${scale.prefix}.${scale.target}.${scale.name}`;
}

export function stringifySemanticToken(token: SemanticToken) {
  return `${token.prefix}.${token.group}.${token.name}`;
}

export function stringifyToken(token: Token) {
  if (isScaleToken(token)) {
    return stringifyScaleToken(token);
  }
  if (isSemanticToken(token)) {
    return stringifySemanticToken(token);
  }
  throw new Error(`Unknown token type: ${typeof token}`);
}

function stringifyCondition(condition?: string) {
  if (condition == null) {
    return "";
  }
  return ` (${condition})`;
}

export function stringifyScaleTokenDefinition(
  definition: ScaleTokenDefinition,
) {
  return `${stringifyScaleToken(
    definition.token,
  )} -> ${stringifyScaleTokenBinding(definition.binding)}${stringifyCondition(
    definition.condition,
  )}`;
}

export function stringifySemanticTokenDefinition(
  definition: SemanticTokenDefinition,
) {
  if (definition.property != null) {
    return `${stringifySemanticToken(definition.token)} -[:${
      definition.property
    }]> ${stringifyScaleToken(definition.binding)}${stringifyCondition(
      definition.condition,
    )}`;
  }
  return `${stringifySemanticToken(definition.token)} -> ${stringifyScaleToken(
    definition.binding,
  )}${stringifyCondition(definition.condition)}`;
}

export function stringifyCommand(command: Command) {
  if (isMacro(command)) {
    return stringifyMacro(command);
  }
  if (isSemanticTokenDefinition(command)) {
    return stringifySemanticTokenDefinition(command);
  }
  if (isScaleTokenDefinition(command)) {
    return stringifyScaleTokenDefinition(command);
  }
  throw new Error(`Unknown command: ${command.kind}`);
}

export function stringify(ast: AST): string {
  return ast.map(stringifyCommand).join("\n");
}
