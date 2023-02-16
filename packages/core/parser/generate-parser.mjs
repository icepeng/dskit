import * as fs from "fs";
import path from "path";
import pegjs from "pegjs";

const __dirname = path.resolve();

const grammar = fs.readFileSync(`${__dirname}/parser/kdt.pegjs`).toString();
const parser = pegjs.generate(grammar, {
  output: "source",
  format: "commonjs",
  allowedStartRules: ["KDT", "Command", "Definition", "ScaleToken", "SemanticToken", "Token", "Macro"],
});
fs.writeFileSync(`${__dirname}/src/__generated__/parser.js`, parser);
