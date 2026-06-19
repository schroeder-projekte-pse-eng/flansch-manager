import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { db } from '../db/database';
import StatusBadge from '../components/StatusBadge';
import { useRealtimeQuery } from '../hooks/useRealtimeQuery';

export default function FlangeDataPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const flanschen = useRealtimeQuery(() => db.flanschen.getAll(), ['flanschen'], []);

  const filtered = flanschen?.filter(f => {
    const q = search.toLowerCase();
    return (
      f.tagNummer.toLowerCase().includes(q) ||
      f.tagNummerAusruestung.toLowerCase().includes(q) ||
      f.rohrklasse.toLowerCase().includes(q) ||
      f.dichtungsTyp.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: number) => {
    await db.flanschen.delete(id);
    setConfirmDelete(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Flanschdaten</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {flanschen?.length ?? 0} Flanschverbindungen in der Datenbank
          </p>
        </div>
        <button
          onClick={() => navigate('/flanschen/neu/bearbeiten')}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white
            font-medium px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus size={16} />
          Neuer Flansch
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Suchen nach TAG, Ausrüstung, Rohrklasse…"
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase tracking-wide">
              <th className="px-4 py-3 text-left">TAG-Flansch</th>
              <th className="px-4 py-3 text-left">Ausrüstung</th>
              <th className="px-4 py-3 text-left">DN</th>
              <th className="px-4 py-3 text-left">PN</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered?.map(f => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-800">
                  <Link
                    to={`/flansch/${encodeURIComponent(f.tagNummer)}`}
                    className="hover:text-blue-700 hover:underline"
                  >
                    {f.tagNummer}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{f.tagNummerAusruestung}</td>
                <td className="px-4 py-3 text-slate-600">DN {f.durchmesser}</td>
                <td className="px-4 py-3 text-slate-600"># {f.druckstufe}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={f.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/flanschen/${f.id}/bearbeiten`)}
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(f.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      title="Löschen"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered?.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">Keine Einträge gefunden.</div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {filtered?.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Link
              to={`/flansch/${encodeURIComponent(f.tagNummer)}`}
              className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{f.tagNummer}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {f.tagNummerAusruestung} · DN {f.durchmesser} · # {f.druckstufe}
                </p>
              </div>
              <StatusBadge status={f.status} />
              <ChevronRight size={16} className="text-slate-400 shrink-0" />
            </Link>
            <div className="border-t border-slate-100 px-4 py-2 flex justify-end gap-4">
              <button
                onClick={() => navigate(`/flanschen/${f.id}/bearbeiten`)}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                <Edit2 size={13} />
                Bearbeiten
              </button>
              <button
                onClick={() => setConfirmDelete(f.id)}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium"
              >
                <Trash2 size={13} />
                Löschen
              </button>
            </div>
          </div>
        ))}
        {filtered?.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            Keine Einträge gefunden.
          </div>
        )}
      </div>

      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 space-y-4">
            <h3 className="font-bold text-slate-800">Flansch löschen?</h3>
            <p className="text-sm text-slate-600">
              Alle Daten, Projektzuordnungen und Statusverläufe dieses Flansches werden
              dauerhaft gelöscht.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
