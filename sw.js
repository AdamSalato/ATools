/*
 * ATools – Service Worker für Offline-Nutzung.
 * Strategie:
 *   - eigene Dateien: Netzwerk zuerst, bei Ausfall aus dem Cache (Updates kommen sofort an)
 *   - versionierte Bibliotheken von CDNs (z. B. chart.js@4.4.1): Cache zuerst
 *   - Schriften: aus dem Cache, im Hintergrund aktualisieren
 * Bei Strukturänderungen CACHE hochzählen.
 */
const CACHE = "atools-v1";
const CORE = [
  "./",
  "index.html",
  "assets/css/hub.css",
  "assets/js/tools.js",
  "assets/js/theme.js",
  "assets/js/hub.js",
  "assets/js/toolbar.js",
  "assets/img/favicon.svg",
  "manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function put(req, res) {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
  }
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then((res) => put(req, res)).catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html"))
      )
    );
    return;
  }

  const versionedLib = /cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com/.test(url.host) && /@\d/.test(url.pathname);
  if (versionedLib) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => put(req, res))));
    return;
  }

  if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => put(req, res)).catch(() => hit);
        return hit || net;
      })
    );
  }
});
