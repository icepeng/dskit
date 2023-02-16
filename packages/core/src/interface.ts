export enum SyntaxKind {
  ColorHexLit = "ColorHexLit",
  ColorRgbLit = "ColorRgbLit",
  ColorRgbaLit = "ColorRgbaLit",
  PointLit = "PointLit",
  PercentLit = "PercentLit",
  FontWeightLit = "FontWeightLit",
  MillisecondLit = "MillisecondLit",
  CubicBezierLit = "CubicBezierLit",
  ColorScaleToken = "ColorScaleToken",
  FontSizeScaleToken = "FontSizeScaleToken",
  FontWeightScaleToken = "FontWeightScaleToken",
  LineHeightScaleToken = "LineHeightScaleToken",
  LetterSpacingScaleToken = "LetterSpacingScaleToken",
  DurationScaleToken = "DurationScaleToken",
  TimingFunctionScaleToken = "TimingFunctionScaleToken",
  SemanticToken = "SemanticToken",
  ColorScaleTokenDefinition = "ColorScaleTokenDefinition",
  FontSizeScaleTokenDefinition = "FontSizeScaleTokenDefinition",
  FontWeightScaleTokenDefinition = "FontWeightScaleTokenDefinition",
  LineHeightScaleTokenDefinition = "LineHeightScaleTokenDefinition",
  LetterSpacingScaleTokenDefinition = "LetterSpacingScaleTokenDefinition",
  DurationScaleTokenDefinition = "DurationScaleTokenDefinition",
  TimingFunctionScaleTokenDefinition = "TimingFunctionScaleTokenDefinition",
  SemanticTokenDefinition = "SemanticTokenDefinition",
  CommentDefinition = "CommentDefinition",
  Macro = "Macro",
}

export interface Node {
  kind: SyntaxKind;
}

export interface ColorHexLit extends Node {
  kind: SyntaxKind.ColorHexLit;
  value: string;
}

export interface ColorRgbLit extends Node {
  kind: SyntaxKind.ColorRgbLit;
  r: number;
  g: number;
  b: number;
}

export interface ColorRgbaLit extends Node {
  kind: SyntaxKind.ColorRgbaLit;
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface PointLit extends Node {
  kind: SyntaxKind.PointLit;
  value: number;
}

export interface PercentLit extends Node {
  kind: SyntaxKind.PercentLit;
  value: number;
}

export interface FontWeightLit extends Node {
  kind: SyntaxKind.FontWeightLit;
  value: "thin" | "regular" | "bold";
}

export interface MillisecondLit extends Node {
  kind: SyntaxKind.MillisecondLit;
  value: number;
}

export interface CubicBezierLit extends Node {
  kind: SyntaxKind.CubicBezierLit;
  p0: number;
  p1: number;
  p2: number;
  p3: number;
}

export interface SemanticToken extends Node {
  kind: SyntaxKind.SemanticToken;
  prefix: "$semantic";
  group: string;
  name: string;
}

export interface ColorScaleToken extends Node {
  kind: SyntaxKind.ColorScaleToken;
  prefix: "$scale" | "$static";
  target: "color";
  name: string;
}

export interface FontSizeScaleToken extends Node {
  kind: SyntaxKind.FontSizeScaleToken;
  prefix: "$scale" | "$static";
  target: "font-size";
  name: string;
}

export interface FontWeightScaleToken extends Node {
  kind: SyntaxKind.FontWeightScaleToken;
  prefix: "$scale" | "$static";
  target: "font-weight";
  name: string;
}

export interface LineHeightScaleToken extends Node {
  kind: SyntaxKind.LineHeightScaleToken;
  prefix: "$scale" | "$static";
  target: "line-height";
  name: string;
}

export interface LetterSpacingScaleToken extends Node {
  kind: SyntaxKind.LetterSpacingScaleToken;
  prefix: "$scale" | "$static";
  target: "letter-spacing";
  name: string;
}

export interface DurationScaleToken extends Node {
  kind: SyntaxKind.DurationScaleToken;
  prefix: "$scale" | "$static";
  target: "duration";
  name: string;
}

export interface TimingFunctionScaleToken extends Node {
  kind: SyntaxKind.TimingFunctionScaleToken;
  prefix: "$scale" | "$static";
  target: "timing-function";
  name: string;
}

export type ScaleToken =
  | ColorScaleToken
  | FontSizeScaleToken
  | LineHeightScaleToken
  | FontWeightScaleToken
  | LetterSpacingScaleToken
  | DurationScaleToken
  | TimingFunctionScaleToken;

export type Target = ScaleToken["target"];

export type Token = ScaleToken | SemanticToken;

export interface ColorScaleTokenDefinition extends Node {
  kind: SyntaxKind.ColorScaleTokenDefinition;
  token: ColorScaleToken;
  condition?: string;
  binding: ColorHexLit | ColorRgbLit | ColorRgbaLit;
}

export interface FontSizeScaleTokenDefinition extends Node {
  kind: SyntaxKind.FontSizeScaleTokenDefinition;
  token: FontSizeScaleToken;
  condition?: string;
  binding: PointLit | PercentLit;
}

export interface FontWeightScaleTokenDefinition extends Node {
  kind: SyntaxKind.FontWeightScaleTokenDefinition;
  token: FontWeightScaleToken;
  condition?: string;
  binding: FontWeightLit;
}

export interface LineHeightScaleTokenDefinition extends Node {
  kind: SyntaxKind.LineHeightScaleTokenDefinition;
  token: LineHeightScaleToken;
  condition?: string;
  binding: PointLit | PercentLit;
}

export interface LetterSpacingScaleTokenDefinition extends Node {
  kind: SyntaxKind.LetterSpacingScaleTokenDefinition;
  token: LetterSpacingScaleToken;
  condition?: string;
  binding: PointLit | PercentLit;
}

export interface DurationScaleTokenDefinition extends Node {
  kind: SyntaxKind.DurationScaleTokenDefinition;
  token: DurationScaleToken;
  condition?: string;
  binding: MillisecondLit;
}

export interface TimingFunctionScaleTokenDefinition extends Node {
  kind: SyntaxKind.TimingFunctionScaleTokenDefinition;
  token: TimingFunctionScaleToken;
  condition?: string;
  binding: CubicBezierLit;
}

export type ScaleTokenDefinition =
  | ColorScaleTokenDefinition
  | FontSizeScaleTokenDefinition
  | LineHeightScaleTokenDefinition
  | FontWeightScaleTokenDefinition
  | LetterSpacingScaleTokenDefinition
  | DurationScaleTokenDefinition
  | TimingFunctionScaleTokenDefinition;

export interface SemanticTokenDefinition extends Node {
  kind: SyntaxKind.SemanticTokenDefinition;
  token: SemanticToken;
  condition?: string;
  property?: string;
  binding: ScaleToken;
}

export interface CommentDefinition extends Node {
  kind: SyntaxKind.CommentDefinition;
  token: Token;
  comment: string;
}

export type BindingDefinition = ScaleTokenDefinition | SemanticTokenDefinition;

export type Definition = BindingDefinition | CommentDefinition;

export interface Macro extends Node {
  kind: SyntaxKind.Macro;
  extension: string;
  name: string;
  params: (string | Token)[];
}

export type Command = Definition | Macro;

export type AST = Command[];
