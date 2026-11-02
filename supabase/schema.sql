-- ── Tabellen ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projekte (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  beschreibung TEXT NOT NULL DEFAULT '',
  erstellt_am  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projekt_flanschen (
  id               BIGSERIAL PRIMARY KEY,
  projekt_id       BIGINT NOT NULL REFERENCES projekte(id) ON DELETE CASCADE,
  flansch_id       BIGINT NOT NULL REFERENCES flanschen(id) ON DELETE CASCADE,
  hinzugefuegt_am  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (projekt_id, flansch_id)
);

CREATE TABLE IF NOT EXISTS status_historie (
  id               BIGSERIAL PRIMARY KEY,
  flansch_id       BIGINT NOT NULL REFERENCES flanschen(id) ON DELETE CASCADE,
  von_status       TEXT NOT NULL,
  nach_status      TEXT NOT NULL,
  bauleiter        TEXT,
  flansch_manager  TEXT,
  pruefdruck1      NUMERIC,
  pruefdruck2      NUMERIC,
  pruefdruck3      NUMERIC,
  pruef_ergebnis1  TEXT,
  pruef_ergebnis2  TEXT,
  pruef_ergebnis3  TEXT,
  zeitstempel      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── RLS aktivieren ────────────────────────────────────────────────────────────

ALTER TABLE projekte         ENABLE ROW LEVEL SECURITY;
ALTER TABLE projekt_flanschen ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_historie  ENABLE ROW LEVEL SECURITY;

-- ── Policies: voller Zugriff für anonyme Nutzer ───────────────────────────────

-- flanschen (Schreibrechte ergänzen – SELECT-Policy wurde bereits angelegt)
CREATE POLICY "anon insert flanschen"  ON flanschen FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon update flanschen"  ON flanschen FOR UPDATE TO anon USING (true);
CREATE POLICY "anon delete flanschen"  ON flanschen FOR DELETE TO anon USING (true);

-- projekte
CREATE POLICY "anon select projekte"   ON projekte FOR SELECT TO anon USING (true);
CREATE POLICY "anon insert projekte"   ON projekte FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon update projekte"   ON projekte FOR UPDATE TO anon USING (true);
CREATE POLICY "anon delete projekte"   ON projekte FOR DELETE TO anon USING (true);

-- projekt_flanschen
CREATE POLICY "anon select pf"         ON projekt_flanschen FOR SELECT TO anon USING (true);
CREATE POLICY "anon insert pf"         ON projekt_flanschen FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon delete pf"         ON projekt_flanschen FOR DELETE TO anon USING (true);

-- status_historie
CREATE POLICY "anon select sh"         ON status_historie FOR SELECT TO anon USING (true);
CREATE POLICY "anon insert sh"         ON status_historie FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon delete sh"         ON status_historie FOR DELETE TO anon USING (true);
