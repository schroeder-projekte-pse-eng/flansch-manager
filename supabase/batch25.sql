-- Batch 25: section 70 (36-FL-70001 to 36-FL-70052, 52 rows)
-- All FC 11-EN: '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1' / 'DIN 10269'
-- DN400: 16,'2 1/2',540 (R67), with Steckscheibe/Brillensteckscheibe: laenge=680 (R67 still)
-- DN50: 8,'7/8',155, R24
-- DN100: 8,'1 1/4',240 (R39), with Brillensteckscheibe: laenge=310
-- DN600: 16,'3 1/2',750, R79
-- DN40 (row 70041): 4,'7/8',155, R24

INSERT INTO flanschen (tag_nummer, tag_nummer_ausruestung, rohrklasse, durchmesser, druckstufe, bolzen_anzahl, bolzen_durchmesser, bolzen_laenge, bolzen_material, bolzen_norm, anzugsmoment, vorspannkraft, dichtungs_typ)
VALUES
('36-FL-70001', 'Rohrverbindung', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70002', 'Rohrverbindung', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70003', '36-V-70001', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70004', '36-V-70001', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70005', '36-V-70003', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70006', '36-V-70003/Brillensteckscheibe', 'FC 11-EN', 100, '1500', 8, '1 1/4', 310, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70007', '36-V-70005', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70008', '36-V-70005', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70009', '36-XV-70001/Steckscheibe', 'FC 11-EN', 400, '1500', 16, '2 1/2', 680, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70010', '36-XV-70001', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70011', '36-V-70007', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70012', '36-V-70007', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70013', '36-PCV-70005', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70014', '36-PCV-70005', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70015', '36-XV-70003', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70016', '36-XV-70003', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70017', '36-V-70013', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70018', '36-V-70013', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70019', '36-V-70012', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70020', '36-V-70012', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70021', 'Blindflansch', 'FC 11-EN', 600, '1500', 16, '3 1/2', 750, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R79'),
('36-FL-70022', 'Blindflansch', 'FC 11-EN', 600, '1500', 16, '3 1/2', 750, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R79'),
('36-FL-70023', 'Rohrverbindung', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70024', 'Rohrverbindung', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70025', '36-V-70002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70026', '36-V-70002', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70027', '36-V-70006', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70028', '36-V-70006', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70029', '36-XV-70008/Steckscheibe', 'FC 11-EN', 400, '1500', 16, '2 1/2', 680, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70030', '36-XV-70008', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70031', '36-V-70008', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70032', '36-V-70008', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70033', '36-PCV-70006', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70034', '36-PCV-70006', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70035', '36-XV-70004', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70036', '36-XV-70004', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70037', '36-V-70014', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70038', '36-V-70014', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70039', '36-V-70004/Brillensteckscheibe', 'FC 11-EN', 100, '1500', 8, '1 1/4', 310, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70040', '36-V-70004', 'FC 11-EN', 100, '1500', 8, '1 1/4', 240, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R39'),
('36-FL-70041', '36-TT-70001', 'FC 11-EN', 40, '1500', 4, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70042', '36-V-70000', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70043', '36-V-70000/Steckscheibe', 'FC 11-EN', 400, '1500', 16, '2 1/2', 680, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70044', '36-PIT-70004', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70045', '36-PIT-70004', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70046', 'Rohrverbindung', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70047', 'Blindflansch', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R79'),
('36-FL-70048', '36-V-70009', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70049', '36-V-70009', 'FC 11-EN', 50, '1500', 8, '7/8', 155, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R24'),
('36-FL-70050', 'Rohrverbindung', 'FC 11-EN', 400, '1500', 16, '2 1/2', 540, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R67'),
('36-FL-70051', 'Rohrverbindung', 'FC 11-EN', 600, '1500', 16, '3 1/2', 750, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R79'),
('36-FL-70052', 'Rohrverbindung', 'FC 11-EN', 600, '1500', 16, '3 1/2', 750, '25CrMo4 lamellenverz., 2x aufgem.,B.:3.2,M.:3.1', 'DIN 10269', 0, 0, 'R79')
ON CONFLICT (tag_nummer) DO NOTHING;
