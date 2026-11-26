/*
 * ATools – zentrales Tool-Verzeichnis (Single Source of Truth).
 *
 * Neues Tool aufnehmen:
 *   1. Ordner tools/<id>/ mit index.html anlegen
 *   2. In die index.html vor </body> einfügen:
 *        <script src="../../assets/js/toolbar.js" defer></script>
 *   3. Hier einen Eintrag ergänzen (id = Ordnername)
 *   4. `node scripts/check.mjs` ausführen
 *
 * Bewusst ein klassisches Script (kein fetch/JSON, kein ES-Modul),
 * damit der Hub auch per Doppelklick (file://) ohne Server funktioniert.
 */
window.ATOOLS = {
  name: "ATools",
  version: "2.0.0",
  categories: {
    energie: "Energie",
    wirtschaft: "Wirtschaftlichkeit",
    anlagen: "Anlagentechnik",
    ausbildung: "Ausbildung",
    wissen: "Wissen & Vorgaben"
  },
  tools: [
    {
      id: "energierechner",
      title: "Energiebedarfsrechner",
      short: "Gebäude-Energierechner",
      description: "Jahresverbrauch Strom, Wärme und Wasser eines Gebäudes mit Energiekonzept, Kennzahlen und PDF-Bericht.",
      categories: ["energie"],
      norms: "DIN V 18599 · DIN EN 12831 · VDI 3807 · GEG",
      accent: "#2a8a5e",
      icon: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/><path d="M13 7.5 11 11h2.5l-2 3.5"/>'
    },
    {
      id: "investitionsrechner",
      title: "InvestTool",
      short: "Investitionsrechner",
      description: "Statische und dynamische Investitionsrechnung: Kapitalwert, IRR, Annuität, Amortisation, EVA und Sensitivität für bis zu drei Alternativen.",
      categories: ["wirtschaft"],
      norms: "Kapitalwert · IRR/MIRR · VoFi · EVA",
      accent: "#1d63a8",
      icon: '<path d="M4 20h16"/><path d="M6 16v-4M10 16V9M14 16v-6M18 16V5"/><path d="m5 9 5-4 4 3 5-4"/>'
    },
    {
      id: "einsparmassnahmen",
      title: "Einsparmaßnahmen",
      short: "Maßnahmen für Bestandsgebäude",
      description: "Rund 30 Maßnahmen von Präsenzmelder über Fensterkontakt bis Kellerdeckendämmung: Einsparung, Kosten, CO₂, Amortisation und Paketwirkung – mit schneller Gebäudeaufnahme.",
      categories: ["energie", "wirtschaft"],
      norms: "DIN V 18599 · VDI 2067 · ASR A3.5 · GModG",
      accent: "#2c7d48",
      icon: '<path d="M12 3c-4.5 4-6 7-6 10a6 6 0 0 0 12 0c0-3-1.5-6-6-10z"/><path d="M12 21v-8M12 16l-2.5-2.2M12 18.5l3-3"/>'
    },
    {
      id: "vorgaben",
      title: "Daten und Vorgaben",
      short: "Gesetze, Normen, Richtwerte",
      description: "Durchsuchbare Sammlung: Raumtemperaturen und Beleuchtungsstärken je Raumart, U-Werte, KfW-Effizienzhaus, GModG, EnEfG, Solarpflicht, Prüfpflichten, Primärenergiefaktoren und ein Normenverzeichnis – mit Raum-Steckbrief.",
      categories: ["wissen", "energie"],
      norms: "GModG · ASR A3.4/A3.5 · DIN EN 12464-1 · DIN V 18599",
      accent: "#5a4a9c",
      icon: '<rect x="4" y="3" width="12" height="17" rx="1.5"/><path d="M7 7.5h6M7 11h6M7 14.5h3"/><circle cx="17" cy="17" r="3.2"/><path d="m19.3 19.3 2.2 2.2"/>'
    },
    {
      id: "uebungsaufgaben",
      title: "Übungsaufgaben",
      short: "Aufgaben-Generator mit Lösungen",
      description: "Übungsaufgaben zu Wirtschaftlichkeit, PV-Technik und -Ertrag, Wärmepumpe, Lastgang, Verträgen und Betriebskosten – mit Schaltplänen, Diagrammen, Varianten je Prüfling und Musterlösung.",
      categories: ["ausbildung"],
      norms: "Azubis · Verwaltung · Technik · Studium",
      accent: "#6f4fb8",
      icon: '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M10 12h6M10 16h4"/><path d="m3.5 9 1.5 1.5L8 7.5" transform="translate(0 2)"/>'
    },
    {
      id: "pv-rechner",
      title: "PV-Rechner",
      short: "PV-Anlagenrechner",
      description: "Stündliche Ertragssimulation, Wechselrichter- und Stringauslegung, Speicher und Wirtschaftlichkeit von PV-Anlagen.",
      categories: ["energie", "anlagen", "wirtschaft"],
      norms: "DIN VDE 0100-712 · EEG 2026 · VDE-AR-N 4105",
      accent: "#c7780a",
      icon: '<circle cx="12" cy="6" r="2.5"/><path d="M12 1.5v1M16.5 6h1M6.5 6h1M15.2 2.8l-.7.7M8.8 2.8l.7.7"/><path d="M3 21 6 11h12l3 10Z"/><path d="M4.5 16h15M12 11v10M9 11l-1.5 10M15 11l1.5 10"/>'
    },
    {
      id: "ladeplanung",
      title: "Ladesäulenplanung",
      short: "Ladeinfrastruktur simulieren",
      description: "Ladevorgänge je Nutzergruppe im Viertelstundentakt, Lastmanagement, PV und Speicher, Stromverkauf (z. B. ativo), Amortisation sowie technische Herausforderungen mit Lösungen.",
      categories: ["energie", "anlagen", "wirtschaft"],
      norms: "GEIG · AFIR · § 14a EnWG · DIN VDE 0100-722",
      accent: "#0f7a6b",
      icon: '<rect x="4" y="3" width="9" height="18" rx="1.5"/><path d="M6.5 6.5h4v3h-4z"/><path d="m9.5 12-1.8 3h2l-.8 3"/><path d="M13 8h2.5a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8"/>'
    },
    {
      id: "lastgang",
      title: "Lastgang-Analyse",
      short: "¼-h-Lastgänge auswerten",
      description: "Lastgang aus CSV oder Excel einlesen: Kennzahlen, Dauerlinie, Teppichdiagramm, Typtage, Grundlast und Lastspitzenkappung mit Speicherauslegung.",
      categories: ["energie", "wirtschaft"],
      norms: "RLM-Lastgang · Benutzungsdauer · § 19 StromNEV",
      accent: "#23807d",
      icon: '<path d="M3 20h18"/><path d="M3 16l3-5 3 3 3-8 3 6 2-3 4 4"/><path d="M3 4v16"/>'
    },
    {
      id: "wp-brennwert",
      title: "WP vs. Brennwert",
      short: "Wärmepumpen-Simulation",
      description: "Stündliche Jahressimulation Wärmepumpe gegen Gas-Brennwertkessel: Heizkurve, Bivalenz, COP, Wärmekosten und Wirtschaftlichkeit.",
      categories: ["energie", "anlagen", "wirtschaft"],
      norms: "DIN EN 14825 · BEG · CO₂-Preis",
      accent: "#b3412f",
      icon: '<rect x="3" y="4" width="10" height="16" rx="1.5"/><circle cx="8" cy="10" r="3"/><path d="M8 7v6M5 10h6"/><path d="M17 18c-1.5-1.5-1.5-3 0-4.5s1.5-3 0-4.5M20.5 18c-1.5-1.5-1.5-3 0-4.5s1.5-3 0-4.5"/>'
    }
  ]
};
