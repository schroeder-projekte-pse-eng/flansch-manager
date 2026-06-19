import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ScanLine,
  Wrench,
  FolderPlus,
  ChevronRight,
  X,
  Plus,
  Check,
  AlertTriangle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { db, type Projekt, type StatusHistorie } from '../db/database';
import StatusBadge from '../components/StatusBadge';
import { useRealtimeQuery } from '../hooks/useRealtimeQuery';

const STATUS_LABELS: Record<string, string> = {
  VERSCHLOSSEN: 'Fest verschlossen',
  GEOEFFNET: 'Geöffnet',
  PRUEFEN: 'Auf Dichtheit zu prüfen',
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function FlangeDetailPage() {
  const { tagNummer } = useParams<{ tagNummer: string }>();
  const navigate = useNavigate();
  const [showProjektModal, setShowProjektModal] = useState(false);
  const [neuerProjektName, setNeuerProjektName] = useState('');
  const [neuerProjektBeschreibung, setNeuerProjektBeschreibung] = useState('');
  const [showNeuesProjekt, setShowNeuesProjekt] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [alreadyInMsg, setAlreadyInMsg] = useState('');
  const [showAllHistory, setShowAllHistory] = useState(false);

  const tag = decodeURIComponent(tagNummer ?? '');
  const flansch = useRealtimeQuery(() => db.flanschen.getByTag(tag), ['flanschen'], [tag]);

  const projekte = useRealtimeQuery(() => db.projekte.getAll(), ['projekte'], []);

  const projektZuordnungen = useRealtimeQuery(
    () => flansch ? db.projektFlanschen.getByFlanschId(flansch.id) : Promise.resolve([]),
    ['projekt_flanschen'],
    [flansch?.id]
  );

  const historieEntries = useRealtimeQuery(
    () => flansch ? db.statusHistorie.getByFlanschId(flansch.id) : Promise.resolve([]),
    ['status_historie'],
    [flansch?.id]
  );

  if (flansch === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!flansch) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <p className="text-slate-500">Flansch nicht gefunden.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-700 font-medium hover:underline"
        >
          Zurück zum Scanner
        </button>
      </div>
    );
  }

  const inProjektAufnehmen = async (projekt: Projekt) => {
    const exists = await db.projektFlanschen.exists(projekt.id, flansch.id);
    if (exists) {
      setAlreadyInMsg(`Dieser Flansch ist bereits im Projekt "${projekt.name}" vorhanden.`);
      return;
    }
    await db.projektFlanschen.add({ projektId: projekt.id, flanschId: flansch.id });
    setSuccessMsg(`Flansch wurde dem Projekt "${projekt.name}" hinzugefügt.`);
    setShowProjektModal(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const neuesProjektErstellen = async () => {
    if (!neuerProjektName.trim()) return;
    const id = await db.projekte.add({
      name: neuerProjektName.trim(),
      beschreibung: neuerProjektBeschreibung.trim(),
    });
    await db.projektFlanschen.add({ projektId: id, flanschId: flansch.id });
    setNeuerProjektName('');
    setNeuerProjektBeschreibung('');
    setShowNeuesProjekt(false);
    setShowProjektModal(false);
    setSuccessMsg(`Neues Projekt "${neuerProjektName.trim()}" erstellt und Flansch hinzugefügt.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const assignedProjektIds = new Set(projektZuordnungen?.map(pf => pf.projektId));

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm"
      >
        <ArrowLeft size={16} />
        Zurück zum Scanner
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">
              Flansch TAG
            </p>
            <h2 className="text-2xl font-bold text-slate-900">{flansch.tagNummer}</h2>
            <p className="text-slate-500 text-sm mt-0.5">{flansch.tagNummerAusruestung}</p>
          </div>
          <StatusBadge status={flansch.status} large />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-700 mb-4">Technische Daten</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
          <DataRow label="Rohrklasse" value={flansch.rohrklasse} />
          <DataRow label="Durchmesser" value={`DN ${flansch.durchmesser}`} />
          <DataRow label="Druckstufe" value={`# ${flansch.druckstufe}`} />
          <DataRow label="Bolzenanzahl" value={`${flansch.bolzenAnzahl} Stk.`} />
          <DataRow label="Bolzendurchmesser" value={`${flansch.bolzenDurchmesser}"`} />
          <DataRow label="Bolzenlänge" value={`${flansch.bolzenLaenge} mm`} />
          <DataRow label="Bolzenmaterial" value={flansch.bolzenMaterial} />
          <DataRow label="Bolzennorm" value={flansch.bolzenNorm} />
          <DataRow label="Anzugsmoment" value={`${flansch.anzugsmoment} Nm`} />
          <DataRow label="Vorspannkraft" value={`${flansch.vorspannkraft} kN`} />
          <DataRow label="Dichtungstyp" value={flansch.dichtungsTyp} span />
        </div>
      </div>

      {successMsg && (
        <div className="flex gap-2 items-center bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm">
          <Check size={16} className="shrink-0" />
          {successMsg}
        </div>
      )}
      {alreadyInMsg && (
        <div className="flex gap-2 items-center bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-sm">
          <AlertTriangle size={16} className="shrink-0" />
          {alreadyInMsg}
          <button onClick={() => setAlreadyInMsg('')} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => { setAlreadyInMsg(''); setShowProjektModal(true); }}
          className="flex items-center justify-center gap-2 bg-white border border-slate-300
            hover:border-blue-400 hover:bg-blue-50 text-slate-700 font-medium py-3 px-4 rounded-xl
            transition-colors shadow-sm"
        >
          <FolderPlus size={18} className="text-blue-600" />
          In Projekt aufnehmen
        </button>

        <button
          onClick={() => navigate(`/flansch/${encodeURIComponent(flansch.tagNummer)}/bearbeitung`)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800
            text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm"
        >
          <Wrench size={18} />
          Bearbeitung starten
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 bg-white border border-slate-300
            hover:border-slate-400 text-slate-700 font-medium py-3 px-4 rounded-xl
            transition-colors shadow-sm"
        >
          <ScanLine size={18} className="text-slate-500" />
          Erneut scannen
        </button>
      </div>

      {historieEntries && historieEntries.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              Statushistorie
            </h3>
            {historieEntries.length > 4 && (
              <button
                onClick={() => setShowAllHistory(true)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Alle ({historieEntries.length})
              </button>
            )}
          </div>
          <div className="space-y-2">
            {historieEntries.slice(0, 4).map(entry => (
              <HistorieEintrag key={entry.id} entry={entry} />
            ))}
          </div>
          {historieEntries.length > 4 && (
            <button
              onClick={() => setShowAllHistory(true)}
              className="mt-3 w-full text-center text-xs text-blue-600 hover:text-blue-800 font-medium py-1.5"
            >
              Alle {historieEntries.length} Einträge anzeigen
            </button>
          )}
        </div>
      )}

      {showAllHistory && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">
                Statushistorie · {flansch.tagNummer}
              </h3>
              <button onClick={() => setShowAllHistory(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5 space-y-2">
              {historieEntries?.map(entry => (
                <HistorieEintrag key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      )}

      {showProjektModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">In Projekt aufnehmen</h3>
              <button
                onClick={() => { setShowProjektModal(false); setShowNeuesProjekt(false); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-5 space-y-3">
              {projekte && projekte.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Vorhandene Projekte
                  </p>
                  {projekte.map(p => (
                    <button
                      key={p.id}
                      onClick={() => inProjektAufnehmen(p)}
                      className="w-full text-left flex items-center justify-between p-3 border border-slate-200
                        rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                    >
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{p.name}</p>
                        {p.beschreibung && (
                          <p className="text-xs text-slate-500 mt-0.5">{p.beschreibung}</p>
                        )}
                        {assignedProjektIds.has(p.id) && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                            <Check size={12} /> Bereits zugeordnet
                          </span>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {!showNeuesProjekt ? (
                <button
                  onClick={() => setShowNeuesProjekt(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed
                    border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-700
                    font-medium py-3 rounded-xl transition-colors"
                >
                  <Plus size={18} />
                  Neues Projekt erstellen
                </button>
              ) : (
                <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 space-y-3">
                  <p className="font-medium text-blue-800 text-sm">Neues Projekt</p>
                  <input
                    type="text"
                    value={neuerProjektName}
                    onChange={e => setNeuerProjektName(e.target.value)}
                    placeholder="Projektname *"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <textarea
                    value={neuerProjektBeschreibung}
                    onChange={e => setNeuerProjektBeschreibung(e.target.value)}
                    placeholder="Beschreibung (optional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowNeuesProjekt(false)}
                      className="flex-1 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-white"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={neuesProjektErstellen}
                      disabled={!neuerProjektName.trim()}
                      className="flex-1 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium
                        hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Erstellen & zuordnen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HistorieEintrag({ entry }: { entry: StatusHistorie }) {
  const person = entry.flanschManager || entry.bauleiter;
  return (
    <div className="flex gap-3 border-l-2 border-slate-200 pl-3 py-0.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500">{STATUS_LABELS[entry.vonStatus] ?? entry.vonStatus}</span>
          <ArrowRight size={11} className="text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">{STATUS_LABELS[entry.nachStatus] ?? entry.nachStatus}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-slate-400">{formatDateTime(entry.zeitstempel)}</span>
          {person && <span className="text-xs text-slate-500">· {person}</span>}
        </div>
        {entry.pruefdruck1 != null && (
          <p className="text-xs text-slate-500 mt-0.5">
            Drücke: {entry.pruefdruck1} bar
            {entry.pruefdruck2 != null && ` / ${entry.pruefdruck2} bar`}
            {entry.pruefdruck3 != null && ` / ${entry.pruefdruck3} bar`}
            {entry.pruefErgebnis1 && (
              <span className={`ml-1.5 font-semibold ${entry.pruefErgebnis1 === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
                {entry.pruefErgebnis1}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function DataRow({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? 'col-span-2 sm:col-span-3' : ''}>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
    </div>
  );
}
