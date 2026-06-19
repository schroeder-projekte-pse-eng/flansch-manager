-- Batch 32: section 52-02 (41-FL-52-02001 to 43-FL-52-02054, 54 rows) — FINAL BATCH
-- Mixed AC 11 and AS 20, druckstufe='150'
-- AC 11: 'A 320 Grade L7, mit 2 aufgeschr. Muttern' / 'ASME B 18 2.1' (most rows)
-- Rows 52-02033/34/41/42: AC 11 with material '1.4404+AT, 2 aufgeschr. Muttern,Z: 3.1/3.1' (stored as-is from source)
-- AS 20 rows (52-02038/39/40/46-50): 'A 320 Grade L7, mit 2 aufgeschr. Muttern' (unusual but stored as-is)
-- dichtungs_typ='Graphit, kammprofiliert, SS 316' for all rows
-- Row 52-02011: ausruestung decoded from Latin-1 double-encoding ('BehÃ¤lteranschluÃ' → 'Behälteranschluss')
-- Row 52-02015: same decoding pattern
-- Rows 52-02039/40/47/48/49/50/51/52/53/54: 43-FL prefix

INSERT INTO flanschen (tag_nummer, tag_nummer_ausruestung, rohrklasse, durchmesser, druckstufe, bolzen_anzahl, bolzen_durchmesser, bolzen_laenge, bolzen_material, bolzen_norm, anzugsmoment, vorspannkraft, dichtungs_typ)
VALUES
('41-FL-52-02001', '41-V-52046', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02002', '41-V-52046', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02003', '41-V-52025', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02004', '41-V-52025', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02005', '41VC52043', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02006', '41VC52043', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02007', '41-V-52027', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02008', '41-V-52027', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02009', '41-V-52009', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02010', '41-V-52009', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02011', '41VL002/Behälteranschlussunt./Brillenstecksch.', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02012', '41-V-52004', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02013', '41-V-52004', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02014', 'LIA52016', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02015', '41VL002/Behälteranschlussob./Brillenstecksch.', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02016', '41-V-52040', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02017', '41-V-52040', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02018', '41-LI-52015', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02019', '41-V-52021', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02020', '41-V-52021', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02021', '41-C-52001', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02022', '41-C-52001', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02023', '41-V-52042', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02024', '41-V-52042', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02025', '41-PCV-52004A', 'AC 11', 25, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02026', '41-PCV-52004A', 'AC 11', 25, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02027', '41-V-52018', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02028', '41-V-52018', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02029', '41-V-52022', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02030', '41-V-52022', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02031', '41-PCV-52002B', 'AC 11', 25, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02032', '41-PCV-52002B', 'AC 11', 25, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02033', '41-V-52012', 'AC 11', 80, '150', 8, '5/8', 100, '1.4404+AT, 2 aufgeschr. Muttern,Z: 3.1/3.1', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02034', '41-V-52012', 'AC 11', 80, '150', 8, '5/8', 100, '1.4404+AT, 2 aufgeschr. Muttern,Z: 3.1/3.1', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02035', '41-V-52013', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02036', '41-V-52013', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02037', '41-PSV-52002', 'AC 11', 25, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02038', '41-PSV-52002', 'AS 20', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02039', '43-V-52040', 'AS 20', 100, '150', 8, '5/8', 100, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02040', '43-V-52040', 'AS 20', 100, '150', 8, '5/8', 100, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02041', '41-V-52015', 'AC 11', 80, '150', 8, '5/8', 100, '1.4404+AT, 2 aufgeschr. Muttern,Z: 3.1/3.1', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02042', '41-V-52015', 'AC 11', 80, '150', 8, '5/8', 100, '1.4404+AT, 2 aufgeschr. Muttern,Z: 3.1/3.1', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02043', '41-V-52016', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02044', '41-V-52016', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02045', '41-PSV-52003', 'AC 11', 25, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('41-FL-52-02046', '41-PSV-52003', 'AS 20', 50, '150', 4, '5/8', 155, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02047', '43-V-52041', 'AS 20', 100, '150', 8, '5/8', 155, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02048', '43-V-52041', 'AS 20', 100, '150', 8, '5/8', 155, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02049', '41-V-52020', 'AS 20', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02050', '41-V-52020', 'AS 20', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02051', '41-V-52047', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02052', '41-V-52047', 'AC 11', 50, '150', 4, '5/8', 90, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02053', '41-V-52019', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316'),
('43-FL-52-02054', '41-V-52019', 'AC 11', 20, '150', 4, '1/2', 80, 'A 320 Grade L7, mit 2 aufgeschr. Muttern', 'ASME B 18 2.1', 0, 0, 'Graphit, kammprofiliert, SS 316')
ON CONFLICT (tag_nummer) DO NOTHING;
