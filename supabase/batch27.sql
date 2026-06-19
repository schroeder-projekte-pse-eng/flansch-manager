-- Batch 27: section 72 (36-FL-72001 to 42-FL-72028, 28 rows)
-- FC 11-EN (rows 1-16, 23-25): '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1' / 'DIN 10269'
-- FS 20-N (rows 17-22, 26-28): 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1' / 'ASME B 18.2.1'
-- Row 72015: Rohrverbindung/Brillenscheibe, DN25, 4,'7/8',130, R16
-- Row 72023: Rohrverbindung/Steckscheibe, DN250, 12,'1 7/8',500 (laenge 500 not 400)
-- Row 72024: 13-V-72001, DN200, 12,'1 5/8',350, R50 (36-FL prefix)
-- Rows 72025-72028: 42-FL prefix
-- Row 72026: ausruestung contains slash '42-C-72001/42-C-72002'

INSERT INTO flanschen (tag_nummer, tag_nummer_ausruestung, rohrklasse, durchmesser, druckstufe, bolzen_anzahl, bolzen_durchmesser, bolzen_laenge, bolzen_material, bolzen_norm, anzugsmoment, vorspannkraft, dichtungs_typ)
VALUES
('36-FL-72001', '36-TIZA-72008', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72002', '36-TI-72002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72003', '36-FICA-72007', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72004', '36-FICA-72007', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72005', '36-V-72001', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72006', '36-V-72007', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72007', '36-V-72007', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72008', '36-FCV-72001', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72009', '36-FCV-72001', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72010', '36-V-72008', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72011', '36-V-72008', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72012', '36-ESV-72006', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72013', '36-ESV-72006', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72014', '36-V-72002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-72015', 'Rohrverbindung/Brillenscheibe', 'FC 11-EN', 25, '1500', 4, '7/8', 130, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R16'),
('36-FL-72016', '42-ESV-72002', 'FC 11-EN', 25, '1500', 4, '7/8', 130, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R16'),
('36-FL-72017', '42-ESV-72002', 'FS 20-N', 25, '1500', 4, '7/8', 130, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R16'),
('36-FL-72018', '42-V-72005', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('36-FL-72019', '42-V-72005', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('36-FL-72020', '42-ESV-72001', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('36-FL-72021', '42-ESV-72001', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('36-FL-72022', '36-TIA-72005', 'FS 20-N', 50, '1500', 8, '7/8', 155, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R24'),
('36-FL-72023', 'Rohrverbindung/Steckscheibe', 'FC 11-EN', 250, '1500', 12, '1 7/8', 500, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-72024', '13-V-72001', 'FC 11-EN', 200, '1500', 12, '1 5/8', 350, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R50'),
('42-FL-72025', '13-V-72002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('42-FL-72026', '42-C-72002', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-72027', '42-C-72001/42-C-72002', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-72028', '42-C-72002', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14')
ON CONFLICT (tag_nummer) DO NOTHING;
