export interface DataNode {
  dataType: string;
}

export interface RgbaLit extends DataNode {
  dataType: "RgbaLit";
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface PointLit extends DataNode {
  dataType: "PointLit";
  value: number;
}

export interface PercentLit extends DataNode {
  dataType: "PercentLit";
  value: number;
}

export type Literal = RgbaLit | PointLit | PercentLit;

export type Target =
  | "color"
  | "font-size"
  | "font-weight"
  | "line-height"
  | "letter-spacing"
  | "size"
  | "space"
  | "radii";

export interface ScaleToken extends DataNode {
  dataType: "ScaleToken";
  prefix: "$scale";
  target: Target;
  name: string;
}

export interface SemanticToken extends DataNode {
  dataType: "SemanticToken";
  prefix: "$semantic";
  group: string;
  name: string;
}

export type Token = ScaleToken | SemanticToken;

export type ScaleTokenStr =
  `${ScaleToken["prefix"]}.${ScaleToken["target"]}.${ScaleToken["name"]}`;
export type SemanticTokenStr =
  `${SemanticToken["prefix"]}.${SemanticToken["group"]}.${SemanticToken["name"]}`;
export type TokenStr = ScaleTokenStr | SemanticTokenStr;

export interface ScaleTokenDefinition extends DataNode {
  dataType: "ScaleTokenDefinition";
  token: ScaleToken;
  binding: Literal;
  condition: string;
}

export interface SemanticTokenDefinition extends DataNode {
  dataType: "SemanticTokenDefinition";
  token: SemanticToken;
  binding: ScaleToken;
  condition: string;
  property: string | null;
}

export type TokenDefinition = ScaleTokenDefinition | SemanticTokenDefinition;
