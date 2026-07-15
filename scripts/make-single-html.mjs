import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const mime = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const dist = "dist";
const assetsDir = join(dist, "assets");
const dataUrls = new Map();

for (const name of await readdir(assetsDir)) {
  const file = join(assetsDir, name);
  const ext = extname(name);
  const bytes = await readFile(file);
  const dataUrl = `data:${mime[ext] || "application/octet-stream"};base64,${bytes.toString("base64")}`;
  dataUrls.set(`/assets/${name}`, dataUrl);
  dataUrls.set(`assets/${name}`, dataUrl);
}

let html = await readFile(join(dist, "index.html"), "utf8");

const cssMatch = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)"\/>/);
if (cssMatch) {
  let css = await readFile(join(dist, cssMatch[1].replace(/^\//, "")), "utf8");
  for (const [asset, dataUrl] of dataUrls) css = css.split(asset).join(dataUrl);
  html = html.replace(cssMatch[0], `<style>${css}</style>`);
}

const jsMatch = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
if (jsMatch) {
  let js = await readFile(join(dist, jsMatch[1].replace(/^\//, "")), "utf8");
  for (const [asset, dataUrl] of dataUrls) js = js.split(asset).join(dataUrl);
  html = html.replace(jsMatch[0], `<script type="module">${js}</script>`);
}

for (const [asset, dataUrl] of dataUrls) html = html.split(asset).join(dataUrl);

await writeFile("海南田俊程官网-单文件预览.html", html, "utf8");
