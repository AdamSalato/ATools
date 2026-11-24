/*
 * ATools – gemeinsamer Baustein für alle Tools.
 * Einbinden in tools/<id>/index.html vor </body>:
 *   <script src="../../assets/js/toolbar.js" defer></script>
 *
 * - "Zurück zu ATools"-Symbol vor dem Tool-Titel (Shadow DOM, beeinflusst das Tool-CSS nicht);
 *   ohne <h1> oder mit data-bottom: schwebender Knopf unten links
 * - übernimmt die im Hub gewählte Darstellung (Hell/Dunkel/System)
 * - merkt sich das zuletzt genutzte Tool für die Startseite
 * - registriert den Service Worker für Offline-Nutzung
 * Wird beim Drucken/PDF ausgeblendet.
 * Optional: data-bottom="42" erzwingt den schwebenden Knopf, angehoben um 42 px.
 */
(function () {
  "use strict";
  var script = document.currentScript;
  var base = new URL("../../", script ? script.src : location.href); // Projektwurzel
  var lift = parseInt(script && script.dataset.bottom, 10) || 0;
  var toolId = (location.pathname.match(/\/tools\/([^\/]+)\//) || [])[1];

  try {
    var t = localStorage.getItem("atools.theme");
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
    if (toolId) localStorage.setItem("atools.lastTool", decodeURIComponent(toolId));
  } catch (e) {}

  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>';
  var LINK = '<a href="' + base.href + '" title="Zur ATools-Übersicht" aria-label="Zur ATools-Übersicht">' + ICON + "<span>ATools</span></a>";
  var COMMON = "a{display:flex;align-items:center;text-decoration:none;background:#1d4f7c;color:#fff;font:600 13px/1 system-ui,-apple-system,'Segoe UI',sans-serif}" +
    "a:focus-visible{outline:2px solid #e09a2a;outline-offset:2px}" +
    "svg{flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    "@media print{:host{display:none!important}}";

  function mount() {
    if (document.getElementById("atools-home")) return;
    var host = document.createElement("span");
    host.id = "atools-home";
    var root = host.attachShadow({ mode: "open" });
    // Bevorzugt: Symbol vor dem Tool-Titel im Kopfbereich (überdeckt keine Inhalte)
    var title = document.querySelector("header h1") || document.querySelector("h1");
    if (title && !lift) {
      root.innerHTML = "<style>:host{display:inline-flex;vertical-align:middle;margin-right:.45em;position:relative;top:-.06em}" + COMMON +
        "a{justify-content:center;width:1.25em;height:1.25em;min-width:28px;min-height:28px;border-radius:7px;transition:background .15s}" +
        "a:hover{background:#163d61}svg{width:62%;height:62%}span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}</style>" + LINK;
      title.insertBefore(host, title.firstChild);
      return;
    }
    // Rückfall: schwebender Knopf unten links
    root.innerHTML = "<style>:host{all:initial}" + COMMON +
      "a{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:calc(" + lift + "px + max(12px,env(safe-area-inset-bottom)));z-index:45;" +
      "gap:0;height:38px;padding:0 9px;border-radius:999px;box-shadow:0 2px 6px rgba(0,0,0,.18),0 6px 18px rgba(0,0,0,.14);opacity:.88;transition:opacity .15s,gap .15s,padding .15s}" +
      "a:hover,a:focus-visible{opacity:1;gap:7px;padding:0 14px 0 10px}" +
      "svg{width:20px;height:20px}span{max-width:0;overflow:hidden;white-space:nowrap;transition:max-width .2s}" +
      "a:hover span,a:focus-visible span{max-width:140px}@media (prefers-reduced-motion:reduce){a,span{transition:none}}</style>" + LINK;
    document.body.appendChild(host);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();

  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register(new URL("sw.js", base).href, { scope: base.pathname }).catch(function () {});
  }
})();
