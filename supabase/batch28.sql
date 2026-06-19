-- Batch 28: section 73 (36-FL-73001 to 42-FL-73028, 28 rows)
-- FC 11-EN (rows 1-16, 23-25): '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1' / 'DIN 10269'
-- FS 20-N (rows 17-22, 26-28): 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1' / 'ASME B 18.2.1'
-- Row 73012: 36-ESV-73006/Steckscheibe, DN250, 12,'1 7/8',500 (laenge 500)
-- Row 73013: 36-ESV-73006, DN250, 12,'1 7/8',400 (regular laenge)
-- Row 73015: Rohrverbindung/Brillenscheibe, DN25, 4,'7/8',130, R16
-- Row 73022: 36-TIA-73005, FS 20-N (note: 36-FL prefix but FS class)
-- Row 73023: Rohrverbindung/Steckscheibe, DN250, 12,'1 7/8',500, R54
-- Rows 73017/25-28: 42-FL prefix

INSERT INTO flanschen (tag_nummer, tag_nummer_ausruestung, rohrklasse, durchmesser, druckstufe, bolzen_anzahl, bolzen_durchmesser, bolzen_laenge, bolzen_material, bolzen_norm, anzugsmoment, vorspannkraft, dichtungs_typ)
VALUES
('36-FL-73001', '36-TIZA-73008', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73002', '36-TI-73002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73003', '36-FICA-73007', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73004', '36-FICA-73007', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73005', '36-V-73001', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73006', '36-V-73007', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73007', '36-V-73007', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73008', '36-FCV-73001', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73009', '36-FCV-73001', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73010', '36-V-73008', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73011', '36-V-73008', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73012', '36-ESV-73006/Steckscheibe', 'FC 11-EN', 250, '1500', 12, '1 7/8', 500, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73013', '36-ESV-73006', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73014', '36-V-73002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-73015', 'Rohrverbindung/Brillenscheibe', 'FC 11-EN', 25, '1500', 4, '7/8', 130, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R16'),
('36-FL-73016', '42-ESV-73002', 'FC 11-EN', 25, '1500', 4, '7/8', 130, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R16'),
('42-FL-73017', '42-ESV-73002', 'FS 20-N', 25, '1500', 4, '7/8', 130, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R16'),
('42-FL-73018', '42-V-73005', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-73019', '42-V-73005', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-73020', '42-ESV-73001', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-73021', '42-ESV-73001', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('36-FL-73022', '36-TIA-73005', 'FS 20-N', 50, '1500', 8, '7/8', 155, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R24'),
('36-FL-73023', 'Rohrverbindung/Steckscheibe', 'FC 11-EN', 250, '1500', 12, '1 7/8', 500, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-73024', '13-V-73001', 'FC 11-EN', 200, '1500', 12, '1 5/8', 350, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R50'),
('42-FL-73025', '13-V-73002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('42-FL-73026', '42-C-73002', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-73027', '42-C-73001/42-C-73002', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14'),
('42-FL-73028', '42-C-73002', 'FS 20-N', 20, '1500', 4, '3/4', 120, 'A193Class2 Grade B8M, lamellenverz. 2xaufgem.,B.:3.1,M.:3.1', 'ASME B 18.2.1', 0, 0, 'R14')
ON CONFLICT (tag_nummer) DO NOTHING;
