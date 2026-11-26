# ATools

Sammlung browserbasierter Rechner für Energie- und Gebäudemanagement. Alles läuft im Browser, nichts wird an einen Server übertragen.

**Live:** https://adamsalato.github.io/ATools/

| Tool | Pfad |
|---|---|
| Energiebedarfsrechner | `tools/energierechner/` |
| InvestTool (Investitionsrechner) | `tools/investitionsrechner/` |
| PV-Rechner | `tools/pv-rechner/` |
| Lastgang-Analyse | `tools/lastgang/` |
| Ladesäulenplanung | `tools/ladeplanung/` |
| Einsparmaßnahmen | `tools/einsparmassnahmen/` |
| Daten und Vorgaben | `tools/vorgaben/` |
| Übungsaufgaben | `tools/uebungsaufgaben/` |
| WP vs. Brennwert | `tools/wp-brennwert/` |

## Aufbau

```
ATools/
├── index.html              Startseite mit Kacheln (wird aus tools.js erzeugt)
├── 404.html                Fehlerseite mit Link zur Übersicht
├── sw.js                   Service Worker: Offline-Nutzung
├── manifest.webmanifest    als App installierbar (Chrome/Edge: „Installieren“)
├── assets/
│   ├── css/hub.css
│   ├── img/favicon.svg
│   └── js/
│       ├── tools.js        ← Tool-Verzeichnis (einzige Stelle zum Pflegen)
│       ├── hub.js          Kacheln, Suche, Filter
│       ├── theme.js        Hell/Dunkel/System, gilt für alle Tools
│       └── toolbar.js      ATools-Symbol vor dem Titel jedes Tools
├── tools/<id>/index.html   je ein Tool, eigenständig lauffähig
├── vendor/                 Chart.js 4.4.1 (lokal, mit CDN-Rückfall)
├── scripts/
│   ├── check.mjs           Konsistenzprüfung
│   └── vendor.sh           Bibliotheken nach vendor/ laden
├── legacy-redirect/        fertige Weiterleitungen für die vier alten Repos
└── .github/workflows/      automatische Prüfung bei jedem Push
```

Jedes Tool bleibt eine eigenständige HTML-Datei. Die Tools teilen sich nur Theme, Navigation, Favicon und Bibliotheken.

## Einrichtung (einmalig)

```bash
cd ~/Downloads/ATools
git add -A
git commit -m "ATools: erste Version"
git remote add origin git@github.com:AdamSalato/ATools.git
git push -u origin main
```

Auf GitHub: *Settings → Pages → Deploy from a branch*, Branch `main`, Ordner `/ (root)`.

## Tool aktualisieren

Neue `index.html` nach `tools/<id>/` kopieren und prüfen, dass vor `</body>` diese Zeile steht:

```html
<script src="../../assets/js/toolbar.js" defer></script>
```

Dann `node scripts/check.mjs`, committen, pushen.

## Neues Tool hinzufügen

1. Ordner `tools/<id>/` mit `index.html` anlegen (id: Kleinbuchstaben und Bindestriche)
2. `toolbar.js` wie oben einbinden
3. Eintrag in `assets/js/tools.js` ergänzen (Titel, Beschreibung, Kategorie, Farbe, Icon)
4. `node scripts/check.mjs`

## Alte Einzel-Repos

Zwei Möglichkeiten:

- **Weiterleiten (empfohlen):** In `legacy-redirect/<Repo-Name>/` liegt je eine fertige `index.html`. Im alten Repo alles außer `.nojekyll` löschen, diese Datei hineinlegen, pushen. Alte Links und Lesezeichen landen dann im neuen Tool.
- **Löschen:** Repo auf GitHub unter *Settings → Danger Zone* löschen bzw. Pages deaktivieren. Alte Links zeigen dann auf die 404-Seite von GitHub.

Gespeicherte Eingaben bleiben in beiden Fällen erhalten, weil alle Seiten unter `adamsalato.github.io` liegen. Die Python-Versionen und die alten Repos bleiben über die Git-Historie erreichbar, falls du sie archivieren statt löschen willst (*Settings → Archive this repository*).

## Hinweis

Die Ergebnisse sind Planungs- und Abschätzungswerte. Sie ersetzen keine Fachplanung, keinen Energieausweis und keine steuerliche Beratung.
