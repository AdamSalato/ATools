#!/usr/bin/env bash
# Lädt die gemeinsam genutzten Bibliotheken nach vendor/.
# Einmal ausführen und vendor/ mit committen. Dann laufen die Tools auch in Netzen,
# die CDNs sperren, und offline. Ohne vendor/ greifen die Tools automatisch auf das CDN zurück.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p vendor

CHARTJS=4.4.1
curl -fsSL "https://cdn.jsdelivr.net/npm/chart.js@${CHARTJS}/dist/chart.umd.min.js" -o vendor/chart.umd.min.js
echo "Chart.js ${CHARTJS} -> vendor/chart.umd.min.js ($(wc -c < vendor/chart.umd.min.js) Bytes)"
