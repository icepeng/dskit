const { build } = require("esbuild");
const config = require("@stackflow/esbuild-config");
const pkg = require("./package.json");

const watch = process.argv.includes("--watch");
const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const config = {
    entryPoints: "./src/index.ts",
    outdir: "lib",
    target: "es2020",
    bundle: true,
    minify: false,
    external: ["react"],
    sourcemap: true,
}

Promise.all([
  build({
    ...config({}),
    format: "cjs",
    external,
    watch,
  }),
  build({
    ...config({}),
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
    external,
    watch,
  }),
]).catch(() => process.exit(1));
