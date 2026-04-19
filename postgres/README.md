# Postgres-Setup auf Hostinger-VPS

## Zweck

Postgres-Datenbank für Ads-Wochenberichte. Wird vom n8n-Workflow `workflow-google-ads-report` befüllt und vom n8n-Workflow `workflow-slack-bot` gelesen.

## Installation auf dem VPS

1. Per SSH auf den VPS verbinden

2. ENV-Variablen in `/root/n8n/.env` (oder wo die docker-compose.yml liegt) ergänzen:
   ```
   TT2GO_POSTGRES_DB=tt2go_reports
   TT2GO_POSTGRES_USER=tt2go
   TT2GO_POSTGRES_PASSWORD=<STARKES_PASSWORT_GENERIEREN>
   ```

   Passwort generieren:
   ```bash
   openssl rand -base64 32
   ```

3. `docker-compose.snippet.yml` Inhalte in die bestehende `docker-compose.yml` einfügen (oben unter `services:`), Volume am Ende hinzufügen.

4. Container starten:
   ```bash
   docker compose up -d tt2go-postgres
   docker compose ps tt2go-postgres    # healthy?
   ```

5. Schema einspielen:
   ```bash
   docker exec -i tt2go-postgres psql -U tt2go -d tt2go_reports < schema.sql
   ```

6. Verifizieren:
   ```bash
   docker exec -it tt2go-postgres psql -U tt2go -d tt2go_reports -c "\dt"
   ```
   Erwartete Ausgabe: Tabelle `ads_reports` ist gelistet.

## n8n Postgres-Credential anlegen

Im n8n-UI → Credentials → "Postgres":

- Host: `tt2go-postgres` (Docker-Network-Hostname)
- Port: `5432`
- Database: `tt2go_reports`
- User: `tt2go`
- Password: aus ENV
- SSL: `disable`
- Name der Credential: `TT2GO Postgres`

## Backup (später)

Für die Zukunft: Tägliche Dumps via cron:
```bash
docker exec tt2go-postgres pg_dump -U tt2go tt2go_reports | gzip > /backups/tt2go_$(date +%F).sql.gz
```
