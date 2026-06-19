import { supabase } from '../lib/supabase';

// ── App-seitige Typen (camelCase) ────────────────────────────────────────────

export type FlanschStatus = 'VERSCHLOSSEN' | 'GEOEFFNET' | 'PRUEFEN';

export interface Flansch {
  id: number;
  tagNummer: string;
  tagNummerAusruestung: string;
  rohrklasse: string;
  durchmesser: number;
  druckstufe: string;
  bolzenAnzahl: number;
  bolzenDurchmesser: string;
  bolzenLaenge: number;
  bolzenMaterial: string;
  bolzenNorm: string;
  anzugsmoment: number;
  vorspannkraft: number;
  dichtungsTyp: string;
  status: FlanschStatus;
}

export interface Projekt {
  id: number;
  name: string;
  beschreibung: string;
  erstelltAm: string;
}

export interface ProjektFlansch {
  id: number;
  projektId: number;
  flanschId: number;
  hinzugefuegtAm: string;
}

export interface StatusHistorie {
  id: number;
  flanschId: number;
  vonStatus: string;
  nachStatus: string;
  bauleiter?: string;
  flanschManager?: string;
  pruefdruck1?: number;
  pruefdruck2?: number;
  pruefdruck3?: number;
  pruefErgebnis1?: 'OK' | 'NOK';
  pruefErgebnis2?: 'OK' | 'NOK';
  pruefErgebnis3?: 'OK' | 'NOK';
  zeitstempel: string;
}

// ── Datenbank-Zeilen-Typen (snake_case) ──────────────────────────────────────

interface FlanschRow {
  id: number;
  tag_nummer: string;
  tag_nummer_ausruestung: string;
  rohrklasse: string;
  durchmesser: number;
  druckstufe: string;
  bolzen_anzahl: number;
  bolzen_durchmesser: string;
  bolzen_laenge: number;
  bolzen_material: string;
  bolzen_norm: string;
  anzugsmoment: number;
  vorspannkraft: number;
  dichtungs_typ: string;
  status: FlanschStatus;
}

interface ProjektRow {
  id: number;
  name: string;
  beschreibung: string;
  erstellt_am: string;
}

interface ProjektFlanschRow {
  id: number;
  projekt_id: number;
  flansch_id: number;
  hinzugefuegt_am: string;
}

interface StatusHistorieRow {
  id: number;
  flansch_id: number;
  von_status: string;
  nach_status: string;
  bauleiter: string | null;
  flansch_manager: string | null;
  pruefdruck1: number | string | null;
  pruefdruck2: number | string | null;
  pruefdruck3: number | string | null;
  pruef_ergebnis1: 'OK' | 'NOK' | null;
  pruef_ergebnis2: 'OK' | 'NOK' | null;
  pruef_ergebnis3: 'OK' | 'NOK' | null;
  zeitstempel: string;
}

// ── Mapper: DB-Zeile → App-Typ ────────────────────────────────────────────────

function toFlansch(r: FlanschRow): Flansch {
  return {
    id: r.id,
    tagNummer: r.tag_nummer,
    tagNummerAusruestung: r.tag_nummer_ausruestung,
    rohrklasse: r.rohrklasse,
    durchmesser: r.durchmesser,
    druckstufe: r.druckstufe,
    bolzenAnzahl: r.bolzen_anzahl,
    bolzenDurchmesser: r.bolzen_durchmesser,
    bolzenLaenge: r.bolzen_laenge,
    bolzenMaterial: r.bolzen_material,
    bolzenNorm: r.bolzen_norm,
    anzugsmoment: r.anzugsmoment,
    vorspannkraft: r.vorspannkraft,
    dichtungsTyp: r.dichtungs_typ,
    status: r.status,
  };
}

function toProjekt(r: ProjektRow): Projekt {
  return {
    id: r.id,
    name: r.name,
    beschreibung: r.beschreibung,
    erstelltAm: r.erstellt_am,
  };
}

function toProjektFlansch(r: ProjektFlanschRow): ProjektFlansch {
  return {
    id: r.id,
    projektId: r.projekt_id,
    flanschId: r.flansch_id,
    hinzugefuegtAm: r.hinzugefuegt_am,
  };
}

function toStatusHistorie(r: StatusHistorieRow): StatusHistorie {
  return {
    id: r.id,
    flanschId: r.flansch_id,
    vonStatus: r.von_status,
    nachStatus: r.nach_status,
    bauleiter: r.bauleiter ?? undefined,
    flanschManager: r.flansch_manager ?? undefined,
    pruefdruck1: r.pruefdruck1 != null ? Number(r.pruefdruck1) : undefined,
    pruefdruck2: r.pruefdruck2 != null ? Number(r.pruefdruck2) : undefined,
    pruefdruck3: r.pruefdruck3 != null ? Number(r.pruefdruck3) : undefined,
    pruefErgebnis1: r.pruef_ergebnis1 ?? undefined,
    pruefErgebnis2: r.pruef_ergebnis2 ?? undefined,
    pruefErgebnis3: r.pruef_ergebnis3 ?? undefined,
    zeitstempel: r.zeitstempel,
  };
}

