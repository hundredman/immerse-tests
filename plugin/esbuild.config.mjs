import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: ["es2020"],
  outfile: "dist/index.mjs",
  sourcemap: true,
  external: ["donobu", "playwright"],
});
