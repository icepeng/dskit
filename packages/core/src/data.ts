export type ScaleToken = {
  prefix: "$scale";
  target:
    | "color"
    | "font-size"
    | "font-weight"
    | "line-height"
    | "letter-spacing"
    | "size"
    | "space"
    | "radii";
  name: string;
};

export type SemanticToken = {
  prefix: "$semantic";
  group: string;
  name: string;
};

export type Token = ScaleToken | SemanticToken;

export type ScaleTokenDefinition = {
  token: ScaleToken;
  binding: string;
  condition: string;
};

export type SemanticTokenDefinition = {
  token: SemanticToken;
  binding: string;
  property: string | "None";
  condition: string;
};

export type TokenDefinition = ScaleTokenDefinition | SemanticTokenDefinition;
