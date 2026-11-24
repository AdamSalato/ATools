#!/usr/bin/env node
/*
 * ATools – Konsistenzprüfung (lokal: `node scripts/check.mjs`, läuft auch in GitHub Actions).
 * Prüft:
 *   - jedes Tool im Verzeichnis (assets/js/tools.js) hat tools/<id>/index.html
 *   - jeder Ordner unter tools/ ist im Verzeichnis eingetragen
 *   - jedes Tool bindet toolbar.js ein, hat <title> und viewport
 *   - Pflichtfelder und eindeutige IDs im Verzeichnis
 *   - lokale Verweise (src/href) in allen HTML-Dateien zeigen auf existierende Dateien
 *     (vendor/ ist ausgenommen, dort greift der CDN-Fallback)
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warn = [];

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, "assets/js/tools.js"), "utf8"), sandbox);
const REG = sandbox.window.ATOOLS;
if (!REG || !Array.isArray(REG.tools)) { console.error("tools.js: window.ATOOLS.tools fehlt"); process.exit(1); }

const ids = new Set();
for (const t of REG.tools) {
  for (const f of ["id", "title", "short", "description", "categories", "accent", "icon"]) {
    if (!t[f] || (Array.isArray(t[f]) && !t[f].length)) errors.push(`Tool "${t.id}": Feld "${f}" fehlt`);
  }
  if (ids.has(t.id)) errors.push(`Tool-ID doppelt: ${t.id}`);
  ids.add(t.id);
  if (!/^[a-z0-9-]+$/.test(t.id)) errors.push(`Tool-ID "${t.id}": nur a-z, 0-9 und - erlaubt`);
  for (const c of t.categories || []) if (!REG.categories[c]) errors.push(`Tool "${t.id}": unbekannte Kategorie "${c}"`);

  const file = join(ROOT, "tools", t.id, "index.html");
  if (!existsSync(file)) { errors.push(`Tool "${t.id}": tools/${t.id}/index.html fehlt`); continue; }
  const html = readFileSync(file, "utf8");
  if (!html.includes("../../assets/js/toolbar.js")) errors.push(`tools/${t.id}: toolbar.js nicht eingebunden`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`tools/${t.id}: <title> fehlt`);
  if (!/name="viewport"/.test(html)) warn.push(`tools/${t.id}: viewport-Meta fehlt`);
  if (/<script[^>]+src="https?:\/\//.test(html) && !/window\.\w+\|\|document\.write/.test(html)) {
    warn.push(`tools/${t.id}: lädt Skripte direkt von einem CDN (ohne lokale Kopie)`);
  }
}
for (const d of readdirSync(join(ROOT, "tools"))) {
  if (statSync(join(ROOT, "tools", d)).isDirectory() && !ids.has(d)) errors.push(`tools/${d}/ ist nicht in tools.js eingetragen`);
}

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n.startsWith(".") || n === "node_modules" || n === "legacy-redirect") continue;
    const p = join(dir, n);
    statSync(p).isDirectory() ? walk(p, out) : n.endsWith(".html") && out.push(p);
  }
  return out;
}
for (const file of walk(ROOT)) {
  if (file.endsWith("404.html")) continue;
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/\s(?:src|href)="([^"#?]+)[^"]*"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|data:|javascript:|\/\/)/.test(ref) || ref.includes("${") || ref.includes("'+")) continue;
    if (ref.includes("vendor/")) continue;
    let target = resolve(dirname(file), ref);
    if (ref.endsWith("/")) target = join(target, "index.html");
    if (!existsSync(target)) errors.push(`${file.slice(ROOT.length + 1)}: Verweis "${ref}" ins Leere`);
  }
}

warn.forEach((w) => console.warn("Hinweis:", w));
if (errors.length) { errors.forEach((e) => console.error("FEHLER:", e)); process.exit(1); }
console.log(`OK – ${REG.tools.length} Tools geprüft.`);
