/* ATools – gemeinsame Darstellungs-Einstellung (System / Hell / Dunkel). */
(function () {
  "use strict";
  var KEY = "atools.theme";
  var ORDER = ["system", "light", "dark"];
  var LABEL = { system: "Darstellung: System", light: "Darstellung: Hell", dark: "Darstellung: Dunkel" };
  var ICON = {
    system: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    dark: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>'
  };

  function get() { try { return localStorage.getItem(KEY) || "system"; } catch (e) { return "system"; } }
  function apply(mode) {
    var root = document.documentElement;
    if (mode === "light" || mode === "dark") root.dataset.theme = mode; else delete root.dataset.theme;
  }
  function set(mode) {
    try { if (mode === "system") localStorage.removeItem(KEY); else localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode);
  }

  apply(get());
  window.ATheme = { get: get, set: set };

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("themeBtn");
    if (!btn) return;
    function paint() {
      var m = get();
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[m] + "</svg>";
      btn.title = LABEL[m]; btn.setAttribute("aria-label", LABEL[m] + " – wechseln");
    }
    btn.addEventListener("click", function () { set(ORDER[(ORDER.indexOf(get()) + 1) % ORDER.length]); paint(); });
    paint();
  });
})();
