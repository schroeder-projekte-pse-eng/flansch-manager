-- ═══════════════════════════════════════════════════════════════════════════════
-- Werkzeugdaten-Update: Bolttensioning-Drücke, Werkzeuge & Vorspannkraft
-- Quelle: IMS-0320205_2026-09-28 – Vorspannwerkzeuge EKB (SRT)
--
-- Ausführung: Supabase-Dashboard → SQL-Editor → Ausführen
--
-- HINWEIS Matching:
--   druckstufe ILIKE '%900%'  → matcht "900 lbs", "#900", "CL900", "ANSI 900" …
--   druckstufe ILIKE '%1500%' → matcht "1500 lbs", "#1500", "CL1500" …
--   Passen Sie den Ausdruck an Ihre vorhandenen druckstufe-Werte an.
--
-- Kolbenflächen der SRT-Werkzeuge (EKB):
--   SRT-1 =  1 867 mm² =  18,67 cm²
--   SRT-2 =  3 001 mm² =  30,01 cm²
--   SRT-3 =  4 401 mm² =  44,01 cm²
--   SRT-4 =  6 668 mm² =  66,68 cm²
--   SRT-5 = 10 003 mm² = 100,03 cm²
--   SRT-6 = 16 671 mm² = 166,71 cm²
--
-- Vorspannkraft [kN/Bolzen] = Bolt Stress [N/mm²] × Spannungsquerschnitt 8UN [mm²] / 1000
--   Spannungsquerschnitt 8UN: As = π/4 × (d_Zoll − 0,9743/8)² × 645,16 mm²/in²
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── Hilfsfunktion (temporär): Druckstufe normalisieren ─────────────────────
-- Für ein sauberes Format werden alle gefundenen Einträge auf '900 lbs' / '1500 lbs'
-- gesetzt. Kommentieren Sie die druckstufe-Zeile aus, wenn Sie das nicht wollen.

-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  ROHRKLASSE: 900 lbs                                                      ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- DN 100 / 4"  –  SRT-1  –  8 × 1 1/8"-8UN  –  310 N/mm²  –  As = 510 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-1',
  druck_a            = 1275,
  druck_b            = 950,
  bolzen_anzahl      = 8,
  bolzen_durchmesser = '1 1/8"',
  vorspannkraft      = 158   -- 310 × 510 / 1000 = 158,1 kN
WHERE durchmesser = 100
  AND druckstufe ILIKE '%900%';

-- DN 150 / 6"  –  SRT-1  –  12 × 1 1/8"-8UN  –  310 N/mm²  –  As = 510 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-1',
  druck_a            = 1275,
  druck_b            = 950,
  bolzen_anzahl      = 12,
  bolzen_durchmesser = '1 1/8"',
  vorspannkraft      = 158   -- 310 × 510 / 1000 = 158,1 kN
WHERE durchmesser = 150
  AND druckstufe ILIKE '%900%';

-- DN 200 / 8"  –  SRT-2  –  12 × 1 3/8"-8UN  –  290 N/mm²  –  As = 796 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-2',
  druck_a            = 1350,
  druck_b            = 975,
  bolzen_anzahl      = 12,
  bolzen_durchmesser = '1 3/8"',
  vorspannkraft      = 231   -- 290 × 796 / 1000 = 230,8 kN
WHERE durchmesser = 200
  AND druckstufe ILIKE '%900%';

-- DN 250 / 10"  –  SRT-2  –  16 × 1 3/8"-8UN  –  300 N/mm²  –  As = 796 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-2',
  druck_a            = 1375,
  druck_b            = 975,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '1 3/8"',
  vorspannkraft      = 239   -- 300 × 796 / 1000 = 238,8 kN
WHERE durchmesser = 250
  AND druckstufe ILIKE '%900%';

-- DN 300 / 12"  –  SRT-2  –  20 × 1 3/8"-8UN  –  303 N/mm²  –  As = 796 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-2',
  druck_a            = 1350,
  druck_b            = 950,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '1 3/8"',
  vorspannkraft      = 241   -- 303 × 796 / 1000 = 241,2 kN
