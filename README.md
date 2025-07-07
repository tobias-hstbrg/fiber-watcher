# Fiber-Watcher 🌐

[English](#english) | [Deutsch](#deutsch)

---
## Deutsch

### Übersicht
Fiber-Watcher ist ein automatisierter Bot, das den Fortschritt des Glasfaserausbaus in der Stadt Radevormwald, Nordrhein-Westfalen, verfolgt. Der Bot überwacht kontinuierlich die offizielle Stadtwebsite auf Updates zum Glasfaser-Infrastrukturprojekt und sendet E-Mail-Benachrichtigungen bei neuen Informationen.

### Funktionen
- **Automatisiertes Web Scraping**: Überwacht die offizielle Radevormwald Glasfaser-Projektseite
- **Cluster-basierte Überwachung**: Verfolgt Updates in verschiedenen Entwicklungsclustern/Bereichen
- **E-Mail-Benachrichtigungen**: Sendet formatierte HTML-E-Mails mit Projektupdates
- **Inhalts-Caching**: Verhindert doppelte Benachrichtigungen durch Nachverfolgung vorheriger Inhalte
- **Vollständige Artikel-Abrufung**: Ruft komplette Artikelinhalte bei "Weiterlesen"-Links ab

### Eingebundene Dienste

#### Web Scraping & Parsing
- **Axios**: HTTP-Client zum Abrufen von Webseiten
- **Cheerio**: Server-seitige jQuery-Implementierung für HTML-Parsing und DOM-Manipulation

#### E-Mail-Service
- **Mailgun**: E-Mail-Versanddienst für Benachrichtigungen
- **Form-data**: Behandelt Multipart-Formulardaten für Mailgun API-Integration

#### Datenverwaltung
- **Lokales Dateisystem**: JSON-basiertes Caching-System zur Nachverfolgung von Inhaltsänderungen
- **Umgebungsvariablen**: Sichere Konfigurationsverwaltung über dotenv

### Github-Actions
Das Projekt verwendet Github Actions um das Repo zu bauen und zu festgelegten intervallen auszuführen. Dabei wird eine Cache Datei zwischengespeichert, damit verfolgt werden kann welche Nachrichten zum Glasfaserausbau bereits bekannt sind und über diese schon eine Benachrichtigung stattgefunden hat. Falls beim scrapen eine Nachricht gefunden wird, welche noch nicht im Cache steht schickt Mailgun eine formatierte Email mit Benachrichtigungen an die in der `.env` angegebenen Email-Adressen.

### Technischer Stack
- **Sprache**: TypeScript
- **Laufzeitumgebung**: Node.js
- **Build-Tool**: TypeScript Compiler
- **Entwicklung**: ts-node für Entwicklungsausführung

### Einrichtung & Konfiguration
1. Abhängigkeiten installieren: `npm install`
2. Umgebungsvariablen konfigurieren (siehe `.env.example`)
3. Anwendung ausführen: `npm start`
4. E-Mail-Funktionalität testen: `npm run test:mail`

### Umgebungsvariablen
- `MAILGUN_API_KEY`: Ihr Mailgun API-Schlüssel
- `MAILGUN_DOMAIN`: Ihre Mailgun-Domain
- `MAILGUN_FROM`: Ihr Mailgun Absender bsp. `FiberWatcher <bot@mailgundomain>`
- `MAILGUN_TO`: Komma-getrennte Liste der E-Mail-Empfängeradressen

---

## English

### Overview
Fiber-Watcher is an automated bot that tracks the progress of fiber optic expansion in the city of Radevormwald, North Rhine-Westphalia, Germany. The bot continuously monitors the official city website for updates on the fiber infrastructure project and sends email notifications when new information is available.

### Features
- **Automated Web Scraping**: Monitors the official Radevormwald fiber project page
- **Cluster-based Monitoring**: Tracks updates in different development clusters/areas
- **Email Notifications**: Sends formatted HTML emails with project updates
- **Content Caching**: Prevents duplicate notifications by tracking previously sent content
- **Full Article Fetching**: Retrieves complete article content when "read more" links are available

### Integrated Services

#### Web Scraping & Parsing
- **Axios**: HTTP client for fetching web pages
- **Cheerio**: Server-side jQuery implementation for HTML parsing and DOM manipulation

#### Email Service
- **Mailgun**: Email delivery service for notifications
- **Form-data**: Handles multipart form data for Mailgun API integration

#### Data Management
- **Local File System**: JSON-based caching system to track content changes
- **Environment Variables**: Secure configuration management via dotenv

### Github Actions
The project uses Github Actions to build the repository and execute it at scheduled intervals. A cache file is stored to keep track of which fiber expansion news items are already known and have already triggered a notification. If a new message is found during scraping that is not yet in the cache, Mailgun sends a formatted email notification to the email addresses specified in the `.env` file.

### Technical Stack
- **Language**: TypeScript
- **Runtime**: Node.js
- **Build Tool**: TypeScript Compiler
- **Development**: ts-node for development execution

### Setup & Configuration
1. Install dependencies: `npm install`
2. Configure environment variables (see `.env.example`)
3. Run the application: `npm start`
4. Test email functionality: `npm run test:mail`

### Environment Variables
- `MAILGUN_API_KEY`: Your Mailgun API key
- `MAILGUN_DOMAIN`: Your Mailgun domain
- `MAILGUN_FROM`: Your Mailgun sender, e.g. `FiberWatcher <bot@mailgundomain>`
- `MAILGUN_TO`: Comma-separated list of recipient email addresses
