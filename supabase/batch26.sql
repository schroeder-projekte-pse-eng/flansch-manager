-- Batch 26: section 71 (36-FL-71001 to 36-FL-71032, 32 rows)
-- All FC 11-EN: '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1' / 'DIN 10269'
-- DN50: 8,'7/8',155, R24
-- DN80: 8,'1 1/8',230, R35 (Blende variant: laenge=260)
-- DN250: 12,'1 7/8',400, R54
-- DN300: 16,'2',450, R58
-- DN400: 16,'2 1/2',540, R67

INSERT INTO flanschen (tag_nummer, tag_nummer_ausruestung, rohrklasse, durchmesser, druckstufe, bolzen_anzahl, bolzen_durchmesser, bolzen_laenge, bolzen_material, bolzen_norm, anzugsmoment, vorspannkraft, dichtungs_typ)
VALUES
('36-FL-71001', '36-V-71011', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71002', '36-V-71011', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71003', '36-V-71013', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71004', '36-V-71013', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71005', 'PI71002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71006', 'PI71001', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71007', '36-V-71002', 'FC 11-EN', 300, '1500', 16, '2', 450, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R58'),
('36-FL-71008', '36-V-71002', 'FC 11-EN', 300, '1500', 16, '2', 450, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R58'),
('36-FL-71009', '36-V-71005', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71010', '36-V-71005', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71011', '36-V-71003', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71012', '36-V-71003', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71013', '36-ESV-71013', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-71014', '36-ESV-71013', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-71015', '36-V-71004', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71016', '36-V-71004', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71017', '36-V-71007', 'FC 11-EN', 300, '1500', 16, '2', 450, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R58'),
('36-FL-71018', '36-V-71007', 'FC 11-EN', 300, '1500', 16, '2', 450, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R58'),
('36-FL-71019', '36-V-71010', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71020', '36-V-71010', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-71021', '36-V-71008', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71022', '36-V-71008', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71023', '36-ESV-71014', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-71024', '36-ESV-71014', 'FC 11-EN', 250, '1500', 12, '1 7/8', 400, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R54'),
('36-FL-71025', '36-V-71009', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71026', '36-V-71009', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71027', '36-ESV-71008', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71028', '36-ESV-71008/Blende', 'FC 11-EN', 80, '1500', 8, '1 1/8', 260, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71029', '36-ESV-71007/Blende', 'FC 11-EN', 80, '1500', 8, '1 1/8', 260, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71030', '36-ESV-71007', 'FC 11-EN', 80, '1500', 8, '1 1/8', 230, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R35'),
('36-FL-71031', '36-V-71001', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-71032', '36-V-71001', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67')
ON CONFLICT (tag_nummer) DO NOTHING;
