# Solarrechner

## Beschreibung

Der **Solarrechner** ist eine Webanwendung zur Berechnung der Rentabilität einer Solaranlage. Nutzer können ihre Daten eingeben, um eine Berechnung der Einsparungen, Energieerzeugung und des Amortisationszeitraums zu erhalten. Das Backend verwendet Supabase für Benutzer-Authentifizierung und Datenverwaltung. Es gibt die Möglichkeit, sich entweder mit E-Mail und Passwort zu authentifizieren oder anonym einzuloggen.

## Live-Demo 

Sie können den Solarrechner unter folgendem Link testen:
[Solarrechner Demo](https://julius1111.github.io/Photovoltaikrechner/)

## Features

- **Benutzer-Authentifizierung:**
  - Registrierung und Login per E-Mail und Passwort.
  - Anonymer Login, um die Anwendung ohne Registrierung zu nutzen.
- **Berechnung der Rentabilität:**
  - Benutzer können Angaben zu den Kosten, der Energieerzeugung und den Betriebskosten einer Solaranlage machen.
  - Das System zeigt die jährlichen Erträge und den Amortisationszeitraum an.
- **Dynamische Diagramme:**
  - Visualisierung der Renditen über die Zeit.
  - Interaktive Charts mit der Recharts-Bibliothek.
- **Supabase-Integration:**
  - Verwaltung von Benutzerkonten und Datenspeicherung.
  - Unterstützung von anonymen Sitzungen.

## Technologiestack

- **Frontend:**
  - React.js: Hauptframework für die Benutzeroberfläche.
  - Recharts: Bibliothek zur Darstellung dynamischer Diagramme.
- **Backend:**
  - Supabase: Für Authentifizierung und Echtzeit-Datenverwaltung.

## Installation

### Voraussetzungen

Stelle sicher, dass du folgende Programme installiert hast:
- **Node.js** (Version 16+ empfohlen)
- **npm** (Node Package Manager, kommt mit Node.js)
- **Supabase-Konto** (für die API-Schlüssel und Datenbank-Einstellungen)

### Einrichtung

1. **Repository klonen:**
   ```bash
   git clone https://github.com/deinbenutzername/solarrechner.git
   cd solarrechner
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen einrichten:**
   Erstelle eine `.env`-Datei im Hauptverzeichnis und füge die folgenden Schlüssel mit deinen Supabase-Projekt-Details hinzu:
   ```
   REACT_APP_SUPERBASE_URL=dein-supabase-url
   REACT_APP_ANON_KEY=dein-supabase-anon-key
   ```

4. **Entwicklungsserver starten:**
   ```bash
   npm start
   ```
   Die Anwendung wird lokal unter `http://localhost:3000` ausgeführt.

## Bereitstellung

Um die Anwendung für die Produktion zu bauen und auf GitHub Pages bereitzustellen, führe folgende Befehle aus:

```bash
npm run build
npm run deploy
```

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.
