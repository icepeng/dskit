export interface ParserOptions {
  startRule?: string | undefined;
  tracer?: any;
  [key: string]: any;
}

export function parse(source: string, options?: ParserOptions): any;
