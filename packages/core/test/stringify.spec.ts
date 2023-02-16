import * as KDT from "../src";
import { describe, it, expect } from "vitest";

const SOURCE_CODE = [
  "$scale.color.gray-00 -> #ffffff (theme-light)",
  "$scale.color.gray-00 -> #000000 (theme-dark)",
  "$scale.color.gray-00 -> rgb(255, 255, 255) (theme-light)",
  "$scale.color.gray-00 -> rgb(0, 0, 0) (theme-dark)",
  "$scale.color.gray-00 -> rgba(255, 255, 255, 1) (theme-light)",
  "$scale.color.gray-00 -> rgba(0, 0, 0, 1) (theme-dark)",
  "$semantic.color.paper -> $scale.color.gray-00 (theme-light)",
  "$semantic.color.paper -> $scale.color.gray-00 (theme-dark)",
  "$scale.line-height.line-100 -> 100% (*)",
  "$scale.font-weight.thin -> thin (*)",
  "$scale.letter-spacing.none -> 0% (*)",
  "$scale.font-size.size-100 -> 12pt (*)",
  "$scale.duration.time-100 -> 130ms (*)",
  "$scale.timing-function.linear -> cubic-bezier(0, 0, 1, 1) (*)",
  "$semantic.typography.h1 -[:font-size]> $scale.font-size.font-size-1000 (scale-medium)",
  "$semantic.typography.h1 -[:font-size]> $scale.font-size.font-size-1000 (scale-large)",
  "$semantic.typography.h1 -[:font-weight]> $static.font-weight.static-700",
  "$semantic.typography.h1 -[:line-height]> $static.line-height.static-140",
  "$semantic.typography.h1 -[:letter-spacing]> $scale.letter-spacing.none (platform-ios)",
  "$semantic.typography.h1 -[:letter-spacing]> $scale.letter-spacing.narrow-400 (platform-android)",
  "%figma:fill($scale.color.gray-00, theme-light)",
].join("\n");

describe("stringify", () => {
  it("parse-stringify identical", () => {
    // given
    const sourceCode = SOURCE_CODE;
    const AST = KDT.parseDocument(sourceCode);

    // when
    const str = KDT.stringify(AST!);

    // then
    expect(str).toBe(sourceCode);
  });
});
