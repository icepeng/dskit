import {
  ColorHexLit,
  ColorRgbLit,
  ColorRgbaLit,
  ColorScaleToken,
  ColorScaleTokenDefinition,
  Command,
  CubicBezierLit,
  Definition,
  DurationScaleToken,
  DurationScaleTokenDefinition,
  FontSizeScaleToken,
  FontSizeScaleTokenDefinition,
  FontWeightLit,
  FontWeightScaleToken,
  FontWeightScaleTokenDefinition,
  LetterSpacingScaleToken,
  LetterSpacingScaleTokenDefinition,
  LineHeightScaleToken,
  LineHeightScaleTokenDefinition,
  Macro,
  MillisecondLit,
  Node,
  PercentLit,
  PointLit,
  ScaleToken,
  ScaleTokenDefinition,
  SemanticToken,
  SemanticTokenDefinition,
  TimingFunctionScaleToken,
  TimingFunctionScaleTokenDefinition,
  Token,
} from "./interface";

export function isColorScaleTokenDefinition(
  node: Node,
): node is ColorScaleTokenDefinition {
  return node.kind === "ColorScaleTokenDefinition";
}

export function isFontSizeScaleTokenDefinition(
  node: Node,
): node is FontSizeScaleTokenDefinition {
  return node.kind === "FontSizeScaleTokenDefinition";
}

export function isLineHeightScaleTokenDefinition(
  node: Node,
): node is LineHeightScaleTokenDefinition {
  return node.kind === "LineHeightScaleTokenDefinition";
}

export function isFontWeightScaleTokenDefinition(
  node: Node,
): node is FontWeightScaleTokenDefinition {
  return node.kind === "FontWeightScaleTokenDefinition";
}

export function isLetterSpacingScaleTokenDefinition(
  node: Node,
): node is LetterSpacingScaleTokenDefinition {
  return node.kind === "LetterSpacingScaleTokenDefinition";
}

export function isDurationScaleTokenDefinition(
  node: Node,
): node is DurationScaleTokenDefinition {
  return node.kind === "DurationScaleTokenDefinition";
}

export function isTimingFunctionScaleTokenDefinition(
  node: Node,
): node is TimingFunctionScaleTokenDefinition {
  return node.kind === "TimingFunctionScaleTokenDefinition";
}

export function isScaleTokenDefinition(
  node: Node,
): node is ScaleTokenDefinition {
  return (
    isColorScaleTokenDefinition(node) ||
    isFontSizeScaleTokenDefinition(node) ||
    isLineHeightScaleTokenDefinition(node) ||
    isFontWeightScaleTokenDefinition(node) ||
    isLetterSpacingScaleTokenDefinition(node) ||
    isDurationScaleTokenDefinition(node) ||
    isTimingFunctionScaleTokenDefinition(node)
  );
}

export function isSemanticTokenDefinition(
  node: Node,
): node is SemanticTokenDefinition {
  return node.kind === "SemanticTokenDefinition";
}

export function isDefinition(node: Command): node is Definition {
  return isScaleTokenDefinition(node) || isSemanticTokenDefinition(node);
}

export function isColorScaleToken(node: Node): node is ColorScaleToken {
  return node.kind === "ColorScaleToken";
}

export function isFontSizeScaleToken(node: Node): node is FontSizeScaleToken {
  return node.kind === "FontSizeScaleToken";
}

export function isLineHeightScaleToken(
  node: Node,
): node is LineHeightScaleToken {
  return node.kind === "LineHeightScaleToken";
}

export function isFontWeightScaleToken(
  node: Node,
): node is FontWeightScaleToken {
  return node.kind === "FontWeightScaleToken";
}

export function isLetterSpacingScaleToken(
  node: Node,
): node is LetterSpacingScaleToken {
  return node.kind === "LetterSpacingScaleToken";
}

export function isDurationScaleToken(node: Node): node is DurationScaleToken {
  return node.kind === "DurationScaleToken";
}

export function isTimingFunctionScaleToken(
  node: Node,
): node is TimingFunctionScaleToken {
  return node.kind === "TimingFunctionScaleToken";
}

export function isScaleToken(node: Node): node is ScaleToken {
  return (
    isColorScaleToken(node) ||
    isFontSizeScaleToken(node) ||
    isLineHeightScaleToken(node) ||
    isFontWeightScaleToken(node) ||
    isLetterSpacingScaleToken(node) ||
    isDurationScaleToken(node) ||
    isTimingFunctionScaleToken(node)
  );
}

export function isSemanticToken(node: Node): node is SemanticToken {
  return node.kind === "SemanticToken";
}

export function isToken(node: Node): node is Token {
  return isScaleToken(node) || isSemanticToken(node);
}

export function isMacro(node: Node): node is Macro {
  return node.kind === "Macro";
}

export function isColorRgbaLit(node: Node): node is ColorRgbaLit {
  return node.kind === "ColorRgbaLit";
}

export function isColorRgbLit(node: Node): node is ColorRgbLit {
  return node.kind === "ColorRgbLit";
}

export function isColorHexLit(node: Node): node is ColorHexLit {
  return node.kind === "ColorHexLit";
}

export function isPointLit(node: Node): node is PointLit {
  return node.kind === "PointLit";
}

export function isPercentLit(node: Node): node is PercentLit {
  return node.kind === "PercentLit";
}

export function isFontWeightLit(node: Node): node is FontWeightLit {
  return node.kind === "FontWeightLit";
}

export function isMillisecondLit(node: Node): node is MillisecondLit {
  return node.kind === "MillisecondLit";
}

export function isCubicBezierLit(node: Node): node is CubicBezierLit {
  return node.kind === "CubicBezierLit";
}