WHERE durchmesser = 300
  AND druckstufe ILIKE '%900%';

-- DN 350 / 14"  –  SRT-3  –  20 × 1 1/2"-8UN  –  300 N/mm²  –  As = 963 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-3',
  druck_a            = 1150,
  druck_b            = 775,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '1 1/2"',
  vorspannkraft      = 289   -- 300 × 963 / 1000 = 288,9 kN
WHERE durchmesser = 350
  AND druckstufe ILIKE '%900%';

-- DN 400 / 16"  –  SRT-4  –  20 × 1 5/8"-8UN  –  310 N/mm²  –  As = 1145 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-4',
  druck_a            = 960,
  druck_b            = 615,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '1 5/8"',
  vorspannkraft      = 355   -- 310 × 1145 / 1000 = 355,0 kN
WHERE durchmesser = 400
  AND druckstufe ILIKE '%900%';

-- DN 450 / 18"  –  SRT-4  –  20 × 1 7/8"-8UN  –  300 N/mm²  –  As = 1558 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-4',
  druck_a            = 1190,
  druck_b            = 825,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '1 7/8"',
  vorspannkraft      = 467   -- 300 × 1558 / 1000 = 467,4 kN
WHERE durchmesser = 450
  AND druckstufe ILIKE '%900%';

-- DN 500 / 20"  –  SRT-4  –  20 × 2"-8UN  –  300 N/mm²  –  As = 1788 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-4',
  druck_a            = 1225,
  druck_b            = 875,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '2"',
  vorspannkraft      = 536   -- 300 × 1788 / 1000 = 536,4 kN
WHERE durchmesser = 500
  AND druckstufe ILIKE '%900%';

-- DN 600 / 24"  –  SRT-5  –  20 × 2 1/2"-8UN  –  280 N/mm²  –  As = 2867 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-5',
  druck_a            = 1325,
  druck_b            = 975,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '2 1/2"',
  vorspannkraft      = 803   -- 280 × 2867 / 1000 = 802,8 kN
WHERE durchmesser = 600
  AND druckstufe ILIKE '%900%';

-- DN 750 / 30"  –  SRT-6  –  20 × 3"-8UN  –  263 N/mm²  –  As = 4200 mm²
UPDATE flanschen SET
  druckstufe         = '900 lbs',
  werkzeug           = 'SRT-6',
  druck_a            = 1130,
  druck_b            = 825,
  bolzen_anzahl      = 20,
  bolzen_durchmesser = '3"',
  vorspannkraft      = 1105  -- 263 × 4200 / 1000 = 1104,6 kN
WHERE durchmesser = 750
  AND druckstufe ILIKE '%900%';


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  ROHRKLASSE: 1500 lbs                                                     ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- DN 65 / 2 1/2"  –  SRT-1  –  8 × 1"-8UN  –  335 N/mm²  –  As = 391 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-1',
  druck_a            = 1175,
  druck_b            = 825,
  bolzen_anzahl      = 8,
  bolzen_durchmesser = '1"',
  vorspannkraft      = 131   -- 335 × 391 / 1000 = 130,9 kN
WHERE durchmesser = 65
  AND druckstufe ILIKE '%1500%';

-- DN 80 / 3"  –  SRT-1  –  8 × 1 1/8"-8UN  –  325 N/mm²  –  As = 510 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-1',
  druck_a            = 1275,
  druck_b            = 925,
  bolzen_anzahl      = 8,
  bolzen_durchmesser = '1 1/8"',
  vorspannkraft      = 166   -- 325 × 510 / 1000 = 165,8 kN
WHERE durchmesser = 80
  AND druckstufe ILIKE '%1500%';

-- DN 100 / 4"  –  SRT-2  –  8 × 1 1/4"-8UN  –  310 N/mm²  –  As = 645 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-2',
  druck_a            = 1250,
  druck_b            = 850,
  bolzen_anzahl      = 8,
  bolzen_durchmesser = '1 1/4"',
  vorspannkraft      = 200   -- 310 × 645 / 1000 = 199,9 kN
