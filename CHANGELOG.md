# Änderungen

## ATools 2.0.0

- Neu: **Daten und Vorgaben** – durchsuchbare Sammlung von Gesetzen, Normen, Richtwerten und Förderbedingungen (Stand 11/2026): Raumtemperaturen (ASR A3.5, DIN/TS 12831-1, Schulen/Kitas/Sporthallen, Betriebswerte), Beleuchtungsstärken (DIN EN 12464-1:2021, ASR A3.4), Lüftung und CO₂, Trinkwasser/Legionellen, U-Werte (Anlage 7 GModG, BEG-Mindestanforderungen, Bestand nach Baualter, Fenster, λ-Werte), GModG, MEPS, EnEfG, GEIG, WPG, BEHG, CO₂-Kostenaufteilung, § 14a EnWG, EEG, Solarpflicht NRW, KfW-Effizienzhaus und BEG, Normenverzeichnis (DIN, VDE, VDI, DVGW, AMEV), Primärenergie- und CO₂-Faktoren, Heizwerte, Verbrauchskennwerte, Nutzungsdauern, Prüfpflichten; Volltextsuche mit Umlaut- und Synonymerkennung und Zeilenfilter, Filter nach Art/Nutzung/Thema, Favoriten, Raum-Steckbrief je Raumart, Tabelle kopieren, Direktlinks, Druck; neue Kategorie „Wissen & Vorgaben“
- Umbenennung des Projekts von AdamTools in **ATools** (neues Repository, neue Adresse `/ATools/`)
- Prüfungsaufgaben heißen jetzt **Übungsaufgaben** (`tools/uebungsaufgaben/`)
- Neu: **Ladesäulenplanung** – Jahressimulation in Viertelstunden für Beschäftigte, Flotte, Besucher und Bewohner; AC/DC-Ladepunkte mit Fahrzeug-Ladeleistung und DC-Ladekurve; Lastmanagement ohne/statisch/dynamisch/PV-Überschuss mit Priorisierung; PV und Batteriespeicher (Eigenverbrauch oder Spitzenkappung); Belegungsplan je Tag, Jahres-Belegungsdiagramm, Dauerlinien, Gleichzeitigkeit; Strategievergleich und Leistungsgrenzen-Studie; Stromverkauf mit Abrechnungsdienst (z. B. MENNEKES ativo), THG-Quote, Leistungspreis, Kapitalwert, Amortisation, Sensitivität; technische Herausforderungen mit Lösungen (Netzanschluss, § 14a EnWG, AFIR, Eichrecht, VDE 0100-722)
- Ladesäulenplanung: neuer Reiter **Entwicklung bis 2050** – jedes Jahr eine eigene Viertelstunden-Simulation mit Hochlauf der E-Fahrzeuge (S-Kurve langsam/mittel/schnell, Faktor je Nutzergruppe), steigender Lademenge und sinkender Ladehäufigkeit, eigenen Preispfaden für Strombezug, Verkauf und THG-Quote, PV-Alterung, Ersatz der Ladestationen nach Nutzungsdauer, automatischem Ausbau (AC bzw. DC) und optionaler Netzverstärkung; Kennzahlen, Diagramme und Jahrestabelle bis zum Endjahr
- Ladesäulenplanung und Einsparmaßnahmen: **PDF-Bericht** im Stil des Energierechners (A4 quer, Deckblatt mit Kennzahlen, Eckdaten, Empfehlungen; alle Reiter mit Diagrammen und Tabellen; Anhang mit Eingaben; Projektname, Adresse und Bearbeitung)
- Neu: **Einsparmaßnahmen** – schnelle Gebäudeaufnahme, Aufteilung des Verbrauchs nach Anwendungen, rund 30 Maßnahmen (Beleuchtung, Präsenz-/Bewegungsmelder in WC und Druckerräumen, Fensterkontakt für Klimageräte, Geräte und IT, Haustechnik, Heizung, Hülle, Wasser, Organisation) mit Rechenweg, Einsparung, CO₂, Amortisation, Kapitalwert; Paketwirkung mit Wechselwirkungen, Kapitalrückfluss, CO₂-Vermeidungskostenkurve, CSV und Druck
- Energiebedarfsrechner: neuer Eingabe- und Ergebnisreiter **E-Mobilität** – AC/DC-Ladepunkte, Nutzerprofile, Besucher-Ladevorgänge, Lastmanagement; viertelstündliche Ladesimulation fließt in Lastgang, PV-Eigenverbrauch, Netzanschluss und Kosten ein; **GEIG-Prüfung in der Fassung des GModG** (Neubau, größere Renovierung, Bestand, Behördengebäude, Übergangsregel § 16, Ausnahme § 14, öffentlich zugängliche Stellplätze) mit Stellplatzplan Ist/Soll und Nachrüstkosten; Wirtschaftlichkeit der Ladeinfrastruktur; eigenes Kapitel im Energiekonzept, Befunde und Bericht

