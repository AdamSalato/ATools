/* ATools – Startseite: Kacheln aus dem Tool-Verzeichnis rendern, Suche und Filter. */
(function () {
  "use strict";
  var REG = window.ATOOLS;
  var grid = document.getElementById("tools");
  var chipsEl = document.getElementById("chips");
  var q = document.getElementById("q");
  var empty = document.getElementById("empty");
  var state = { cat: "alle", text: "" };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function lastUsed() { try { return localStorage.getItem("atools.lastTool"); } catch (e) { return null; } }

  function tileHTML(t, isLast) {
    var cats = t.categories.map(function (c) { return REG.categories[c] || c; }).join(" · ");
    return (
      '<a class="tile" href="tools/' + encodeURIComponent(t.id) + '/" style="--accent:' + esc(t.accent) + '" data-id="' + esc(t.id) + '">' +
        '<div class="tile-head">' +
          '<span class="tile-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + t.icon + "</svg></span>" +
          "<div>" + (isLast ? '<span class="badge">Zuletzt genutzt</span>' : "") + "<h2>" + esc(t.title) + '</h2><span class="short">' + esc(t.short) + " · " + esc(cats) + "</span></div>" +
        "</div>" +
        "<p>" + esc(t.description) + "</p>" +
        '<div class="tile-foot"><span class="norms" title="' + esc(t.norms) + '">' + esc(t.norms) + "</span>" +
          '<span class="go">Öffnen <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>' +
      "</a>"
    );
  }

  function matches(t) {
    if (state.cat !== "alle" && t.categories.indexOf(state.cat) < 0) return false;
    if (!state.text) return true;
    var hay = norm([t.title, t.short, t.description, t.norms, t.categories.map(function (c) { return REG.categories[c]; }).join(" ")].join(" "));
    return norm(state.text).split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  function render() {
    var last = lastUsed();
    var list = REG.tools.filter(matches);
    grid.innerHTML = list.map(function (t) { return tileHTML(t, t.id === last && REG.tools.length > 1); }).join("");
    empty.hidden = list.length > 0;
  }

  function renderChips() {
    var keys = ["alle"].concat(Object.keys(REG.categories));
    chipsEl.innerHTML = keys.map(function (k) {
      return '<button type="button" class="chip" data-cat="' + k + '" aria-pressed="' + (k === state.cat) + '">' +
        esc(k === "alle" ? "Alle" : REG.categories[k]) + "</button>";
    }).join("");
  }

  chipsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    state.cat = b.dataset.cat; renderChips(); render();
  });
  q.addEventListener("input", function () { state.text = q.value.trim(); render(); });
  q.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { var first = grid.querySelector(".tile"); if (first) first.click(); }
    if (e.key === "Escape") { q.value = ""; state.text = ""; render(); q.blur(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== q && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });

  document.getElementById("ver").textContent = REG.name + " " + REG.version + " · " + REG.tools.length + " Tools";
  renderChips(); render();

  /* Offline-Fähigkeit (nur über http/https, nicht bei file://) */
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
