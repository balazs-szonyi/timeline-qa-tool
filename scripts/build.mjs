import { build } from "esbuild";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  outfile: "timeline-qa-tool.js",
  legalComments: "none",
});

await rm("site", { recursive: true, force: true });
await mkdir("site", { recursive: true });
await Promise.all([
  cp("index.html", "site/index.html"),
  cp("timeline-qa-tool.js", "site/timeline-qa-tool.js"),
  readFile(".nojekyll").catch(() => "").then((value) => writeFile("site/.nojekyll", value)),
]);
