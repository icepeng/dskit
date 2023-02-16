import { parse as _parse } from "./__generated__/parser";
import {
  AST,
  Command,
  Definition,
  Macro,
  ScaleToken,
  SemanticToken,
  Token,
} from "./interface";

interface Location {
  line: number;
  column: number;
  offset: number;
}

interface LocationRange {
  start: Location;
  end: Location;
}

export interface SyntaxError {
  line: number;
  column: number;
  offset: number;
  location: LocationRange;
  expected: unknown[];
  found: unknown;
  name: string;
  message: string;
}

export function parseDocument(source: string): AST {
  return _parse(source);
}

export function parseCommand(source: string): Command {
  return _parse(source, { startRule: "Command" });
}

export function parseDefinition(source: string): Definition {
  return _parse(source, { startRule: "Definition" });
}

export function parseScaleToken(source: string): ScaleToken {
  return _parse(source, { startRule: "ScaleToken" });
}

export function parseSemanticToken(source: string): SemanticToken {
  return _parse(source, { startRule: "SemanticToken" });
}

export function parseToken(source: string): Token {
  return _parse(source, { startRule: "Token" });
}

export function parseMacro(source: string): Macro {
  return _parse(source, { startRule: "Macro" });
}
