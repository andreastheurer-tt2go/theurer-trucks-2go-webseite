-- TT2GO Ads Reports Schema
-- Tabelle für Wochenberichte aller Werbeplattformen (Google Ads, Meta Ads, ...)

CREATE TABLE IF NOT EXISTS ads_reports (
  id                SERIAL PRIMARY KEY,
  platform          VARCHAR(50)  NOT NULL,           -- 'google_ads' | 'meta_ads'
  week_start        DATE         NOT NULL,
  week_end          DATE         NOT NULL,
  raw_data          JSONB        NOT NULL,           -- Komplette Script-Rohdaten
  ai_report         TEXT         NOT NULL,           -- Claude-generierter Bericht
  slack_message_ts  VARCHAR(50),                      -- Slack-Post-ID (optional)
  created_at        TIMESTAMPTZ  DEFAULT NOW(),
  CONSTRAINT uq_platform_week UNIQUE (platform, week_start)
);

CREATE INDEX IF NOT EXISTS idx_platform_week
  ON ads_reports (platform, week_start DESC);

-- Kommentare zur Dokumentation
COMMENT ON TABLE ads_reports IS 'Wöchentliche Ads-Performance-Berichte aller Plattformen';
COMMENT ON COLUMN ads_reports.platform IS 'Plattform-Bezeichner: google_ads, meta_ads';
COMMENT ON COLUMN ads_reports.raw_data IS 'Komplette Rohdaten vom jeweiligen Script';
COMMENT ON COLUMN ads_reports.ai_report IS 'Claude-generierter Wochenbericht (Slack-Markdown)';
