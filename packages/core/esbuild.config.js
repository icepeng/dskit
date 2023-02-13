const { build } = require("esbuild");
const pkg = require("./package.json");

const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const config = {
    entryPoints: ["./src/index.ts"],
    outdir: "lib",
    target: "es2020",
    bundle: true,
    minify: false,
    external: ["react"],
    sourcemap: true,
}

Promise.all([
  build({
    ...config,
    format: "cjs",
    external,
  }),
  build({
    ...config,
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
    external,
  }),
]).catch(() => process.exit(1));
