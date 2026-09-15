-- Neue Spalten für Bolttensioning-Felder
ALTER TABLE flanschen
  ADD COLUMN IF NOT EXISTS werkzeug TEXT,
  ADD COLUMN IF NOT EXISTS druck_a  NUMERIC,
  ADD COLUMN IF NOT EXISTS druck_b  NUMERIC;
