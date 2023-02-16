import {
  SemanticToken,
  SemanticTokenDefinition,
  ColorScaleToken,
  ColorScaleTokenDefinition,
  FontSizeScaleToken,
  FontSizeScaleTokenDefinition,
  FontWeightScaleToken,
  FontWeightScaleTokenDefinition,
  LetterSpacingScaleToken,
  LetterSpacingScaleTokenDefinition,
  LineHeightScaleToken,
  LineHeightScaleTokenDefinition,
  Macro,
  SyntaxKind,
} from "./interface";

export function createMacro(
  extension: Macro["extension"],
  name: Macro["name"],
  params: Macro["params"],
): Macro {
  return {
    kind: SyntaxKind.Macro,
    extension,
    name,
    params,
  };
}

// Tokens
export function createColorScaleToken(
  prefix: ColorScaleToken["prefix"],
  name: string,
): ColorScaleToken {
  return {
    kind: SyntaxKind.ColorScaleToken,
    prefix,
    target: "color",
    name,
  };
}

export function createFontSizeScaleToken(
  prefix: FontSizeScaleToken["prefix"],
  name: string,
): FontSizeScaleToken {
  return {
    kind: SyntaxKind.FontSizeScaleToken,
    prefix,
    target: "font-size",
    name,
  };
}

export function createLineHeightScaleToken(
  prefix: LineHeightScaleToken["prefix"],
  name: string,
): LineHeightScaleToken {
  return {
    kind: SyntaxKind.LineHeightScaleToken,
    prefix,
    target: "line-height",
    name,
  };
}

export function createLetterSpacingScaleToken(
  prefix: LetterSpacingScaleToken["prefix"],
  name: string,
): LetterSpacingScaleToken {
  return {
    kind: SyntaxKind.LetterSpacingScaleToken,
    prefix,
    target: "letter-spacing",
    name,
  };
}

export function createFontWeightScaleToken(
  prefix: FontWeightScaleToken["prefix"],
  name: string,
): FontWeightScaleToken {
  return {
    kind: SyntaxKind.FontWeightScaleToken,
    prefix,
    target: "font-weight",
    name,
  };
}
export function createSemanticToken(
  group: string,
  name: string,
): SemanticToken {
  return {
    kind: SyntaxKind.SemanticToken,
    prefix: "$semantic",
    group,
    name,
  };
}

// Definitions
export function createColorScaleTokenDefinition(
  token: ColorScaleTokenDefinition["token"],
  binding: ColorScaleTokenDefinition["binding"],
  condition?: string,
): ColorScaleTokenDefinition {
  return {
    kind: SyntaxKind.ColorScaleTokenDefinition,
    token,
    binding,
    condition,
  };
}

export function createFontSizeScaleTokenDefinition(
  token: FontSizeScaleTokenDefinition["token"],
  binding: FontSizeScaleTokenDefinition["binding"],
  condition?: string,
): FontSizeScaleTokenDefinition {
  return {
    kind: SyntaxKind.FontSizeScaleTokenDefinition,
    token,
    binding,
    condition,
  };
}

export function createLineHeightScaleTokenDefinition(
  token: LineHeightScaleTokenDefinition["token"],
  binding: LineHeightScaleTokenDefinition["binding"],
  condition?: string,
): LineHeightScaleTokenDefinition {
  return {
    kind: SyntaxKind.LineHeightScaleTokenDefinition,
    token,
    binding,
    condition,
  };
}

export function createLetterSpacingScaleTokenDefinition(
  token: LetterSpacingScaleTokenDefinition["token"],
  binding: LetterSpacingScaleTokenDefinition["binding"],
  condition?: string,
): LetterSpacingScaleTokenDefinition {
  return {
    kind: SyntaxKind.LetterSpacingScaleTokenDefinition,
    token,
    binding,
    condition,
  };
}

export function createFontWeightScaleTokenDefinition(
  token: FontWeightScaleTokenDefinition["token"],
  binding: FontWeightScaleTokenDefinition["binding"],
  condition?: string,
): FontWeightScaleTokenDefinition {
  return {
    kind: SyntaxKind.FontWeightScaleTokenDefinition,
    token,
    binding,
    condition,
  };
}

export function createSemanticTokenDefinition(
  token: SemanticTokenDefinition["token"],
  binding: SemanticTokenDefinition["binding"],
  condition?: string,
  property?: string,
): SemanticTokenDefinition {
  return {
    kind: SyntaxKind.SemanticTokenDefinition,
    token,
    binding,
    condition,
    property,
  };
}