// Teilweises Update: camelCase-Objekt → snake_case für Supabase
function flanschUpdatesToRow(u: Partial<Flansch>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (u.tagNummer !== undefined)              row.tag_nummer = u.tagNummer;
  if (u.tagNummerAusruestung !== undefined)   row.tag_nummer_ausruestung = u.tagNummerAusruestung;
  if (u.rohrklasse !== undefined)             row.rohrklasse = u.rohrklasse;
  if (u.durchmesser !== undefined)            row.durchmesser = u.durchmesser;
  if (u.druckstufe !== undefined)             row.druckstufe = u.druckstufe;
  if (u.bolzenAnzahl !== undefined)           row.bolzen_anzahl = u.bolzenAnzahl;
  if (u.bolzenDurchmesser !== undefined)      row.bolzen_durchmesser = u.bolzenDurchmesser;
  if (u.bolzenLaenge !== undefined)           row.bolzen_laenge = u.bolzenLaenge;
  if (u.bolzenMaterial !== undefined)         row.bolzen_material = u.bolzenMaterial;
  if (u.bolzenNorm !== undefined)             row.bolzen_norm = u.bolzenNorm;
  if (u.anzugsmoment !== undefined)           row.anzugsmoment = u.anzugsmoment;
  if (u.vorspannkraft !== undefined)          row.vorspannkraft = u.vorspannkraft;
  if (u.dichtungsTyp !== undefined)           row.dichtungs_typ = u.dichtungsTyp;
  if (u.status !== undefined)                 row.status = u.status;
  return row;
}

// ── Datenbank-API ─────────────────────────────────────────────────────────────

