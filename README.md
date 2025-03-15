# Solarrechner

## Beschreibung
Der **Solarrechner** ist eine Webanwendung zur Berechnung der Rentabilität von Photovoltaikanlagen. Nutzer können ihre individuellen Daten eingeben, um detaillierte Berechnungen zu Energieerzeugung, Kosteneinsparungen und Amortisationszeiträumen zu erhalten. Das Backend nutzt Supabase für die Benutzer-Authentifizierung und Datenverwaltung. Die Anwendung bietet sowohl eine vollständige Registrierung als auch einen anonymen Zugang.

## Live-Demo 
Testen Sie den Solarrechner direkt in Ihrem Browser:
[Solarrechner Demo](https://julius1111.github.io/Photovoltaikrechner/)

## Features
- **Benutzer-Authentifizierung:**
  - Registrierung und Login per E-Mail und Passwort für die Speicherung Ihrer Berechnungen.
  - Anonymer Login für schnelle Nutzung ohne Registrierung.

- **Umfassende Rentabilitätsberechnung:**
  - Erfassung von Anlagenkosten, Leistungsdaten, Strompreisen und Betriebskosten.
  - Berechnung der jährlichen Erträge unter Berücksichtigung von Eigenverbrauch und Einspeisung.
  - Präzise Ermittlung des Amortisationszeitraums und der langfristigen Rendite.

- **Dynamische Visualisierungen:**
  - Interaktive Diagramme zur Darstellung der finanziellen Entwicklung über die Lebensdauer der Anlage.
  - Übersichtliche Visualisierung von Einnahmen, Ausgaben und Gewinnschwelle.

- **Supabase-Integration:**
  - Sichere Verwaltung von Benutzerkonten und Datenspeicherung.
  - Unterstützung von anonymen Sitzungen für datenschutzorientierte Nutzung.
  - Edge Functions für den Zugriff auf die PVGIS API (Photovoltaic Geographical Information System) der Europäischen Kommission.

## Technologiestack
- **Frontend:**
  - React.js: Modernes JavaScript-Framework für die responsive Benutzeroberfläche.
  - Recharts: Leistungsstarke Bibliothek zur Erstellung interaktiver Diagramme.

- **Backend:**
  - Supabase:
    - Authentifizierungssystem mit mehreren Anmeldeoptionen
    - Relationale Datenbank für die Speicherung von Benutzerberechnungen
    - Serverlose Funktionen für die Kommunikation mit externen Diensten

## Nutzung
1. Öffnen Sie die [Solarrechner-Demo](https://julius1111.github.io/Photovoltaikrechner/).
2. Wählen Sie zwischen Registrierung oder anonymem Login.
3. Geben Sie Ihre Anlagenparameter ein:
   - Anlagen Standort
   - Installationskosten
   - Leistung in kWp
   - Ausrichtung und Neigung
   - Aktuelle Stromkosten
5. Prüfen Sie die berechneten Werte und Diagramme zur Rentabilität.
6. Bei Bedarf können Sie verschiedene Szenarien vergleichen oder Ihre Berechnungen speichern.

## Lizenz
Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.
