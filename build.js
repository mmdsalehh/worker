const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "_worker.js",
    bundle: true,
    platform: "browser",
    format: "esm",
    sourcemap: false,
    target: ["es2021"],
    minify: true,
    logLevel: "info",
    external: ["cloudflare:sockets"],
  })
  .catch(() => process.exit(1));
