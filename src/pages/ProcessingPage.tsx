import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, LockOpen, Lock, ClipboardCheck,
  X, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { db, type FlanschStatus } from '../db/database';
import { useRealtimeQuery } from '../hooks/useRealtimeQuery';

type PruefErgebnis = 'OK' | 'NOK' | '';

/* ── Bolt-data popup ── */
function BolzendatenModal({
  flansch,
  onConfirm,
  onCancel,
}: {
  flansch: { bolzenAnzahl: number; bolzenDurchmesser: string; bolzenLaenge: number; bolzenMaterial: string; bolzenNorm: string; dichtungsTyp: string; anzugsmoment: number; vorspannkraft: number };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Einbaudaten bestätigen</h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-slate-600">Bitte prüfen Sie die Einbaudaten vor dem Schließen:</p>
          <div className="bg-slate-50 rounded-xl p-4 space-y-2.5">
            <Row label="Bolzenanzahl" value={`${flansch.bolzenAnzahl} Stück`} />
            <Row label="Bolzengröße" value={`${flansch.bolzenDurchmesser} × ${flansch.bolzenLaenge} mm`} />
            <Row label="Bolzenmaterial" value={flansch.bolzenMaterial} />
            <Row label="Bolzennorm" value={flansch.bolzenNorm} />
            <div className="border-t border-slate-200 pt-2.5">
              <Row label="Dichtungstyp" value={flansch.dichtungsTyp} />
            </div>
            <div className="border-t border-slate-200 pt-2.5">
              <Row label="Anzugsmoment" value={`${flansch.anzugsmoment} Nm`} highlight />
              <Row label="Vorspannkraft" value={`${flansch.vorspannkraft} kN`} highlight />
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button onClick={onCancel} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
            Abbrechen
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-sm font-semibold">
            Verbindung schließen
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-blue-700' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}

function ErgebnisChip({ value, onChange }: { value: PruefErgebnis; onChange: (v: PruefErgebnis) => void }) {
  return (
    <div className="flex gap-1 shrink-0">
      {(['OK', 'NOK'] as const).map(v => (
        <button key={v} type="button" onClick={() => onChange(value === v ? '' : v)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors
            ${value === v
              ? v === 'OK' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'
              : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'}`}
        >{v}</button>
      ))}
    </div>
  );
}

/* ── Main ── */
export default function ProcessingPage() {
  const { tagNummer } = useParams<{ tagNummer: string }>();
  const navigate = useNavigate();

  const [bauleiter, setBauleiter] = useState('');
  const [flanschManager, setFlanschManager] = useState('');
  const [showBolzenModal, setShowBolzenModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [pruefdruck1, setPruefdruck1] = useState('');
  const [pruefdruck2, setPruefdruck2] = useState('');
  const [pruefdruck3, setPruefdruck3] = useState('');
  const [ergebnis1, setErgebnis1] = useState<PruefErgebnis>('');
  const [ergebnis2, setErgebnis2] = useState<PruefErgebnis>('');
  const [ergebnis3, setErgebnis3] = useState<PruefErgebnis>('');

  const tag = decodeURIComponent(tagNummer ?? '');
  const flansch = useRealtimeQuery(() => db.flanschen.getByTag(tag), ['flanschen'], [tag]);

  if (flansch === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!flansch) return <p className="text-center py-10 text-slate-500">Flansch nicht gefunden.</p>;

  const changeStatus = async (nachStatus: FlanschStatus, historyData: Record<string, unknown> = {}) => {
    const vonStatus = flansch.status;
    await db.flanschen.update(flansch.id, { status: nachStatus });
    await db.statusHistorie.add({
      flanschId: flansch.id,
      vonStatus,
      nachStatus,
      zeitstempel: new Date().toISOString(),
      ...historyData,
    } as never);
    setSuccessMsg('');
  };

  const handleOeffnen = async () => {
    if (!bauleiter.trim()) return;
    await changeStatus('GEOEFFNET', { bauleiter: bauleiter.trim() });
    setBauleiter('');
    setSuccessMsg('Flanschverbindung wurde geöffnet.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSchliessen = () => {
    if (!bauleiter.trim()) return;
    setShowBolzenModal(true);
  };

  const handleBolzenBestaetigt = async () => {
    setShowBolzenModal(false);
    await changeStatus('PRUEFEN', { bauleiter: bauleiter.trim() });
    setBauleiter('');
    setSuccessMsg('Flanschverbindung geschlossen. Status: Auf Dichtheit zu prüfen.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const pruefenValid = flanschManager.trim() && pruefdruck1.trim() && pruefdruck2.trim() && ergebnis1 && ergebnis2;

  const handleDruckpruefung = async () => {
    if (!pruefenValid) return;
    await changeStatus('VERSCHLOSSEN', {
      flanschManager: flanschManager.trim(),
      pruefdruck1: parseFloat(pruefdruck1),
      pruefdruck2: parseFloat(pruefdruck2),
      pruefdruck3: pruefdruck3 ? parseFloat(pruefdruck3) : undefined,
      pruefErgebnis1: ergebnis1,
      pruefErgebnis2: ergebnis2,
      pruefErgebnis3: ergebnis3 || undefined,
    });
    setFlanschManager('');
    setPruefdruck1(''); setPruefdruck2(''); setPruefdruck3('');
    setErgebnis1(''); setErgebnis2(''); setErgebnis3('');
    setSuccessMsg('Druckprüfung abgeschlossen. Flansch ist fest verschlossen.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const statusHeaderCfg = {
    VERSCHLOSSEN: { bg: 'bg-green-600', text: 'Fest verschlossen', icon: Lock },
    GEOEFFNET:    { bg: 'bg-red-600',   text: 'Geöffnet',          icon: LockOpen },
    PRUEFEN:      { bg: 'bg-yellow-500', text: 'Auf Dichtheit zu prüfen', icon: ClipboardCheck },
  };
  const hdr = statusHeaderCfg[flansch.status];
  const StatusIcon = hdr.icon;

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <button
        onClick={() => navigate(`/flansch/${encodeURIComponent(flansch.tagNummer)}`)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm"
      >
        <ArrowLeft size={16} />
        Zurück zu Flansch {flansch.tagNummer}
      </button>

      <div className={`${hdr.bg} rounded-2xl p-5 text-white shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <StatusIcon size={24} />
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Aktueller Status</p>
            <p className="text-xl font-bold">{hdr.text}</p>
          </div>
        </div>
        <p className="mt-2 text-white/80 text-sm font-medium">{flansch.tagNummer}</p>
      </div>

      {successMsg && (
        <div className="flex gap-2 items-center bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm">
          <CheckCircle2 size={16} className="shrink-0" />
          {successMsg}
        </div>
      )}

      {flansch.status === 'VERSCHLOSSEN' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h3 className="font-semibold text-slate-700">Flanschverbindung öffnen</h3>
          <Field label="Name Bauleiter *" value={bauleiter} onChange={setBauleiter} placeholder="Vor- und Nachname" />
          <button onClick={handleOeffnen} disabled={!bauleiter.trim()}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
              text-white font-semibold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <LockOpen size={18} />Flanschverbindung öffnen
          </button>
          {!bauleiter.trim() && <p className="flex items-center gap-1.5 text-xs text-slate-400"><AlertCircle size={12} />Bitte Namen des Bauleiters eingeben.</p>}
        </div>
      )}

      {flansch.status === 'GEOEFFNET' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h3 className="font-semibold text-slate-700">Flanschverbindung schließen</h3>
          <Field label="Name Bauleiter *" value={bauleiter} onChange={setBauleiter} placeholder="Vor- und Nachname" />
          <button onClick={handleSchliessen} disabled={!bauleiter.trim()}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600
              text-white font-semibold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Lock size={18} />Flanschverbindung schließen
          </button>
          {!bauleiter.trim() && <p className="flex items-center gap-1.5 text-xs text-slate-400"><AlertCircle size={12} />Bitte Namen des Bauleiters eingeben.</p>}
        </div>
      )}

      {flansch.status === 'PRUEFEN' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h3 className="font-semibold text-slate-700">Druckprüfung durchführen</h3>
          <Field label="Name Flanschmanager *" value={flanschManager} onChange={setFlanschManager} placeholder="Vor- und Nachname" />
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600">Prüfdrücke</p>
            <PruefdruckRow label="Prüfdruck 1 *" value={pruefdruck1} onChange={setPruefdruck1} ergebnis={ergebnis1} onErgebnisChange={setErgebnis1} />
            <PruefdruckRow label="Prüfdruck 2 *" value={pruefdruck2} onChange={setPruefdruck2} ergebnis={ergebnis2} onErgebnisChange={setErgebnis2} />
            <PruefdruckRow label="Prüfdruck 3 (optional)" value={pruefdruck3} onChange={setPruefdruck3} ergebnis={ergebnis3} onErgebnisChange={setErgebnis3} />
          </div>
          <button onClick={handleDruckpruefung} disabled={!pruefenValid}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700
              text-white font-semibold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <ClipboardCheck size={18} />Druckprüfung abgeschlossen
          </button>
          {!pruefenValid && <p className="flex items-center gap-1.5 text-xs text-slate-400"><AlertCircle size={12} />Flanschmanager, Prüfdruck 1 & 2 sowie OK/NOK-Ergebnisse sind Pflichtfelder.</p>}
        </div>
      )}

      {showBolzenModal && (
        <BolzendatenModal flansch={flansch} onConfirm={handleBolzenBestaetigt} onCancel={() => setShowBolzenModal(false)} />
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  );
}

function PruefdruckRow({ label, value, onChange, ergebnis, onErgebnisChange }: { label: string; value: string; onChange: (v: string) => void; ergebnis: PruefErgebnis; onErgebnisChange: (v: PruefErgebnis) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder="bar"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <ErgebnisChip value={ergebnis} onChange={onErgebnisChange} />
      </div>
    </div>
  );
}