## ATools 1.1.0 – 21.11.2026

- Neu: **Lastgang-Analyse** – CSV/Excel-Import mit automatischer Erkennung, Kennzahlen und Befunde, Zeitverlauf, Dauerlinie, Teppichdiagramm, Typtage, Monatswerte, Lastspitzenkappung mit Speicherauslegung, CSV/PDF-Export
- Neu: **Übungsaufgaben** – 11 Aufgabentypen in 5 Themen, 3 Niveaustufen für Azubis (kaufmännisch, Verwaltung, technisch) und Studierende, Zufallswerte, Varianten je Prüfling, Musterlösungen mit Rechenweg, IHK-Notenschlüssel, Druck/PDF
- Übungsaufgaben erweitert: **Betriebskostenabrechnung** (BetrKV, HeizkostenV, Abrechnungsfrist) und **PV-Technik** (Übersichtsschaltplan mit nummerierten Bauteilen, Strangauslegung nach Temperatur, Spannungsfall, DC/AC-Verhältnis); Diagramme in LED, Kapitalwert, Kostenvergleich, PV, Wärmepumpe, Lastgang und Fristen
- Musterlösungen mit „Lösungsansatz“ je Teilaufgabe: warum welche Formel, Herleitung, typische Fehler, Bewertungshinweise bei Textaufgaben
- WP vs. Brennwert: neues Diagramm **Jahresdauerlinie der Heizleistung** (Deckung WP/Heizstab, WP-Maximalleistung, elektrische Leistungsaufnahme, Außentemperatur); Warmwasser über der WP-Einsatzgrenze wird anteilig per Heizstab gerechnet; Hinweistext Monatsarbeitszahl korrigiert
- PV-Rechner und WP-Tool: Achsenbeschriftungen im deutschen Zahlenformat
- Chart.js 4.4.1 liegt jetzt in `vendor/` – Diagramme funktionieren auch ohne Internet bzw. bei gesperrten CDNs
- Energiebedarfsrechner: neue Warmwasser-Variante „nur Kaltwasser – einzelne Durchlauferhitzer“ mit Anzahl, Nennleistung und Zapfdauer der Geräte; Strombedarf daraus berechnet, Leistung im Netzanschluss berücksichtigt; auch bei „dezentral elektrisch (Durchlauferhitzer)“ und Kleinspeichern in Nichtwohngebäuden geht die Geräteleistung (aus Ausstattung oder eigener Angabe, Gleichzeitigkeit 1/√n, mindestens größtes Gerät) in den Netzanschluss ein
- Startseite: Titel „Tools“ ohne Symbol und Überschrift, neue Kategorie „Ausbildung“

## ATools 1.0.0 – 21.11.2026

- Startseite mit Kacheln, Suche und Kategorie-Filter, Hell/Dunkel für alle Tools
- Vier Tools aus den Einzel-Repos übernommen: Energiebedarfsrechner, InvestTool, PV-Rechner, WP vs. Brennwert
- Chart.js lokal (`vendor/`) mit CDN-Fallback, Offline-Nutzung per Service Worker, als App installierbar
- Automatische Konsistenzprüfung (`scripts/check.mjs`, GitHub Actions)

### InvestTool 1.2-web

- **Sonderzahlungen** je Alternative (z. B. „13: 2.500; 20: 1.200“) für Ersatzinvestitionen, Generalüberholung oder Rückbau – ohne in die manuelle Zahlungsreihe wechseln zu müssen. Wirken auf alle Verfahren, auf Sensitivität (eigener Parameter) und Berichte/CSV.
- Vorlage „Photovoltaik“ berücksichtigt jetzt den Wechselrichtertausch im Jahr 13.
- **Link teilen:** Alle Eingaben stecken im Link. Wer ihn öffnet, sieht genau diese Rechnung (kein Server, keine Datenübertragung).
- Lange Feldbezeichnungen auf dem Handy werden umbrochen statt abgeschnitten.
- Alle bestehenden Vorlagen liefern unverändert dieselben Ergebnisse wie Version 1.1.
