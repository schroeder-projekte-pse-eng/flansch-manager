import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { db, type FlanschStatus } from '../db/database';
import StatusBadge from '../components/StatusBadge';
import { useRealtimeQuery } from '../hooks/useRealtimeQuery';

const STATUS_ORDER: FlanschStatus[] = ['GEOEFFNET', 'PRUEFEN', 'VERSCHLOSSEN'];

const GROUP_LABEL: Record<FlanschStatus, string> = {
  GEOEFFNET: 'Geöffnet',
  PRUEFEN: 'Auf Dichtheit zu prüfen',
  VERSCHLOSSEN: 'Fest verschlossen',
};

const GROUP_BG: Record<FlanschStatus, string> = {
  GEOEFFNET: 'bg-red-600',
  PRUEFEN: 'bg-yellow-500',
  VERSCHLOSSEN: 'bg-green-600',
};

export default function OverviewPage() {
  const [search, setSearch] = useState('');

  const flanschen = useRealtimeQuery(() => db.flanschen.getAll(), ['flanschen'], []);

  const filtered = flanschen?.filter(f => {
    const q = search.toLowerCase();
    return (
      f.tagNummer.toLowerCase().includes(q) ||
      f.tagNummerAusruestung.toLowerCase().includes(q) ||
      f.rohrklasse.toLowerCase().includes(q)
    );
  });

  const grouped = STATUS_ORDER.map(status => ({
    status,
    items: filtered?.filter(f => f.status === status) ?? [],
  }));

  const total = flanschen?.length ?? 0;
  const offen = flanschen?.filter(f => f.status === 'GEOEFFNET').length ?? 0;
  const pruefen = flanschen?.filter(f => f.status === 'PRUEFEN').length ?? 0;
  const verschlossen = flanschen?.filter(f => f.status === 'VERSCHLOSSEN').length ?? 0;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Übersicht</h1>
        <p className="text-slate-500 text-sm mt-0.5">{total} Flanschverbindungen gesamt</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <SummaryCard label="Geöffnet" count={offen} bg="bg-red-600" />
        <SummaryCard label="Zu prüfen" count={pruefen} bg="bg-yellow-500" />
        <SummaryCard label="Verschlossen" count={verschlossen} bg="bg-green-600" />
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Suchen nach TAG-Nummer, Ausrüstung, Rohrklasse…"
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {grouped.map(({ status, items }) => (
        items.length === 0 ? null : (
          <div key={status} className="space-y-2">
            <div className={`${GROUP_BG[status]} rounded-xl px-4 py-2.5 flex items-center justify-between`}>
              <span className="text-white font-semibold text-sm">{GROUP_LABEL[status]}</span>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {items.map(f => (
                <Link
                  key={f.id}
                  to={`/flansch/${encodeURIComponent(f.tagNummer)}`}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3.5
                    hover:border-blue-300 hover:bg-blue-50 transition-colors shadow-sm group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800 text-sm">{f.tagNummer}</span>
                      <span className="text-xs text-slate-400">{f.tagNummerAusruestung}</span>
                    </div>
                    <div className="flex gap-3 mt-1 text-xs text-slate-500">
                      <span>DN {f.durchmesser}</span>
                      <span># {f.druckstufe}</span>
                      <span>{f.rohrklasse}</span>
                    </div>
                  </div>
                  <StatusBadge status={f.status} />
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )
      ))}

      {filtered?.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <p className="text-slate-500 font-medium">Keine Ergebnisse für „{search}"</p>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, count, bg }: { label: string; count: number; bg: string }) {
  return (
    <div className={`${bg} rounded-xl p-3.5 text-white text-center shadow-sm`}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-xs font-medium text-white/80 mt-0.5">{label}</p>
    </div>
  );
}
