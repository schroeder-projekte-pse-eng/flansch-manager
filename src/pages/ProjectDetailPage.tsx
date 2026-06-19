import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ScanLine,
  Plus,
  X,
  Search,
  Trash2,
  ChevronRight,
  Package,
  Users,
  CheckSquare,
  Square,
} from 'lucide-react';
import { db, type Flansch, type FlanschStatus } from '../db/database';
import StatusBadge from '../components/StatusBadge';
import { useRealtimeQuery } from '../hooks/useRealtimeQuery';

// ── Materialliste helpers ───────────────────────────────────────────────────

interface BolzenPosten {
  durchmesser: string;
  laenge: number;
  material: string;
  norm: string;
  anzahl: number;
}

function generateMaterialliste(flansche: Flansch[]) {
  const bolzenMap = new Map<string, BolzenPosten>();
  for (const f of flansche) {
    const key = `${f.bolzenDurchmesser}|${f.bolzenLaenge}|${f.bolzenMaterial}|${f.bolzenNorm}`;
    const ex = bolzenMap.get(key);
    if (ex) {
      ex.anzahl += f.bolzenAnzahl;
    } else {
      bolzenMap.set(key, {
        durchmesser: f.bolzenDurchmesser,
        laenge: f.bolzenLaenge,
        material: f.bolzenMaterial,
        norm: f.bolzenNorm,
        anzahl: f.bolzenAnzahl,
      });
    }
  }
  const dichtungMap = new Map<string, number>();
  for (const f of flansche) {
    dichtungMap.set(f.dichtungsTyp, (dichtungMap.get(f.dichtungsTyp) ?? 0) + 1);
  }
  return {
    bolzen: Array.from(bolzenMap.values()).sort((a, b) => a.durchmesser.localeCompare(b.durchmesser)),
    dichtungen: Array.from(dichtungMap.entries())
      .map(([typ, anzahl]) => ({ typ, anzahl }))
      .sort((a, b) => a.typ.localeCompare(b.typ)),
  };
}