WHERE durchmesser = 100
  AND druckstufe ILIKE '%1500%';

-- DN 150 / 6"  –  SRT-2  –  12 × 1 3/8"-8UN  –  310 N/mm²  –  As = 796 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-2',
  druck_a            = 1375,
  druck_b            = 970,
  bolzen_anzahl      = 12,
  bolzen_durchmesser = '1 3/8"',
  vorspannkraft      = 247   -- 310 × 796 / 1000 = 246,8 kN
WHERE durchmesser = 150
  AND druckstufe ILIKE '%1500%';

-- DN 200 / 8"  –  SRT-4  –  12 × 1 5/8"-8UN  –  310 N/mm²  –  As = 1145 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-4',
  druck_a            = 950,
  druck_b            = 600,
  bolzen_anzahl      = 12,
  bolzen_durchmesser = '1 5/8"',
  vorspannkraft      = 355   -- 310 × 1145 / 1000 = 355,0 kN
WHERE durchmesser = 200
  AND druckstufe ILIKE '%1500%';

-- DN 250 / 10"  –  SRT-4  –  12 × 1 7/8"-8UN  –  310 N/mm²  –  As = 1558 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-4',
  druck_a            = 1210,
  druck_b            = 830,
  bolzen_anzahl      = 12,
  bolzen_durchmesser = '1 7/8"',
  vorspannkraft      = 483   -- 310 × 1558 / 1000 = 482,9 kN
WHERE durchmesser = 250
  AND druckstufe ILIKE '%1500%';

-- DN 300 / 12"  –  SRT-4  –  16 × 2"-8UN  –  290 N/mm²  –  As = 1788 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-4',
  druck_a            = 1235,
  druck_b            = 875,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '2"',
  vorspannkraft      = 519   -- 290 × 1788 / 1000 = 518,5 kN
WHERE durchmesser = 300
  AND druckstufe ILIKE '%1500%';

-- DN 350 / 14"  –  SRT-5  –  16 × 2 1/4"-8UN  –  265 N/mm²  –  As = 2296 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-5',
  druck_a            = 1025,
  druck_b            = 700,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '2 1/4"',
  vorspannkraft      = 609   -- 265 × 2296 / 1000 = 608,4 kN
WHERE durchmesser = 350
  AND druckstufe ILIKE '%1500%';

-- DN 400 / 16"  –  SRT-5  –  16 × 2 1/2"-8UN  –  283 N/mm²  –  As = 2867 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-5',
  druck_a            = 1325,
  druck_b            = 975,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '2 1/2"',
  vorspannkraft      = 811   -- 283 × 2867 / 1000 = 811,4 kN
WHERE durchmesser = 400
  AND druckstufe ILIKE '%1500%';

-- DN 450 / 18"  –  SRT-6  –  16 × 2 3/4"-8UN  –  275 N/mm²  –  As = 3502 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-6',
  druck_a            = 975,
  druck_b            = 675,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '2 3/4"',
  vorspannkraft      = 963   -- 275 × 3502 / 1000 = 962,9 kN
WHERE durchmesser = 450
  AND druckstufe ILIKE '%1500%';

-- DN 500 / 20"  –  SRT-6  –  16 × 3"-8UN  –  275 N/mm²  –  As = 4200 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-6',
  druck_a            = 1130,
  druck_b            = 775,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '3"',
  vorspannkraft      = 1155  -- 275 × 4200 / 1000 = 1154,9 kN
WHERE durchmesser = 500
  AND druckstufe ILIKE '%1500%';

-- DN 600 / 24"  –  SRT-6  –  16 × 3 1/2"-8UN  –  250 N/mm²  –  As = 5784 mm²
UPDATE flanschen SET
  druckstufe         = '1500 lbs',
  werkzeug           = 'SRT-6',
  druck_a            = 1360,
  druck_b            = 980,
  bolzen_anzahl      = 16,
  bolzen_durchmesser = '3 1/2"',
  vorspannkraft      = 1446  -- 250 × 5784 / 1000 = 1446,0 kN
WHERE durchmesser = 600
  AND druckstufe ILIKE '%1500%';