export const db = {

  flanschen: {
    getAll: async (): Promise<Flansch[]> => {
      const pageSize = 1000;
      let all: FlanschRow[] = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabase
          .from('flanschen').select('*').order('tag_nummer')
          .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        all = all.concat(data as FlanschRow[]);
        if (data.length < pageSize) break;
        from += pageSize;
      }
      return all.map(toFlansch);
    },

    getByTag: async (tagNummer: string): Promise<Flansch | null> => {
      const { data, error } = await supabase
        .from('flanschen').select('*')
        .ilike('tag_nummer', tagNummer)
        .maybeSingle();
      if (error) throw error;
      return data ? toFlansch(data as FlanschRow) : null;
    },

    getById: async (id: number): Promise<Flansch | null> => {
      const { data, error } = await supabase
        .from('flanschen').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data ? toFlansch(data as FlanschRow) : null;
    },

    getByIds: async (ids: number[]): Promise<Flansch[]> => {
      if (ids.length === 0) return [];
      const { data, error } = await supabase
        .from('flanschen').select('*').in('id', ids).order('tag_nummer');
      if (error) throw error;
      return (data as FlanschRow[]).map(toFlansch);
    },

    update: async (id: number, updates: Partial<Flansch>): Promise<void> => {
      const { error } = await supabase
        .from('flanschen').update(flanschUpdatesToRow(updates)).eq('id', id);
      if (error) throw error;
    },

    add: async (f: Omit<Flansch, 'id'>): Promise<number> => {
      const { data, error } = await supabase
        .from('flanschen')
        .insert({
          tag_nummer: f.tagNummer,
          tag_nummer_ausruestung: f.tagNummerAusruestung,
          rohrklasse: f.rohrklasse,
          durchmesser: f.durchmesser,
          druckstufe: f.druckstufe,
          bolzen_anzahl: f.bolzenAnzahl,
          bolzen_durchmesser: f.bolzenDurchmesser,
          bolzen_laenge: f.bolzenLaenge,
          bolzen_material: f.bolzenMaterial,
          bolzen_norm: f.bolzenNorm,
          anzugsmoment: f.anzugsmoment,
          vorspannkraft: f.vorspannkraft,
          dichtungs_typ: f.dichtungsTyp,
          status: f.status,
        })
        .select('id').single();
      if (error) throw error;
      return (data as { id: number }).id;
    },

    delete: async (id: number): Promise<void> => {
      const { error } = await supabase.from('flanschen').delete().eq('id', id);
      if (error) throw error;
    },
  },

  projekte: {
    getAll: async (): Promise<Projekt[]> => {
      const { data, error } = await supabase
        .from('projekte').select('*').order('erstellt_am', { ascending: false });
      if (error) throw error;
      return (data as ProjektRow[]).map(toProjekt);
    },

    getById: async (id: number): Promise<Projekt | null> => {
      const { data, error } = await supabase
        .from('projekte').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data ? toProjekt(data as ProjektRow) : null;
    },

    add: async (p: Pick<Projekt, 'name' | 'beschreibung'>): Promise<number> => {
      const { data, error } = await supabase
        .from('projekte')
        .insert({ name: p.name, beschreibung: p.beschreibung })
        .select('id').single();
      if (error) throw error;
      return (data as { id: number }).id;
    },

    delete: async (id: number): Promise<void> => {
      const { error } = await supabase.from('projekte').delete().eq('id', id);
      if (error) throw error;
    },
  },

  projektFlanschen: {
    getByProjektId: async (projektId: number): Promise<ProjektFlansch[]> => {
      const { data, error } = await supabase
        .from('projekt_flanschen').select('*').eq('projekt_id', projektId);
      if (error) throw error;
      return (data as ProjektFlanschRow[]).map(toProjektFlansch);
    },

    getByFlanschId: async (flanschId: number): Promise<ProjektFlansch[]> => {
      const { data, error } = await supabase
        .from('projekt_flanschen').select('*').eq('flansch_id', flanschId);
      if (error) throw error;
      return (data as ProjektFlanschRow[]).map(toProjektFlansch);
    },

    getCountsByProjektId: async (): Promise<Record<number, number>> => {
      const { data, error } = await supabase
        .from('projekt_flanschen').select('projekt_id');
      if (error) throw error;
      const counts: Record<number, number> = {};
      for (const row of (data as { projekt_id: number }[])) {
        counts[row.projekt_id] = (counts[row.projekt_id] ?? 0) + 1;
      }
      return counts;
    },

    exists: async (projektId: number, flanschId: number): Promise<boolean> => {
      const { count, error } = await supabase
        .from('projekt_flanschen').select('id', { count: 'exact', head: true })
        .eq('projekt_id', projektId).eq('flansch_id', flanschId);
      if (error) throw error;
      return (count ?? 0) > 0;
    },

    add: async (pf: Pick<ProjektFlansch, 'projektId' | 'flanschId'>): Promise<void> => {
      const { error } = await supabase
        .from('projekt_flanschen')
        .upsert(
          { projekt_id: pf.projektId, flansch_id: pf.flanschId },
          { onConflict: 'projekt_id,flansch_id', ignoreDuplicates: true }
        );
      if (error) throw error;
    },

    deleteByProjektFlansch: async (projektId: number, flanschId: number): Promise<void> => {
      const { error } = await supabase
        .from('projekt_flanschen')
        .delete().eq('projekt_id', projektId).eq('flansch_id', flanschId);
      if (error) throw error;
    },

    deleteByFlanschId: async (flanschId: number): Promise<void> => {
      const { error } = await supabase
        .from('projekt_flanschen').delete().eq('flansch_id', flanschId);
      if (error) throw error;
    },

    deleteByProjektId: async (projektId: number): Promise<void> => {
      const { error } = await supabase
        .from('projekt_flanschen').delete().eq('projekt_id', projektId);
      if (error) throw error;
    },
  },

  statusHistorie: {
    getByFlanschId: async (flanschId: number): Promise<StatusHistorie[]> => {
      const { data, error } = await supabase
        .from('status_historie').select('*')
        .eq('flansch_id', flanschId)
        .order('zeitstempel', { ascending: false });
      if (error) throw error;
      return (data as StatusHistorieRow[]).map(toStatusHistorie);
    },

    add: async (h: Omit<StatusHistorie, 'id'>): Promise<void> => {
      const { error } = await supabase
        .from('status_historie')
        .insert({
          flansch_id: h.flanschId,
          von_status: h.vonStatus,
          nach_status: h.nachStatus,
          bauleiter: h.bauleiter ?? null,
          flansch_manager: h.flanschManager ?? null,
          pruefdruck1: h.pruefdruck1 ?? null,
          pruefdruck2: h.pruefdruck2 ?? null,
          pruefdruck3: h.pruefdruck3 ?? null,
          pruef_ergebnis1: h.pruefErgebnis1 ?? null,
          pruef_ergebnis2: h.pruefErgebnis2 ?? null,
          pruef_ergebnis3: h.pruefErgebnis3 ?? null,
          zeitstempel: h.zeitstempel,
        });
      if (error) throw error;
    },

    deleteByFlanschId: async (flanschId: number): Promise<void> => {
      const { error } = await supabase
        .from('status_historie').delete().eq('flansch_id', flanschId);
      if (error) throw error;
    },
  },
};
