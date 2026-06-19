import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, ChevronRight, Trash2, X } from 'lucide-react';
import { db } from '../db/database';
import { useRealtimeQuery } from '../hooks/useRealtimeQuery';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const projekte = useRealtimeQuery(() => db.projekte.getAll(), ['projekte'], []);
  const flanschCount = useRealtimeQuery(
    () => db.projektFlanschen.getCountsByProjektId(),
    ['projekt_flanschen'],
    []
  );

  const handleCreate = async () => {
    if (!name.trim()) return;
    await db.projekte.add({ name: name.trim(), beschreibung: beschreibung.trim() });
    setName('');
    setBeschreibung('');
    setShowNew(false);
  };

  const handleDelete = async (id: number) => {
    await db.projekte.delete(id);
    setConfirmDelete(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Projekte</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {projekte?.length ?? 0} Projekte vorhanden
          </p>
        </div>
        <button
          onClick={() => setShowNew(v => !v)}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white
            font-medium px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          {showNew ? <X size={16} /> : <Plus size={16} />}
          {showNew ? 'Abbrechen' : 'Neues Projekt'}
        </button>
      </div>

      {showNew && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-semibold text-blue-800">Neues Projekt anlegen</h3>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Projektname *"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={beschreibung}
            onChange={e => setBeschreibung(e.target.value)}
            placeholder="Beschreibung (optional)"
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5
              rounded-xl text-sm disabled:opacity-50 transition-colors"
          >
            Projekt erstellen
          </button>
        </div>
      )}

      {!projekte ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projekte.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <FolderOpen size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">Noch keine Projekte vorhanden</p>
          <p className="text-slate-400 text-sm mt-1">
            Erstellen Sie ein neues Projekt oder nehmen Sie Flansche über den Scanner auf.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {projekte.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => navigate(`/projekte/${p.id}`)}
                className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <FolderOpen size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{p.name}</p>
                  {p.beschreibung && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{p.beschreibung}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    {flanschCount?.[p.id] ?? '…'} Flanschverbindungen ·{' '}
                    {new Date(p.erstelltAm).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <ChevronRight size={18} className="text-slate-400 shrink-0" />
              </button>
              <div className="border-t border-slate-100 px-4 py-2 flex justify-end">
                <button
                  onClick={() => setConfirmDelete(p.id)}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  <Trash2 size={13} />
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 space-y-4">
            <h3 className="font-bold text-slate-800">Projekt löschen?</h3>
            <p className="text-sm text-slate-600">
              Das Projekt und alle Flansch-Zuordnungen werden entfernt. Die Flanschdaten
              bleiben erhalten.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-600 hover:bg-slate-50"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold"
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
