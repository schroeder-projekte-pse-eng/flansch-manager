// Warehouse inventory data embedded from ReportOutput CSV (MECHANISCH category)
// Rows with Lagerplatz = "Temp" are excluded. Only one entry per MC is kept
// (the real shelf location with highest available stock; fallback to 00-99-99).
// Update this file whenever a new inventory export is available.

export interface MatchResult {
  mc: string;
  lagerplatz: string;
  artikelName: string;
  hatBestand: boolean;
  naechsteGroessere?: boolean; // true when bolt length was rounded up
}

// ── Bolt inventory (pre-parsed from CSV names) ────────────────────────────────

interface BolzenEintrag {
  mc: string;
  durchmesser: string;   // exactly as stored in flanschen.bolzen_durchmesser, e.g. "7/8", "1 1/4"
  laenge: number;        // mm
  material: 'VA' | 'Zinklamelle';
  lagerplatz: string;
  verfuegbar: number;
  artikelName: string;
}

const BOLZEN: BolzenEintrag[] = [
  // ── VA ──────────────────────────────────────────────────────────────────────
  { mc: '5403', durchmesser: '1/2',   laenge: 100, material: 'VA',          lagerplatz: '21-02-12',    verfuegbar: 40,  artikelName: 'Schraubenbolzen 1/2 x 100 mm 2 x Mu VA' },
  { mc: '5329', durchmesser: '7/8',   laenge: 125, material: 'VA',          lagerplatz: '21-03-20',    verfuegbar: 214, artikelName: 'Schraubenbolzen 7/8 x 125 mm 2 x Mu VA (AS20)' },
  { mc: '5332', durchmesser: '7/8',   laenge: 190, material: 'VA',          lagerplatz: '21-02-12',    verfuegbar: 14,  artikelName: 'Schraubenbolzen 7/8 x 190 mm 2 Mu VA' },
  { mc: '5327', durchmesser: '1 1/8', laenge: 230, material: 'VA',          lagerplatz: '21-03-12',    verfuegbar: 46,  artikelName: 'Schraubenbolzen 1 1/8 x 230 mm 2 x Mu VA' },
  { mc: '5328', durchmesser: '1 1/8', laenge: 260, material: 'VA',          lagerplatz: '21-03-12',    verfuegbar: 22,  artikelName: 'Schraubenbolzen 1 1/8 x 260 mm 2 x Mu VA' },
  { mc: '5404', durchmesser: '1 1/4', laenge: 250, material: 'VA',          lagerplatz: '21-03-14',    verfuegbar: 80,  artikelName: 'Schraubenbolzen 1 1/4 x 250 mm 2 x Mu VA' },
  // ── Zinklamelle ─────────────────────────────────────────────────────────────
  { mc: '5392', durchmesser: '1/2',   laenge: 70,  material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1/2 x 70 mm 2 x Mu Zinklamelle' },
  { mc: '5393', durchmesser: '1/2',   laenge: 100, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar: 129, artikelName: 'Schraubenbolzen 1/2 x 100 mm 2 x Mu Zinklamelle' },
  { mc: '5479', durchmesser: '5/8',   laenge: 80,  material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 5/8 x 80 mm 2 x Mu Zinklamelle' },
  { mc: '5394', durchmesser: '5/8',   laenge: 100, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 5/8 x 100 mm 2 x Mu Zinklamelle' },
  { mc: '5356', durchmesser: '3/4',   laenge: 105, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 40,  artikelName: 'Schraubenbolzen 3/4 x 105mm 2 x Mu Zinklamelle' },
  { mc: '5357', durchmesser: '7/8',   laenge: 130, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar: 295, artikelName: 'Schraubenbolzen 7/8 x 130mm 2 x Mu Zinklamelle' },
  { mc: '5395', durchmesser: '7/8',   laenge: 170, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar: 53,  artikelName: 'Schraubenbolzen 7/8 x 170 mm 2 x Mu Zinklamelle' },
  { mc: '5367', durchmesser: '7/8',   laenge: 220, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar: 58,  artikelName: 'Schraubenbolzen 7/8 x 220 mm 2 x Mu Zinklamelle' },
  { mc: '5396', durchmesser: '1',     laenge: 170, material: 'Zinklamelle', lagerplatz: '21-04-17',    verfuegbar: 74,  artikelName: 'Schraubenbolzen 1 x 170 mm 2 x Mu Zinklamelle' },
  { mc: '5375', durchmesser: '1',     laenge: 180, material: 'Zinklamelle', lagerplatz: '21-04-17',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1 x 180mm 2 x Mu Zinklamelle' },
  { mc: '5377', durchmesser: '1 1/8', laenge: 180, material: 'Zinklamelle', lagerplatz: '22-03-10',    verfuegbar: 49,  artikelName: 'Schraubenbolzen 1 1/8 x 180mm 2 x Mu Zinklamelle' },
  { mc: '5224', durchmesser: '1 1/8', laenge: 220, material: 'Zinklamelle', lagerplatz: '22-03-10',    verfuegbar: 48,  artikelName: 'Schraubenbolzen 1 1/8 x 220 mm 2 x Mu Zinklamelle' },
  { mc: '5372', durchmesser: '1 1/8', laenge: 260, material: 'Zinklamelle', lagerplatz: '22-03-10',    verfuegbar: 9,   artikelName: 'Schraubenbolzen 1 1/8 x 260 mm 2 x Mu Zinklamelle' },
  { mc: '5360', durchmesser: '1 1/4', laenge: 230, material: 'Zinklamelle', lagerplatz: '21-07-20',    verfuegbar: 32,  artikelName: 'Schraubenbolzen 1 1/4 x 230mm 2 x Mu Zinklamelle' },
  { mc: '5361', durchmesser: '1 1/4', laenge: 285, material: 'Zinklamelle', lagerplatz: '21-07-20',    verfuegbar: 72,  artikelName: 'Schraubenbolzen 1 1/4 x 285mm 2 x Mu Zinklamelle' },
  { mc: '5480', durchmesser: '1 3/8', laenge: 150, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1 3/8 x 150 mm 2 x Mu Zinklamelle' },
  { mc: '5358', durchmesser: '1 3/8', laenge: 210, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1 3/8 x 210mm 2 x Mu Zinklamelle' },
  { mc: '5359', durchmesser: '1 3/8', laenge: 270, material: 'Zinklamelle', lagerplatz: '22-03-08',    verfuegbar: 20,  artikelName: 'Schraubenbolzen 1 3/8 x 270mm 2 x Mu Zinklamelle' },
  { mc: '5376', durchmesser: '1 3/8', laenge: 330, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1 3/8 x 330mm 2 x Mu Zinklamelle' },
  { mc: '5378', durchmesser: '1 3/8', laenge: 400, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1 3/8 x 400mm 2 x Mu Zinklamelle' },
  { mc: '5229', durchmesser: '1 5/8', laenge: 330, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar: 0,   artikelName: 'Schraubenbolzen 1 5/8 x 330 mm o. Mu Zinklamelle' },
  { mc: '5227', durchmesser: '1 5/8', laenge: 370, material: 'Zinklamelle', lagerplatz: '21-04-21',    verfuegbar: 146, artikelName: 'Schraubenbolzen 1 5/8 x 370 mm 2 x Mu Zinklamelle' },
  { mc: '5390', durchmesser: '1 7/8', laenge: 420, material: 'Zinklamelle', lagerplatz: '22-04-09',    verfuegbar: 100, artikelName: 'Schraubenbolzen 1 7/8 x 420 2 x Mu Zinklamelle' },
  { mc: '5374', durchmesser: '1 7/8', laenge: 430, material: 'Zinklamelle', lagerplatz: '22-03-11',    verfuegbar: 77,  artikelName: 'Schraubenbolzen 1 7/8 x 430 mm 2 x Mu Zinklamelle' },
  { mc: '5363', durchmesser: '2 1/2', laenge: 530, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 60,  artikelName: 'Schraubenbolzen 2 1/2 x 530mm 2 x Mu Zinklamelle' },
  { mc: '5373', durchmesser: '2 1/2', laenge: 650, material: 'Zinklamelle', lagerplatz: '22-01-10',    verfuegbar: 60,  artikelName: 'Schraubenbolzen 2 1/2 x 650mm 2 x Mu Zinklamelle' },
  { mc: '5379', durchmesser: '2 1/2', laenge: 670, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 78,  artikelName: 'Schraubenbolzen 2 1/2 x 670mm 2 x Mu Zinklamelle' },
  { mc: '5381', durchmesser: '2 1/2', laenge: 750, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 30,  artikelName: 'Schraubenbolzen 2 1/2 x 750mm 2 x Mu Zinklamelle' },
  { mc: '5400', durchmesser: '3',     laenge: 590, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 104, artikelName: 'Schraubenbolzen 3 x 590mm 2 x Mu Zinklamelle' },
  { mc: '5364', durchmesser: '3',     laenge: 700, material: 'Zinklamelle', lagerplatz: '22-01-13',    verfuegbar: 8,   artikelName: 'Schraubenbolzen 3 x 700mm 2 x Mu Zinklamelle' },
  { mc: '5365', durchmesser: '3 1/2', laenge: 700, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 8,   artikelName: 'Schraubenbolzen 3 1/2 x 700mm 2 x Mu Zinklamelle' },
  { mc: '5366', durchmesser: '3 1/2', laenge: 740, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 37,  artikelName: 'Schraubenbolzen 3 1/2 x 740mm 2 x Mu Zinklamelle' },
];

// ── Gasket inventory (pre-parsed from CSV names) ──────────────────────────────

interface DichtungEintrag {
  mc: string;
  rNummer: string;             // ring number, e.g. "24", "102"
  form: 'Octagonal' | 'Oval';
  material: 'VA' | 'WE' | null; // null = no material specified in name
  lagerplatz: string;
  verfuegbar: number;
  artikelName: string;
}

const DICHTUNGEN: DichtungEintrag[] = [
  { mc: '5349', rNummer: '24',  form: 'Oval',      material: 'VA', lagerplatz: '22-03-18', verfuegbar: 11, artikelName: 'Dichtung RTJ R 24 oval VA' },
  { mc: '5399', rNummer: '102', form: 'Octagonal', material: null, lagerplatz: '22-01-20', verfuegbar: 8,  artikelName: 'Dichtung R 102 Octagonal' },
];

// ── Mapping helpers ───────────────────────────────────────────────────────────

function getBolzenMaterialKw(bolzenMaterial: string): 'VA' | 'Zinklamelle' | null {
  const m = bolzenMaterial.trim();
  if (/A\s*193/i.test(m)) return 'VA';
  if (/A\s*320/i.test(m)) return 'Zinklamelle';
  return null;
}

function extractRNummer(dichtungsTyp: string): string | null {
  const m = dichtungsTyp.match(/R\s*(\d+)/i);
  return m ? m[1] : null;
}

// ── Public matching API ───────────────────────────────────────────────────────

/**
 * Find the warehouse item for a bolt (Schraubenbolzen).
 * If the exact length is not in inventory, returns the next longer bolt of
 * the same diameter and material (naechsteGroessere = true).
 */
export function matchBolzen(
  durchmesser: string,
  laenge: number,
  bolzenMaterial: string
): MatchResult | null {
  const matKw = getBolzenMaterialKw(bolzenMaterial);

  const kandidaten = BOLZEN.filter(
    b => b.durchmesser === durchmesser && (matKw === null || b.material === matKw)
  );
  if (kandidaten.length === 0) return null;

  // 1) Exact length match
  const exact = kandidaten.find(b => b.laenge === laenge);
  if (exact) {
    return {
      mc: exact.mc,
      lagerplatz: exact.lagerplatz,
      artikelName: exact.artikelName,
      hatBestand: exact.verfuegbar > 0,
    };
  }

  // 2) Next longer
  const longer = kandidaten
    .filter(b => b.laenge > laenge)
    .sort((a, b) => a.laenge - b.laenge)[0];

  if (longer) {
    return {
      mc: longer.mc,
      lagerplatz: longer.lagerplatz,
      artikelName: longer.artikelName,
      hatBestand: longer.verfuegbar > 0,
      naechsteGroessere: true,
    };
  }

  return null;
}

/**
 * Find the warehouse item for a gasket (Dichtring).
 * Material is derived from bolzenMaterial (A 193 → VA, else WE).
 * Shape: prefer Octagonal, fall back to Oval (unless dichtungsTyp overrides).
 */
export function matchDichtung(
  dichtungsTyp: string,
  bolzenMaterial: string
): MatchResult | null {
  const rNummer = extractRNummer(dichtungsTyp);
  if (!rNummer) return null;

  const isVA = /A\s*193/i.test(bolzenMaterial);
  const matKw: 'VA' | 'WE' = isVA ? 'VA' : 'WE';

  // Shape override from dichtungsTyp text
  const forceOctagonal = /oktagonal|octagonal/i.test(dichtungsTyp);
  const forceOval      = /oval/i.test(dichtungsTyp);

  // Candidates: same R-number AND (matching material OR no material specified)
  const kandidaten = DICHTUNGEN.filter(
    d => d.rNummer === rNummer && (d.material === matKw || d.material === null)
  );

  // Fallback: if nothing matches with material, try ignoring material
  const pool = kandidaten.length > 0
    ? kandidaten
    : DICHTUNGEN.filter(d => d.rNummer === rNummer);

  if (pool.length === 0) return null;

  let match: DichtungEintrag | undefined;
  if (forceOctagonal) {
    match = pool.find(d => d.form === 'Octagonal');
  } else if (forceOval) {
    match = pool.find(d => d.form === 'Oval');
  } else {
    match = pool.find(d => d.form === 'Octagonal') ?? pool.find(d => d.form === 'Oval');
  }

  if (!match) return null;

  return {
    mc: match.mc,
    lagerplatz: match.lagerplatz,
    artikelName: match.artikelName,
    hatBestand: match.verfuegbar > 0,
  };
}
