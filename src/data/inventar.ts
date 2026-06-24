// Warehouse inventory embedded from ReportOutput CSV (MECHANISCH category).
// Temp locations excluded. One entry per MC kept (real shelf with most stock;
// fallback to 00-99-99 if no real location exists).

export interface MatchResult {
  mc: string;
  lagerplatz: string;
  artikelName: string;
  hatBestand: boolean;
  naechsteGroessere?: boolean;
}

interface BolzenEintrag {
  mc: string;
  durchmesser: string;
  laenge: number;
  material: 'VA' | 'Zinklamelle';
  lagerplatz: string;
  verfuegbar: number;
  artikelName: string;
}

const BOLZEN: BolzenEintrag[] = [
  // ── VA ──────────────────────────────────────────────────────────────────────
  { mc: '1981', durchmesser: '3/8',   laenge:  150, material: 'VA', lagerplatz: '21-02-06', verfuegbar:    4, artikelName: 'Schraubenbolzen 3/8 x 150 mm 2 x Mu VA' },
  { mc: '0891', durchmesser: '1/2',   laenge:   60, material: 'VA', lagerplatz: '21-02-12', verfuegbar:   35, artikelName: 'Schraubenbolzen 1/2 x 60 mm 2 x Mu VA' },
  { mc: '1805', durchmesser: '1/2',   laenge:   70, material: 'VA', lagerplatz: '21-02-12', verfuegbar:  365, artikelName: 'Schraubenbolzen 1/2 x 70 mm 2 x Mu VA' },
  { mc: '3438', durchmesser: '1/2',   laenge:   80, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 1/2 x 80 mm 2 x Mu VA (AS20)' },
  { mc: '3439', durchmesser: '1/2',   laenge:   90, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 1/2 x 90 mm 2 x Mu VA' },
  { mc: '5403', durchmesser: '1/2',   laenge:  100, material: 'VA', lagerplatz: '21-02-12', verfuegbar:   40, artikelName: 'Schraubenbolzen 1/2 x 100 mm 2 x Mu VA' },
  { mc: '4994', durchmesser: '5/8',   laenge:   85, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 5/8 x 85 mm 2 x Mu VA' },
  { mc: '2155', durchmesser: '5/8',   laenge:   90, material: 'VA', lagerplatz: '21-02-14', verfuegbar: 1124, artikelName: 'Schraubenbolzen 5/8 x 90 mm 2 x Mu VA' },
  { mc: '4631', durchmesser: '5/8',   laenge:   95, material: 'VA', lagerplatz: '21-02-13', verfuegbar:   62, artikelName: 'Schraubenbolzen 5/8 x 95 mm 2 x Mu VA' },
  { mc: '3442', durchmesser: '5/8',   laenge:  100, material: 'VA', lagerplatz: '21-02-13', verfuegbar:  259, artikelName: 'Schraubenbolzen 5/8 x 100 mm 2 x Mu VA' },
  { mc: '3443', durchmesser: '5/8',   laenge:  110, material: 'VA', lagerplatz: '21-02-13', verfuegbar:  236, artikelName: 'Schraubenbolzen 5/8 x 110 mm 2 x Mu VA' },
  { mc: '3846', durchmesser: '5/8',   laenge:  120, material: 'VA', lagerplatz: '21-02-13', verfuegbar:  103, artikelName: 'Schraubenbolzen 5/8 x 120 mm 2 x Mu VA' },
  { mc: '4851', durchmesser: '5/8',   laenge:  150, material: 'VA', lagerplatz: '21-02-13', verfuegbar:   73, artikelName: 'Schraubenbolzen 5/8 x 150 mm 2 x Mu VA (AS20)' },
  { mc: '4727', durchmesser: '3/4',   laenge:  120, material: 'VA', lagerplatz: '21-03-19', verfuegbar:  114, artikelName: 'Schraubenbolzen 3/4 x 120 mm 2 x Mu VA' },
  { mc: '3850', durchmesser: '3/4',   laenge:  130, material: 'VA', lagerplatz: '21-03-19', verfuegbar:   68, artikelName: 'Schraubenbolzen 3/4 x 130 mm 2 x Mu VA' },
  { mc: '3839', durchmesser: '3/4',   laenge:  150, material: 'VA', lagerplatz: '21-03-19', verfuegbar:   12, artikelName: 'Schraubenbolzen 3/4 x 150 mm 2 x Mu VA' },
  { mc: '5329', durchmesser: '7/8',   laenge:  125, material: 'VA', lagerplatz: '21-03-20', verfuegbar:  214, artikelName: 'Schraubenbolzen 7/8 x 125 mm 2 x Mu VA (AS20)' },
  { mc: '0198', durchmesser: '7/8',   laenge:  130, material: 'VA', lagerplatz: '21-05-18', verfuegbar:   54, artikelName: 'Schraubenbolzen 7/8 x 130 2 x Mu VA' },
  { mc: '3802', durchmesser: '7/8',   laenge:  140, material: 'VA', lagerplatz: '21-02-12', verfuegbar:   88, artikelName: 'Schraubenbolzen 7/8 x 140 mm 2 x Mu VA' },
  { mc: '0195', durchmesser: '7/8',   laenge:  155, material: 'VA', lagerplatz: '21-05-18', verfuegbar:   80, artikelName: 'Schraubenbolzen 7/8 x 155 2 x Mu VA' },
  { mc: '4764', durchmesser: '7/8',   laenge:  175, material: 'VA', lagerplatz: '21-02-12', verfuegbar:   35, artikelName: 'Schraubenbolzen 7/8 x 175 mm 2 x Mu VA' },
  { mc: '5332', durchmesser: '7/8',   laenge:  190, material: 'VA', lagerplatz: '21-02-12', verfuegbar:   14, artikelName: 'Schraubenbolzen 7/8 x 190 mm 2 Mu VA' },
  { mc: '1477', durchmesser: '7/8',   laenge:  200, material: 'VA', lagerplatz: '21-05-18', verfuegbar:    0, artikelName: 'Schraubenbolzen 7/8 x 200 2 x Mu VA' },
  { mc: '4745', durchmesser: '7/8',   laenge:  290, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 7/8 x 290 mm 2 x Mu VA' },
  { mc: '3803', durchmesser: '1',     laenge:  160, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   15, artikelName: 'Schraubenbolzen 1 x 160 mm 2 x Mu VA' },
  { mc: '4748', durchmesser: '1',     laenge:  170, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   28, artikelName: 'Schraubenbolzen 1 x 170 mm 2 x Mu VA' },
  { mc: '2148', durchmesser: '1 1/8', laenge:  160, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   12, artikelName: 'Schraubenbolzen 1 1/8 x 160 mm 2 x Mu VA' },
  { mc: '4076', durchmesser: '1 1/8', laenge:  185, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   10, artikelName: 'Schraubenbolzen 1 1/8 x 185 mm 2 x Mu VA' },
  { mc: '0188', durchmesser: '1 1/8', laenge:  190, material: 'VA', lagerplatz: '21-04-18', verfuegbar:   49, artikelName: 'Schraubenbolzen 1 1/8 x 190 2 x Mu VA' },
  { mc: '3845', durchmesser: '1 1/8', laenge:  210, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   23, artikelName: 'Schraubenbolzen 1 1/8 x 210 mm 2 x Mu VA' },
  { mc: '4370', durchmesser: '1 1/8', laenge:  215, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 1 1/8 x 215 mm 2 x Mu VA' },
  { mc: '5327', durchmesser: '1 1/8', laenge:  230, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   46, artikelName: 'Schraubenbolzen 1 1/8 x 230 mm 2 x Mu VA' },
  { mc: '5328', durchmesser: '1 1/8', laenge:  260, material: 'VA', lagerplatz: '21-03-12', verfuegbar:   22, artikelName: 'Schraubenbolzen 1 1/8 x 260 mm 2 x Mu VA' },
  { mc: '0189', durchmesser: '1 1/8', laenge:  280, material: 'VA', lagerplatz: '21-04-18', verfuegbar:   52, artikelName: 'Schraubenbolzen 1 1/8 x 280 2 x Mu VA' },
  { mc: '4744', durchmesser: '1 1/8', laenge:  290, material: 'VA', lagerplatz: '21-03-12', verfuegbar:    0, artikelName: 'Schraubenbolzen 1 1/8 x 290 mm 2 x Mu VA' },
  { mc: '3539', durchmesser: '1 1/4', laenge:  180, material: 'VA', lagerplatz: '21-03-13', verfuegbar:   60, artikelName: 'Schraubenbolzen 1 1/4 x 180 mm 2 x Mu VA' },
  { mc: '4065', durchmesser: '1 1/4', laenge:  210, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 1 1/4 x 210 mm 2 x Mu VA' },
  { mc: '5404', durchmesser: '1 1/4', laenge:  250, material: 'VA', lagerplatz: '21-03-14', verfuegbar:   80, artikelName: 'Schraubenbolzen 1 1/4 x 250 mm 2 x Mu VA' },
  { mc: '4074', durchmesser: '1 3/8', laenge:  255, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 1 3/8 x 255 mm 2 x Mu VA' },
  { mc: '4075', durchmesser: '1 3/8', laenge:  280, material: 'VA', lagerplatz: '21-03-13', verfuegbar:   54, artikelName: 'Schraubenbolzen 1 3/8 x 280 mm 2 x Mu VA' },
  { mc: '4743', durchmesser: '1 3/8', laenge:  305, material: 'VA', lagerplatz: '21-03-13', verfuegbar:    2, artikelName: 'Schraubenbolzen 1 3/8 x 305 mm 2 x Mu VA' },
  { mc: '4750', durchmesser: '1 3/8', laenge:  340, material: 'VA', lagerplatz: '21-03-13', verfuegbar:   14, artikelName: 'Schraubenbolzen 1 3/8 x 340 mm 2 x Mu VA' },
  { mc: '0162', durchmesser: '1 5/8', laenge:  350, material: 'VA', lagerplatz: '21-08-22', verfuegbar:    9, artikelName: 'Schraubenbolzen 1 5/8 x 350mm 2 x Mu VA' },
  { mc: '4369', durchmesser: '2 1/2', laenge:  500, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 2 1/2 x 500 mm 2 x Mu VA' },
  { mc: '0163', durchmesser: '3',     laenge:  800, material: 'VA', lagerplatz: '00-99-99', verfuegbar:    0, artikelName: 'Schraubenbolzen 3 x 800mm 2 x Mu VA' },
  // ── Zinklamelle ─────────────────────────────────────────────────────────────
  { mc: '5392', durchmesser: '1/2',   laenge:   70, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1/2 x 70 mm 2 x Mu Zinklamelle' },
  { mc: '4953', durchmesser: '1/2',   laenge:   80, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar: 186, artikelName: 'Schraubenbolzen 1/2 x 80 mm 2 x Mu Zinklamelle' },
  { mc: '5393', durchmesser: '1/2',   laenge:  100, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar: 129, artikelName: 'Schraubenbolzen 1/2 x 100 mm 2 x Mu Zinklamelle' },
  { mc: '5479', durchmesser: '5/8',   laenge:   80, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 5/8 x 80 mm 2 x Mu Zinklamelle' },
  { mc: '4957', durchmesser: '5/8',   laenge:   95, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar:  36, artikelName: 'Schraubenbolzen 5/8 x 95 mm 2 x Mu Zinklamelle' },
  { mc: '5394', durchmesser: '5/8',   laenge:  100, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 5/8 x 100 mm 2 x Mu Zinklamelle' },
  { mc: '4958', durchmesser: '5/8',   laenge:  125, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar:  66, artikelName: 'Schraubenbolzen 5/8 x 125 mm 2 x Mu Zinklamelle' },
  { mc: '4959', durchmesser: '5/8',   laenge:  150, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar:  50, artikelName: 'Schraubenbolzen 5/8 x 150 mm 2 x Mu Zinklamelle' },
  { mc: '5356', durchmesser: '3/4',   laenge:  105, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:  40, artikelName: 'Schraubenbolzen 3/4 x 105mm 2 x Mu Zinklamelle' },
  { mc: '5017', durchmesser: '3/4',   laenge:  120, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 3/4 x 120 mm 2 x Mu Zinklamelle' },
  { mc: '4956', durchmesser: '3/4',   laenge:  140, material: 'Zinklamelle', lagerplatz: '21-07-21',    verfuegbar:  36, artikelName: 'Schraubenbolzen 3/4 x 140 mm 2 x Mu Zinklamelle' },
  { mc: '5357', durchmesser: '7/8',   laenge:  130, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar: 295, artikelName: 'Schraubenbolzen 7/8 x 130mm 2 x Mu Zinklamelle' },
  { mc: '4960', durchmesser: '7/8',   laenge:  150, material: 'Zinklamelle', lagerplatz: '21-07-22',    verfuegbar: 176, artikelName: 'Schraubenbolzen 7/8 x 150 mm 2 x Mu Zinklamelle' },
  { mc: '5011', durchmesser: '7/8',   laenge:  160, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 7/8 x 160 mm 2 x Mu Zinklamelle' },
  { mc: '5395', durchmesser: '7/8',   laenge:  170, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar:  53, artikelName: 'Schraubenbolzen 7/8 x 170 mm 2 x Mu Zinklamelle' },
  { mc: '4954', durchmesser: '7/8',   laenge:  180, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar:  36, artikelName: 'Schraubenbolzen 7/8 x 180 mm 2 x Mu Zinklamelle' },
  { mc: '4955', durchmesser: '7/8',   laenge:  200, material: 'Zinklamelle', lagerplatz: '21-07-22',    verfuegbar:  32, artikelName: 'Schraubenbolzen 7/8 x 200 mm 2 x Mu Zinklamelle' },
  { mc: '5367', durchmesser: '7/8',   laenge:  220, material: 'Zinklamelle', lagerplatz: '21-06-22',    verfuegbar:  58, artikelName: 'Schraubenbolzen 7/8 x 220 mm 2 x Mu Zinklamelle' },
  { mc: '5396', durchmesser: '1',     laenge:  170, material: 'Zinklamelle', lagerplatz: '21-04-17',    verfuegbar:  74, artikelName: 'Schraubenbolzen 1 x 170 mm 2 x Mu Zinklamelle' },
  { mc: '5375', durchmesser: '1',     laenge:  180, material: 'Zinklamelle', lagerplatz: '21-04-17',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1 x 180mm 2 x Mu Zinklamelle' },
  { mc: '5377', durchmesser: '1 1/8', laenge:  180, material: 'Zinklamelle', lagerplatz: '22-03-10',    verfuegbar:  49, artikelName: 'Schraubenbolzen 1 1/8 x 180mm 2 x Mu Zinklamelle' },
  { mc: '5224', durchmesser: '1 1/8', laenge:  220, material: 'Zinklamelle', lagerplatz: '22-03-10',    verfuegbar:  48, artikelName: 'Schraubenbolzen 1 1/8 x 220 mm 2 x Mu Zinklamelle' },
  { mc: '5372', durchmesser: '1 1/8', laenge:  260, material: 'Zinklamelle', lagerplatz: '22-03-10',    verfuegbar:   9, artikelName: 'Schraubenbolzen 1 1/8 x 260 mm 2 x Mu Zinklamelle' },
  { mc: '4961', durchmesser: '1 1/4', laenge:  170, material: 'Zinklamelle', lagerplatz: '21-05-20',    verfuegbar: 153, artikelName: 'Schraubenbolzen 1 1/4 x 170 mm 2 x Mu Zinklamelle' },
  { mc: '4962', durchmesser: '1 1/4', laenge:  220, material: 'Zinklamelle', lagerplatz: '21-05-20',    verfuegbar: 159, artikelName: 'Schraubenbolzen 1 1/4 x 220 mm 2 x Mu Zinklamelle' },
  { mc: '5360', durchmesser: '1 1/4', laenge:  230, material: 'Zinklamelle', lagerplatz: '21-07-20',    verfuegbar:  32, artikelName: 'Schraubenbolzen 1 1/4 x 230mm 2 x Mu Zinklamelle' },
  { mc: '5361', durchmesser: '1 1/4', laenge:  285, material: 'Zinklamelle', lagerplatz: '21-07-20',    verfuegbar:  72, artikelName: 'Schraubenbolzen 1 1/4 x 285mm 2 x Mu Zinklamelle' },
  { mc: '5480', durchmesser: '1 3/8', laenge:  150, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1 3/8 x 150 mm 2 x Mu Zinklamelle' },
  { mc: '5358', durchmesser: '1 3/8', laenge:  210, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1 3/8 x 210mm 2 x Mu Zinklamelle' },
  { mc: '4963', durchmesser: '1 3/8', laenge:  260, material: 'Zinklamelle', lagerplatz: '21-04-20',    verfuegbar:  89, artikelName: 'Schraubenbolzen 1 3/8 x 260 mm 2 x Mu Zinklamelle' },
  { mc: '5359', durchmesser: '1 3/8', laenge:  270, material: 'Zinklamelle', lagerplatz: '22-03-08',    verfuegbar:  20, artikelName: 'Schraubenbolzen 1 3/8 x 270mm 2 x Mu Zinklamelle' },
  { mc: '5012', durchmesser: '1 3/8', laenge:  280, material: 'Zinklamelle', lagerplatz: '21-04-20',    verfuegbar:  14, artikelName: 'Schraubenbolzen 1 3/8 x 280 mm 2 x Mu Zinklamelle' },
  { mc: '5013', durchmesser: '1 3/8', laenge:  320, material: 'Zinklamelle', lagerplatz: '22-03-08',    verfuegbar:  20, artikelName: 'Schraubenbolzen 1 3/8 x 320 mm 2 x Mu Zinklamelle' },
  { mc: '5376', durchmesser: '1 3/8', laenge:  330, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1 3/8 x 330mm 2 x Mu Zinklamelle' },
  { mc: '5021', durchmesser: '1 3/8', laenge:  390, material: 'Zinklamelle', lagerplatz: '22-03-08',    verfuegbar: 184, artikelName: 'Schraubenbolzen 1 3/8 x 390 mm 2 x Mu Zinklamelle' },
  { mc: '5378', durchmesser: '1 3/8', laenge:  400, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1 3/8 x 400mm 2 x Mu Zinklamelle' },
  { mc: '5229', durchmesser: '1 5/8', laenge:  330, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 1 5/8 x 330 mm o. Mu Zinklamelle' },
  { mc: '4964', durchmesser: '1 5/8', laenge:  360, material: 'Zinklamelle', lagerplatz: '21-04-21',    verfuegbar:  51, artikelName: 'Schraubenbolzen 1 5/8 x 360 mm 2 x Mu Zinklamelle' },
  { mc: '5227', durchmesser: '1 5/8', laenge:  370, material: 'Zinklamelle', lagerplatz: '21-04-21',    verfuegbar: 146, artikelName: 'Schraubenbolzen 1 5/8 x 370 mm 2 x Mu Zinklamelle' },
  { mc: '4965', durchmesser: '1 5/8', laenge:  710, material: 'Zinklamelle', lagerplatz: '21-02-21',    verfuegbar: 127, artikelName: 'Schraubenbolzen 1 5/8 x 710 mm 2 x Mu Zinklamelle' },
  { mc: '5014', durchmesser: '1 7/8', laenge:  405, material: 'Zinklamelle', lagerplatz: '22-04-11',    verfuegbar:  45, artikelName: 'Schraubenbolzen 1 7/8 x 405 mm 2 x Mu Zinklamelle' },
  { mc: '5390', durchmesser: '1 7/8', laenge:  420, material: 'Zinklamelle', lagerplatz: '22-04-09',    verfuegbar: 100, artikelName: 'Schraubenbolzen 1 7/8 x 420 2 x Mu Zinklamelle' },
  { mc: '5374', durchmesser: '1 7/8', laenge:  430, material: 'Zinklamelle', lagerplatz: '22-03-11',    verfuegbar:  77, artikelName: 'Schraubenbolzen 1 7/8 x 430 mm 2 x Mu Zinklamelle' },
  { mc: '5015', durchmesser: '1 7/8', laenge:  480, material: 'Zinklamelle', lagerplatz: '22-04-10',    verfuegbar:  95, artikelName: 'Schraubenbolzen 1 7/8 x 480 mm 2 x Mu Zinklamelle' },
  { mc: '5016', durchmesser: '2',     laenge:  460, material: 'Zinklamelle', lagerplatz: '21-02-22',    verfuegbar:  39, artikelName: 'Schraubenbolzen 2 x 460 mm 2 x Mu Zinklamelle' },
  { mc: '5362', durchmesser: '2',     laenge:  540, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 2 x 540mm 2 x Mu Zinklamelle' },
  { mc: '4968', durchmesser: '2 1/4', laenge:  500, material: 'Zinklamelle', lagerplatz: '22-01-05',    verfuegbar:  98, artikelName: 'Schraubenbolzen 2 1/4 x 500 mm 2 x Mu Zinklamelle' },
  { mc: '4969', durchmesser: '2 1/4', laenge:  620, material: 'Zinklamelle', lagerplatz: '22-01-12',    verfuegbar:  68, artikelName: 'Schraubenbolzen 2 1/4 x 620 mm 2 x Mu Zinklamelle' },
  { mc: '5363', durchmesser: '2 1/2', laenge:  530, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar:  60, artikelName: 'Schraubenbolzen 2 1/2 x 530mm 2 x Mu Zinklamelle' },
  { mc: '4966', durchmesser: '2 1/2', laenge:  550, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 324, artikelName: 'Schraubenbolzen 2 1/2 x 550 mm 2 x Mu Zinklamelle' },
  { mc: '5022', durchmesser: '2 1/2', laenge:  620, material: 'Zinklamelle', lagerplatz: '22-01-08',    verfuegbar:  60, artikelName: 'Schraubenbolzen 2 1/2 x 620 mm 2 x Mu Zinklamelle' },
  { mc: '5373', durchmesser: '2 1/2', laenge:  650, material: 'Zinklamelle', lagerplatz: '22-01-10',    verfuegbar:  60, artikelName: 'Schraubenbolzen 2 1/2 x 650mm 2 x Mu Zinklamelle' },
  { mc: '5379', durchmesser: '2 1/2', laenge:  670, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar:  78, artikelName: 'Schraubenbolzen 2 1/2 x 670mm 2 x Mu Zinklamelle' },
  { mc: '4967', durchmesser: '2 1/2', laenge:  710, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:   0, artikelName: 'Schraubenbolzen 2 1/2 x 710 mm 2 x Mu Zinklamelle' },
  { mc: '5381', durchmesser: '2 1/2', laenge:  750, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar:  30, artikelName: 'Schraubenbolzen 2 1/2 x 750mm 2 x Mu Zinklamelle' },
  { mc: '5400', durchmesser: '3',     laenge:  590, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar: 104, artikelName: 'Schraubenbolzen 3 x 590mm 2 x Mu Zinklamelle' },
  { mc: '5364', durchmesser: '3',     laenge:  700, material: 'Zinklamelle', lagerplatz: '22-01-13',    verfuegbar:   8, artikelName: 'Schraubenbolzen 3 x 700mm 2 x Mu Zinklamelle' },
  { mc: '5365', durchmesser: '3 1/2', laenge:  700, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar:   8, artikelName: 'Schraubenbolzen 3 1/2 x 700mm 2 x Mu Zinklamelle' },
  { mc: '5366', durchmesser: '3 1/2', laenge:  740, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar:  37, artikelName: 'Schraubenbolzen 3 1/2 x 740mm 2 x Mu Zinklamelle' },
  // ── Metric thread (M-Gewinde) Zinklamelle ───────────────────────────────────
  { mc: '5347', durchmesser: 'M24',   laenge:  190, material: 'Zinklamelle', lagerplatz: '00-99-99',    verfuegbar:  50, artikelName: 'Schraubenbolzen M24 x 190mm 2 x Mu Zinklamelle' },
  { mc: '5248', durchmesser: 'M48',   laenge:  310, material: 'Zinklamelle', lagerplatz: '21-03-22',    verfuegbar:  18, artikelName: 'Schraubenbolzen M48 x 310 mm m. Mu Zinklamelle' },
  { mc: '5249', durchmesser: 'M52',   laenge:  360, material: 'Zinklamelle', lagerplatz: '21-03-22',    verfuegbar:  20, artikelName: 'Schraubenbolzen M52 x 360 mm m. Mu Zinklamelle' },
  { mc: '5348', durchmesser: 'M64',   laenge:  550, material: 'Zinklamelle', lagerplatz: '01_NORDFROST', verfuegbar:  45, artikelName: 'Schraubenbolzen M64 x 550mm 2 x Mu Zinklamelle' },
];

// ── Gasket inventory ──────────────────────────────────────────────────────────

interface DichtungEintrag {
  mc: string;
  rNummer: string;
  form: 'Octagonal' | 'Oval';
  material: 'VA' | 'WE' | null;
  lagerplatz: string;
  verfuegbar: number;
  artikelName: string;
}

const DICHTUNGEN: DichtungEintrag[] = [
  // ── Octagonal VA ────────────────────────────────────────────────────────────
  { mc: '1223', rNummer: '12',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:   1, artikelName: 'Dichtung R 12 octogonal VA' },
  { mc: '4726', rNummer: '14',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  71, artikelName: 'Dichtung R 14 octogonal VA' },
  { mc: '3723', rNummer: '16',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  43, artikelName: 'Dichtung R 16 octogonal VA' },
  { mc: '3725', rNummer: '20',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  17, artikelName: 'Dichtung R 20 octogonal VA' },
  { mc: '4451', rNummer: '22',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  20, artikelName: 'Dichtung R 22 octogonal VA' },
  { mc: '1227', rNummer: '24',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  83, artikelName: 'Dichtung R 24 octogonal VA' },
  { mc: '1228', rNummer: '31',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  34, artikelName: 'Dichtung R 31 octogonal VA' },
  { mc: '4827', rNummer: '35',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  10, artikelName: 'Dichtung R 35 octogonal VA' },
  { mc: '4384', rNummer: '37',  form: 'Octagonal', material: 'VA', lagerplatz: '22-02-18', verfuegbar:  32, artikelName: 'Dichtung R 37 octogonal VA' },
  { mc: '4828', rNummer: '39',  form: 'Octagonal', material: 'VA', lagerplatz: '22-02-18', verfuegbar:  41, artikelName: 'Dichtung R 39 octogonal VA' },
  { mc: '3729', rNummer: '45',  form: 'Octagonal', material: 'VA', lagerplatz: '22-02-18', verfuegbar:  26, artikelName: 'Dichtung R 45 octogonal VA' },
  { mc: '3732', rNummer: '46',  form: 'Octagonal', material: 'VA', lagerplatz: '22-02-18', verfuegbar:  10, artikelName: 'Dichtung R 46 octogonal VA' },
  { mc: '1234', rNummer: '49',  form: 'Octagonal', material: 'VA', lagerplatz: '22-02-18', verfuegbar:   8, artikelName: 'Dichtung R 49 octogonal VA' },
  { mc: '3689', rNummer: '50',  form: 'Octagonal', material: 'VA', lagerplatz: '00-99-99', verfuegbar:   0, artikelName: 'Dichtung R 50 octogonal VA' },
  { mc: '1152', rNummer: '58',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-20', verfuegbar:   5, artikelName: 'Dichtung R 58 octogonal VA' },
  { mc: '2143', rNummer: '66',  form: 'Octagonal', material: 'VA', lagerplatz: '22-03-20', verfuegbar:   2, artikelName: 'Dichtung R 66 octogonal VA' },
  { mc: '1235', rNummer: '67',  form: 'Octagonal', material: 'VA', lagerplatz: '22-06-19', verfuegbar:  30, artikelName: 'Dichtung R 67 octogonal VA' },
  { mc: '4383', rNummer: '78',  form: 'Octagonal', material: 'VA', lagerplatz: '22-09-15', verfuegbar:  15, artikelName: 'Dichtung R 78 octogonal VA' },
  { mc: '3690', rNummer: '79',  form: 'Octagonal', material: 'VA', lagerplatz: '00-99-99', verfuegbar:   0, artikelName: 'Dichtung R 79 octogonal VA' },
  { mc: '1222', rNummer: '102', form: 'Octagonal', material: 'VA', lagerplatz: '22-05-19', verfuegbar:  13, artikelName: 'Dichtung R 102 octogonal VA' },
  // ── Octagonal Weicheisen ────────────────────────────────────────────────────
  { mc: '3321', rNummer: '12',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-21', verfuegbar:  44, artikelName: 'Dichtung R 12 octogonal Weicheisen' },
  { mc: '4970', rNummer: '14',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-21', verfuegbar:  52, artikelName: 'Dichtung R 14 octogonal Weicheisen' },
  { mc: '3724', rNummer: '16',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-21', verfuegbar:   0, artikelName: 'Dichtung R 16 octogonal Weicheisen' },
  { mc: '3743', rNummer: '20',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-21', verfuegbar:  41, artikelName: 'Dichtung R 20 octogonal Weicheisen' },
  { mc: '4450', rNummer: '22',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-21', verfuegbar:   8, artikelName: 'Dichtung R 22 octogonal Weicheisen' },
  { mc: '4238', rNummer: '24',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-20', verfuegbar: 229, artikelName: 'Dichtung R 24 octogonal Weicheisen' },
  { mc: '3726', rNummer: '31',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-20', verfuegbar:  66, artikelName: 'Dichtung R 31 octogonal Weicheisen' },
  { mc: '4407', rNummer: '35',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-19', verfuegbar:  37, artikelName: 'Dichtung R 35 octogonal Weicheisen' },
  { mc: '3727', rNummer: '37',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-19', verfuegbar:  16, artikelName: 'Dichtung R 37 octogonal Weicheisen' },
  { mc: '3728', rNummer: '39',  form: 'Octagonal', material: 'WE', lagerplatz: '22-02-19', verfuegbar:  67, artikelName: 'Dichtung R 39 octogonal Weicheisen' },
  { mc: '3730', rNummer: '45',  form: 'Octagonal', material: 'WE', lagerplatz: '22-03-19', verfuegbar:  42, artikelName: 'Dichtung R 45 octogonal Weicheisen' },
  { mc: '3731', rNummer: '46',  form: 'Octagonal', material: 'WE', lagerplatz: '22-03-19', verfuegbar:  25, artikelName: 'Dichtung R 46 octogonal Weicheisen' },
  { mc: '1122', rNummer: '49',  form: 'Octagonal', material: 'WE', lagerplatz: '22-03-21', verfuegbar:  54, artikelName: 'Dichtung R 49 octogonal Weicheisen' },
  { mc: '3734', rNummer: '50',  form: 'Octagonal', material: 'WE', lagerplatz: '22-03-21', verfuegbar:  57, artikelName: 'Dichtung R 50 octogonal Weicheisen' },
  { mc: '1124', rNummer: '53',  form: 'Octagonal', material: 'WE', lagerplatz: '22-07-22', verfuegbar:  14, artikelName: 'Dichtung R 53 octogonal Weicheisen' },
  { mc: '3735', rNummer: '54',  form: 'Octagonal', material: 'WE', lagerplatz: '22-06-22', verfuegbar:  36, artikelName: 'Dichtung R 54 octogonal Weicheisen' },
  { mc: '3736', rNummer: '56',  form: 'Octagonal', material: 'WE', lagerplatz: '22-07-22', verfuegbar:   7, artikelName: 'Dichtung R 56 octogonal Weicheisen' },
  { mc: '3865', rNummer: '58',  form: 'Octagonal', material: 'WE', lagerplatz: '22-07-21', verfuegbar:  39, artikelName: 'Dichtung R 58 octogonal Weicheisen' },
  { mc: '3737', rNummer: '63',  form: 'Octagonal', material: 'WE', lagerplatz: '22-05-18', verfuegbar:  49, artikelName: 'Dichtung R 63 octogonal Weicheisen' },
  { mc: '3738', rNummer: '66',  form: 'Octagonal', material: 'WE', lagerplatz: '22-08-22', verfuegbar:  36, artikelName: 'Dichtung R 66 octogonal Weicheisen' },
  { mc: '3739', rNummer: '67',  form: 'Octagonal', material: 'WE', lagerplatz: '22-05-20', verfuegbar:  39, artikelName: 'Dichtung R 67 octogonal Weicheisen' },
  { mc: '3740', rNummer: '70',  form: 'Octagonal', material: 'WE', lagerplatz: '22-05-21', verfuegbar:  16, artikelName: 'Dichtung R 70 octogonal Weicheisen' },
  { mc: '3741', rNummer: '71',  form: 'Octagonal', material: 'WE', lagerplatz: '22-05-21', verfuegbar:  12, artikelName: 'Dichtung R 71 octogonal Weicheisen' },
  { mc: '4380', rNummer: '74',  form: 'Octagonal', material: 'WE', lagerplatz: '22-09-20', verfuegbar:  18, artikelName: 'Dichtung R 74 octogonal Weicheisen' },
  { mc: '3744', rNummer: '75',  form: 'Octagonal', material: 'WE', lagerplatz: '22-08-18', verfuegbar:  20, artikelName: 'Dichtung R 75 octogonal Weicheisen' },
  { mc: '1097', rNummer: '78',  form: 'Octagonal', material: 'WE', lagerplatz: '22-08-20', verfuegbar:  23, artikelName: 'Dichtung R 78 octogonal Weicheisen' },
  { mc: '3745', rNummer: '79',  form: 'Octagonal', material: 'WE', lagerplatz: '22-08-21', verfuegbar:  19, artikelName: 'Dichtung R 79 octogonal Weicheisen' },
  { mc: '1108', rNummer: '102', form: 'Octagonal', material: 'WE', lagerplatz: '22-07-20', verfuegbar:   0, artikelName: 'Dichtung R 102 octogonal Weicheisen' },
  // ── Octagonal ohne Material ─────────────────────────────────────────────────
  { mc: '5399', rNummer: '102', form: 'Octagonal', material: null, lagerplatz: '22-01-20', verfuegbar:   8, artikelName: 'Dichtung R 102 Octagonal' },
  // ── Oval VA ─────────────────────────────────────────────────────────────────
  { mc: '3466', rNummer: '14',  form: 'Oval', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  2, artikelName: 'Dichtung R 14 oval VA' },
  { mc: '2491', rNummer: '16',  form: 'Oval', material: 'VA', lagerplatz: '22-03-18', verfuegbar: 11, artikelName: 'Dichtung R 16 oval VA' },
  { mc: '2486', rNummer: '20',  form: 'Oval', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  3, artikelName: 'Dichtung R 20 oval VA' },
  { mc: '5349', rNummer: '24',  form: 'Oval', material: 'VA', lagerplatz: '22-03-18', verfuegbar: 11, artikelName: 'Dichtung RTJ R 24 oval VA' },
  { mc: '2490', rNummer: '35',  form: 'Oval', material: 'VA', lagerplatz: '22-03-18', verfuegbar:  0, artikelName: 'Dichtung R 35 oval VA' },
  { mc: '1239', rNummer: '37',  form: 'Oval', material: 'VA', lagerplatz: '22-02-18', verfuegbar:  1, artikelName: 'Dichtung R 37 oval VA' },
  { mc: '1240', rNummer: '45',  form: 'Oval', material: 'VA', lagerplatz: '22-02-18', verfuegbar:  6, artikelName: 'Dichtung R 45 oval VA' },
  { mc: '4000', rNummer: '78',  form: 'Oval', material: 'VA', lagerplatz: '21-05-07', verfuegbar: 12, artikelName: 'Dichtung R 78 oval VA' },
  { mc: '1703', rNummer: '79',  form: 'Oval', material: 'VA', lagerplatz: '22-03-20', verfuegbar:  2, artikelName: 'Dichtung R 79 oval VA' },
  // ── Oval Weicheisen ─────────────────────────────────────────────────────────
  { mc: '3193', rNummer: '12',  form: 'Oval', material: 'WE', lagerplatz: '00-99-99', verfuegbar:  0, artikelName: 'Dichtung R 12 oval Weicheisen MAN' },
  { mc: '3192', rNummer: '14',  form: 'Oval', material: 'WE', lagerplatz: '00-99-99', verfuegbar:  0, artikelName: 'Dichtung R 14 oval Weicheisen MAN' },
  { mc: '2144', rNummer: '16',  form: 'Oval', material: 'WE', lagerplatz: '22-02-21', verfuegbar: 20, artikelName: 'Dichtung R 16 oval Weicheisen' },
  { mc: '1146', rNummer: '20',  form: 'Oval', material: 'WE', lagerplatz: '22-02-21', verfuegbar:  6, artikelName: 'Dichtung R 20 oval Weicheisen' },
  { mc: '2037', rNummer: '24',  form: 'Oval', material: 'WE', lagerplatz: '22-02-21', verfuegbar: 20, artikelName: 'Dichtung R 24 oval Weicheisen' },
  { mc: '1148', rNummer: '35',  form: 'Oval', material: 'WE', lagerplatz: '22-02-19', verfuegbar:  2, artikelName: 'Dichtung R 35 oval Weicheisen' },
  { mc: '4381', rNummer: '39',  form: 'Oval', material: 'WE', lagerplatz: '22-02-19', verfuegbar: 44, artikelName: 'Dichtung R 39 oval Weicheisen' },
  { mc: '2015', rNummer: '49',  form: 'Oval', material: 'WE', lagerplatz: '22-03-21', verfuegbar:  3, artikelName: 'Dichtung R 49 oval Weicheisen' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Public API ────────────────────────────────────────────────────────────────

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

  const exact = kandidaten.find(b => b.laenge === laenge);
  if (exact) {
    return { mc: exact.mc, lagerplatz: exact.lagerplatz, artikelName: exact.artikelName, hatBestand: exact.verfuegbar > 0 };
  }

  const longer = kandidaten.filter(b => b.laenge > laenge).sort((a, b) => a.laenge - b.laenge)[0];
  if (longer) {
    return { mc: longer.mc, lagerplatz: longer.lagerplatz, artikelName: longer.artikelName, hatBestand: longer.verfuegbar > 0, naechsteGroessere: true };
  }

  return null;
}

export function matchDichtung(
  dichtungsTyp: string,
  bolzenMaterial: string
): MatchResult | null {
  const rNummer = extractRNummer(dichtungsTyp);
  if (!rNummer) return null;

  const isVA = /A\s*193/i.test(bolzenMaterial);
  const matKw: 'VA' | 'WE' = isVA ? 'VA' : 'WE';

  const forceOctagonal = /oct[ao]gonal|oktagonal/i.test(dichtungsTyp);
  const forceOval      = /oval/i.test(dichtungsTyp);

  const kandidaten = DICHTUNGEN.filter(
    d => d.rNummer === rNummer && (d.material === matKw || d.material === null)
  );
  const pool = kandidaten.length > 0 ? kandidaten : DICHTUNGEN.filter(d => d.rNummer === rNummer);
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

  return { mc: match.mc, lagerplatz: match.lagerplatz, artikelName: match.artikelName, hatBestand: match.verfuegbar > 0 };
}
