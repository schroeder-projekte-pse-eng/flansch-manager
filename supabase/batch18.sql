-- Batch 18: section 48 (43-FL-48001 to 43-FL-48031, 31 rows)
-- All AS 20, material: 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1' / 'ASME B 18.2.1'
-- Dichtungs_typ: 'Graphit, kammprofiliert' for all rows
-- DN variations: 50(4,'5/8',90), 100(8,'5/8',155), 500(20,'1 1/8',150), 600(20,'1 1/4',500)

INSERT INTO flanschen (tag_nummer, tag_nummer_ausruestung, rohrklasse, durchmesser, druckstufe, bolzen_anzahl, bolzen_durchmesser, bolzen_laenge, bolzen_material, bolzen_norm, anzugsmoment, vorspannkraft, dichtungs_typ)
VALUES
('43-FL-48001', '43-C-48001', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48002', '43-C-48001', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48003', '43-V-48005', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48004', '43-V-48005', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48005', 'Blindflansch', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48006', '43-V-48006', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48007', '43-V-48006', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48008', 'Steckscheibe', 'AS 20', 100, '150', 8, '5/8', 155, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48009', '43-TIA-48006an43VD001', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48010', 'Steckscheibe', 'AS 20', 500, '150', 20, '1 1/8', 150, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48011', 'Blindflansch', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48012', 'Blindflansch', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48013', '43-V-48001', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48014', '43-V-48001', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48015', 'Rohrverbindung', 'AS 20', 600, '150', 20, '1 1/4', 500, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48016', '43-V-48002', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48017', '43-V-48002', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48018', '43-V-48003', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48019', '43-V-48003', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48020', '43-V-48018', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48021', '43-V-48018', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48022', '43-V-48010', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48023', '43-V-48010', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48024', '43-V-48009', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48025', '43-V-48009', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48026', '43-V-48008', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48027', '43-V-48008', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48028', '43-V-48007', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48029', '43-V-48007', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48030', 'Blindflansch', 'AS 20', 50, '150', 4, '5/8', 90, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert'),
('43-FL-48031', 'Steckscheibe', 'AS 20', 500, '150', 20, '1 1/8', 150, 'A320 Grade 7, 2x aufgem., B.:3.1, M.:3.1', 'ASME B 18.2.1', 0, 0, 'Graphit, kammprofiliert')
ON CONFLICT (tag_nummer) DO NOTHING;