// ── Component ───────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { projektId } = useParams<{ projektId: string }>();
  const navigate = useNavigate();
  const id = Number(projektId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmRemove, setConfirmRemove] = useState<number | null>(null);
  const [showMaterialliste, setShowMaterialliste] = useState(false);

  const [batchMode, setBatchMode] = useState(false);
  const [batchFilter, setBatchFilter] = useState<FlanschStatus>('PRUEFEN');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [batchBauleiter, setBatchBauleiter] = useState('');
  const [batchFlanschManager, setBatchFlanschManager] = useState('');
  const [batchDruck1, setBatchDruck1] = useState('');
  const [batchDruck2, setBatchDruck2] = useState('');
  const [batchDruck3, setBatchDruck3] = useState('');
  const [batchErgebnis1, setBatchErgebnis1] = useState<'OK' | 'NOK' | ''>('');
  const [batchErgebnis2, setBatchErgebnis2] = useState<'OK' | 'NOK' | ''>('');
  const [batchErgebnis3, setBatchErgebnis3] = useState<'OK' | 'NOK' | ''>('');
  const [batchSuccessMsg, setBatchSuccessMsg] = useState('');

  const projekt = useRealtimeQuery(() => db.projekte.getById(id), ['projekte'], [id]);

  // Fetches all flansche belonging to this project in one combined query
  const flanschen = useRealtimeQuery(
    async () => {
      const pfs = await db.projektFlanschen.getByProjektId(id);
      return db.flanschen.getByIds(pfs.map(pf => pf.flanschId));
    },
    ['projekt_flanschen', 'flanschen'],
    [id]
  );

  const alleFlanschen = useRealtimeQuery(() => db.flanschen.getAll(), ['flanschen'], []);

  // Derived
  const assignedIds = new Set(flanschen?.map(f => f.id) ?? []);
  const filteredAll = alleFlanschen?.filter(f =>
    f.tagNummer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.tagNummerAusruestung.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const statusCounts = flanschen ? {
    GEOEFFNET: flanschen.filter(f => f.status === 'GEOEFFNET').length,
    PRUEFEN: flanschen.filter(f => f.status === 'PRUEFEN').length,
    VERSCHLOSSEN: flanschen.filter(f => f.status === 'VERSCHLOSSEN').length,
  } : null;
  const materialliste = useMemo(
    () => (flanschen && flanschen.length > 0 ? generateMaterialliste(flanschen) : null),
    [flanschen]
  );
  const filteredForBatch = flanschen?.filter(f => f.status === batchFilter) ?? [];
  const allSelected =
    filteredForBatch.length > 0 && filteredForBatch.every(f => selectedIds.has(f.id));
  const sortedFlanschen = flanschen
    ? [...flanschen].sort((a, b) => {
        const order: Record<string, number> = { GEOEFFNET: 0, PRUEFEN: 1, VERSCHLOSSEN: 2 };
        return order[a.status] - order[b.status];
      })
    : [];

  const batchValid = (() => {
    if (selectedIds.size === 0) return false;
    if (batchFilter === 'PRUEFEN') {
      return batchFlanschManager.trim() !== '' && batchDruck1 !== '' && batchErgebnis1 !== '';
    }
    return batchBauleiter.trim() !== '';
  })();

  const handleAdd = async (flanschId: number) => {
    await db.projektFlanschen.add({ projektId: id, flanschId });
  };

  const handleRemove = async (flanschId: number) => {
    await db.projektFlanschen.deleteByProjektFlansch(id, flanschId);
    setConfirmRemove(null);
  };

  const toggleSelect = (flanschId: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(flanschId)) next.delete(flanschId); else next.add(flanschId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredForBatch.map(f => f.id)));
    }
  };

  const switchBatchFilter = (status: FlanschStatus) => {
    setBatchFilter(status);
    setSelectedIds(new Set());
  };

  const stopBatchMode = () => {
    setBatchMode(false);
    setSelectedIds(new Set());
    setBatchBauleiter('');
    setBatchFlanschManager('');
    setBatchDruck1(''); setBatchDruck2(''); setBatchDruck3('');
    setBatchErgebnis1(''); setBatchErgebnis2(''); setBatchErgebnis3('');
    setBatchSuccessMsg('');
  };

  const applyBatchChange = async () => {
    const now = new Date().toISOString();
    const toProcess = filteredForBatch.filter(f => selectedIds.has(f.id));
    if (toProcess.length === 0) return;

    for (const f of toProcess) {
      if (batchFilter === 'VERSCHLOSSEN') {
        await db.flanschen.update(f.id, { status: 'GEOEFFNET' });
        await db.statusHistorie.add({
          flanschId: f.id, vonStatus: f.status, nachStatus: 'GEOEFFNET',
          zeitstempel: now, bauleiter: batchBauleiter.trim(),
        });
      } else if (batchFilter === 'GEOEFFNET') {
        await db.flanschen.update(f.id, { status: 'PRUEFEN' });
        await db.statusHistorie.add({
          flanschId: f.id, vonStatus: f.status, nachStatus: 'PRUEFEN',
          zeitstempel: now, bauleiter: batchBauleiter.trim(),
        });
      } else {
        await db.flanschen.update(f.id, { status: 'VERSCHLOSSEN' });
        await db.statusHistorie.add({
          flanschId: f.id, vonStatus: f.status, nachStatus: 'VERSCHLOSSEN',
          zeitstempel: now,
          flanschManager: batchFlanschManager.trim(),
          pruefdruck1: Number(batchDruck1),
          pruefdruck2: batchDruck2 ? Number(batchDruck2) : undefined,
          pruefdruck3: batchDruck3 ? Number(batchDruck3) : undefined,
          pruefErgebnis1: batchErgebnis1 || undefined,
          pruefErgebnis2: batchErgebnis2 || undefined,
          pruefErgebnis3: batchErgebnis3 || undefined,
        });
      }
    }

    setBatchSuccessMsg(`${toProcess.length} Flansche erfolgreich aktualisiert.`);
    setSelectedIds(new Set());
    setBatchBauleiter('');
    setBatchFlanschManager('');
    setBatchDruck1(''); setBatchDruck2(''); setBatchDruck3('');
    setBatchErgebnis1(''); setBatchErgebnis2(''); setBatchErgebnis3('');
    setTimeout(() => setBatchSuccessMsg(''), 4000);
  };

  if (projekt === undefined) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!projekt) {
    return <p className="text-center py-10 text-slate-500">Projekt nicht gefunden.</p>;
  }

  const batchActionLabel = batchFilter === 'PRUEFEN'
    ? 'Druckprüfung abschließen'
    : batchFilter === 'GEOEFFNET'
      ? 'Verbindungen schließen'
      : 'Verbindungen öffnen';

  const batchTargetLabel = batchFilter === 'PRUEFEN'
    ? 'Fest verschlossen'
    : batchFilter === 'GEOEFFNET'
      ? 'Auf Dichtheit zu prüfen'
      : 'Geöffnet';

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <button
        onClick={() => navigate('/projekte')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm"
      >
        <ArrowLeft size={16} />
        Alle Projekte
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-800">{projekt.name}</h2>
        {projekt.beschreibung && (
          <p className="text-slate-500 text-sm mt-1">{projekt.beschreibung}</p>
        )}
        <p className="text-xs text-slate-400 mt-2">
          Erstellt: {new Date(projekt.erstelltAm).toLocaleDateString('de-DE', {
            day: '2-digit', month: '2-digit', year: 'numeric'
          })}
        </p>
        {statusCounts && (
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
            <StatChip label="Geöffnet" count={statusCounts.GEOEFFNET} color="red" />
            <StatChip label="Zu prüfen" count={statusCounts.PRUEFEN} color="yellow" />
            <StatChip label="Verschlossen" count={statusCounts.VERSCHLOSSEN} color="green" />
          </div>
        )}
      </div>

      {!batchMode ? (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-white border border-slate-300 hover:border-blue-400
              hover:bg-blue-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm
              transition-colors shadow-sm"
          >
            <Plus size={16} className="text-blue-600" />
            Flansch hinzufügen
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 bg-white border border-slate-300 hover:border-blue-400
              hover:bg-blue-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm
              transition-colors shadow-sm"
          >
            <ScanLine size={16} className="text-blue-600" />
            Scannen
          </Link>
          {flanschen && flanschen.length > 0 && (
            <button
              onClick={() => setShowMaterialliste(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 hover:border-blue-400
                hover:bg-blue-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm
                transition-colors shadow-sm"
            >
              <Package size={16} className="text-blue-600" />
              Materialliste
            </button>
          )}
          {flanschen && flanschen.length > 1 && (
            <button
              onClick={() => setBatchMode(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 hover:border-amber-400
                hover:bg-amber-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm
                transition-colors shadow-sm"
            >
              <Users size={16} className="text-amber-600" />
              Sammelbearbeitung
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <span className="text-sm font-semibold text-amber-800 flex items-center gap-2">
            <Users size={16} />
            Sammelbearbeitung aktiv
          </span>
          <button
            onClick={stopBatchMode}
            className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 font-medium border border-amber-300 rounded-lg px-3 py-1.5"
          >
            <X size={14} />
            Beenden
          </button>
        </div>
      )}

      {batchSuccessMsg && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm">
          <CheckSquare size={16} className="shrink-0" />
          {batchSuccessMsg}
        </div>
      )}

      {batchMode && (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['PRUEFEN', 'GEOEFFNET', 'VERSCHLOSSEN'] as FlanschStatus[]).map(st => {
              const counts = statusCounts ?? { PRUEFEN: 0, GEOEFFNET: 0, VERSCHLOSSEN: 0 };
              const label = st === 'PRUEFEN' ? 'Zu prüfen' : st === 'GEOEFFNET' ? 'Geöffnet' : 'Verschlossen';
              const cnt = counts[st];
              const active = batchFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => switchBatchFilter(st)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                    ${active
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-600 hover:border-blue-300'}`}
                >
                  {label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    {cnt}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredForBatch.length > 0 && (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                {allSelected
                  ? <CheckSquare size={18} className="text-blue-600" />
                  : <Square size={18} className="text-slate-400" />
                }
                Alle auswählen ({filteredForBatch.length})
              </button>
              <span className="text-xs text-slate-500">{selectedIds.size} ausgewählt</span>
            </div>
          )}
          {filteredForBatch.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-4">
              Keine Flansche mit diesem Status im Projekt.
            </p>
          )}
        </div>
      )}

      {!flanschen ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : flanschen.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <p className="text-slate-500 font-medium">Keine Flansche im Projekt</p>
          <p className="text-slate-400 text-sm mt-1">
            Flansche über den Scanner oder den Button "Flansch hinzufügen" aufnehmen.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {(batchMode ? filteredForBatch : sortedFlanschen).map(f => (
            <div
              key={f.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-colors
                ${batchMode && selectedIds.has(f.id)
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-slate-200'}`}
            >
              {batchMode ? (
                <button
                  onClick={() => toggleSelect(f.id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-blue-50/60 transition-colors"
                >
                  {selectedIds.has(f.id)
                    ? <CheckSquare size={20} className="text-blue-600 shrink-0" />
                    : <Square size={20} className="text-slate-400 shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{f.tagNummer}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.tagNummerAusruestung} · DN {f.durchmesser} · {f.druckstufe}</p>
                  </div>
                  <StatusBadge status={f.status} />
                </button>
              ) : (
                <>
                  <Link
                    to={`/flansch/${encodeURIComponent(f.tagNummer)}`}
                    className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{f.tagNummer}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{f.tagNummerAusruestung} · DN {f.durchmesser} · {f.druckstufe}</p>
                    </div>
                    <StatusBadge status={f.status} />
                    <ChevronRight size={16} className="text-slate-400 shrink-0" />
                  </Link>
                  <div className="border-t border-slate-100 px-4 py-2 flex justify-end">
                    <button
                      onClick={() => setConfirmRemove(f.id)}
                      className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      <Trash2 size={13} />
                      Entfernen
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {batchMode && filteredForBatch.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div>
            <p className="font-semibold text-slate-800">{batchActionLabel}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Neuer Status: <span className="font-medium">{batchTargetLabel}</span>
            </p>
          </div>

          {batchFilter === 'PRUEFEN' ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Flanschmanager (Vor- und Nachname) *"
                value={batchFlanschManager}
                onChange={e => setBatchFlanschManager(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-3 gap-3">
                <DruckFeld label="Druck 1 *" value={batchDruck1} ergebnis={batchErgebnis1}
                  onValue={setBatchDruck1} onErgebnis={setBatchErgebnis1} />
                <DruckFeld label="Druck 2" value={batchDruck2} ergebnis={batchErgebnis2}
                  onValue={setBatchDruck2} onErgebnis={setBatchErgebnis2} />
                <DruckFeld label="Druck 3" value={batchDruck3} ergebnis={batchErgebnis3}
                  onValue={setBatchDruck3} onErgebnis={setBatchErgebnis3} />
              </div>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Bauleiter (Vor- und Nachname) *"
              value={batchBauleiter}
              onChange={e => setBatchBauleiter(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            onClick={applyBatchChange}
            disabled={!batchValid}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200
              disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold
              rounded-xl transition-colors text-sm"
          >
            Auf {selectedIds.size} Flansch{selectedIds.size !== 1 ? 'e' : ''} anwenden
          </button>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Flansch hinzufügen</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="TAG-Nummer suchen…"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-2">
              {filteredAll?.map(f => (
                <button
                  key={f.id}
                  onClick={() => handleAdd(f.id)}
                  disabled={assignedIds.has(f.id)}
                  className={`w-full text-left flex items-center justify-between p-3 border rounded-xl
                    transition-colors text-sm
                    ${assignedIds.has(f.id)
                      ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-default'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                >
                  <div>
                    <p className="font-medium text-slate-800">{f.tagNummer}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.tagNummerAusruestung} · DN {f.durchmesser}</p>
                  </div>
                  {assignedIds.has(f.id)
                    ? <span className="text-xs text-green-600 font-medium">Im Projekt</span>
                    : <Plus size={16} className="text-blue-600" />
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {confirmRemove !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 space-y-4">
            <h3 className="font-bold text-slate-800">Flansch entfernen?</h3>
            <p className="text-sm text-slate-600">
              Der Flansch wird aus diesem Projekt entfernt. Die Flanschdaten bleiben erhalten.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleRemove(confirmRemove)}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                Entfernen
              </button>
            </div>
          </div>
        </div>
      )}

      {showMaterialliste && materialliste && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Package size={18} className="text-blue-600" />
                  Materialliste
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{projekt.name}</p>
              </div>
              <button onClick={() => setShowMaterialliste(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5 space-y-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Schrauben / Bolzen
                </p>
                <div className="space-y-2">
                  {materialliste.bolzen.map((b, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {b.durchmesser} × {b.laenge} mm
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{b.material} · {b.norm}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-700">{b.anzahl}</p>
                        <p className="text-xs text-slate-400">Stück</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right text-xs text-slate-500">
                  Gesamt: <span className="font-semibold text-slate-700">
                    {materialliste.bolzen.reduce((s, b) => s + b.anzahl, 0)} Stück
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Dichtungen
                </p>
                <div className="space-y-2">
                  {materialliste.dichtungen.map((d, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <p className="text-sm text-slate-700 flex-1 pr-4">{d.typ}</p>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-blue-700">{d.anzahl}</p>
                        <p className="text-xs text-slate-400">Stück</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right text-xs text-slate-500">
                  Gesamt: <span className="font-semibold text-slate-700">
                    {materialliste.dichtungen.reduce((s, d) => s + d.anzahl, 0)} Stück
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center">
                Basierend auf {flanschen?.length ?? 0} Flanschverbindungen im Projekt
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DruckFeld({
  label, value, ergebnis, onValue, onErgebnis,
}: {
  label: string;
  value: string;
  ergebnis: 'OK' | 'NOK' | '';
  onValue: (v: string) => void;
  onErgebnis: (v: 'OK' | 'NOK' | '') => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <input
        type="number"
        placeholder="bar"
        value={value}
        onChange={e => onValue(e.target.value)}
        className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-1">
        {(['OK', 'NOK'] as const).map(v => (
          <button
            key={v}
            type="button"
            onClick={() => onErgebnis(ergebnis === v ? '' : v)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors
              ${ergebnis === v
                ? v === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatChip({ label, count, color }: { label: string; count: number; color: 'red' | 'yellow' | 'green' }) {
  const colors = {
    red: 'bg-red-50 text-red-700 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    green: 'bg-green-50 text-green-700 border-green-200',
  };
  return (
    <div className={`border rounded-lg p-2.5 text-center ${colors[color]}`}>
      <p className="text-xl font-bold">{count}</p>
      <p className="text-xs font-medium mt-0.5">{label}</p>
    </div>
  );
}
