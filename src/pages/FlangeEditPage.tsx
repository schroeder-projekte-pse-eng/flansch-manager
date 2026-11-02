import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { db, type FlanschStatus } from '../db/database';

const WERKZEUG_FLAECHE: Record<string, number> = {
  'SRT-1': 18.67,
  'SRT-2': 30.01,
  'SRT-3': 44.01,
  'SRT-4': 66.68,
  'SRT-5': 100.03,
  'SRT-6': 166.71,
};

const emptyForm = {
  tagNummer: '',
  tagNummerAusruestung: '',
  rohrklasse: '',
  durchmesser: '',
  druckstufe: '',
  bolzenAnzahl: '',
  bolzenDurchmesser: '',
  bolzenLaenge: '',
  bolzenMaterial: '',
  bolzenNorm: '',
  anzugsmoment: '',
  vorspannkraft: '',
  dichtungsTyp: '',
  status: 'VERSCHLOSSEN' as FlanschStatus,
  werkzeug: '' as '' | 'SRT-1' | 'SRT-2' | 'SRT-3' | 'SRT-4' | 'SRT-5' | 'SRT-6',
  druckA: '',
  druckB: '',
};

type FormState = typeof emptyForm;

export default function FlangeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'neu';

  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (isNew) return;
    db.flanschen.getById(Number(id)).then(f => {
      if (!f) return navigate('/flanschen');
      setForm({
        tagNummer: f.tagNummer,
        tagNummerAusruestung: f.tagNummerAusruestung,
        rohrklasse: f.rohrklasse,
        durchmesser: String(f.durchmesser),
        druckstufe: f.druckstufe,
        bolzenAnzahl: String(f.bolzenAnzahl),
        bolzenDurchmesser: f.bolzenDurchmesser,
        bolzenLaenge: String(f.bolzenLaenge),
        bolzenMaterial: f.bolzenMaterial,
        bolzenNorm: f.bolzenNorm,
        anzugsmoment: String(f.anzugsmoment),
        vorspannkraft: String(f.vorspannkraft),
        dichtungsTyp: f.dichtungsTyp,
        status: f.status,
        werkzeug: (f.werkzeug ?? '') as '' | 'SRT-1' | 'SRT-2' | 'SRT-3' | 'SRT-4' | 'SRT-5' | 'SRT-6',
        druckA: f.druckA != null ? String(f.druckA) : '',
        druckB: f.druckB != null ? String(f.druckB) : '',
      });
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.tagNummer.trim()) errs.tagNummer = 'Pflichtfeld';
    if (!form.tagNummerAusruestung.trim()) errs.tagNummerAusruestung = 'Pflichtfeld';
    if (!form.rohrklasse.trim()) errs.rohrklasse = 'Pflichtfeld';
    if (!form.durchmesser || isNaN(Number(form.durchmesser))) errs.durchmesser = 'Gültige Zahl eingeben';
    if (!form.druckstufe.trim()) errs.druckstufe = 'Pflichtfeld';
    if (!form.bolzenAnzahl || isNaN(Number(form.bolzenAnzahl))) errs.bolzenAnzahl = 'Gültige Zahl eingeben';
    if (!form.bolzenDurchmesser.trim()) errs.bolzenDurchmesser = 'Pflichtfeld';
    if (!form.bolzenLaenge || isNaN(Number(form.bolzenLaenge))) errs.bolzenLaenge = 'Gültige Zahl eingeben';
    if (!form.bolzenMaterial.trim()) errs.bolzenMaterial = 'Pflichtfeld';
    if (!form.bolzenNorm.trim()) errs.bolzenNorm = 'Pflichtfeld';
    if (!form.anzugsmoment || isNaN(Number(form.anzugsmoment))) errs.anzugsmoment = 'Gültige Zahl eingeben';
    if (form.druckA && isNaN(Number(form.druckA))) errs.druckA = 'Gültige Zahl eingeben';
    if (form.druckB && isNaN(Number(form.druckB))) errs.druckB = 'Gültige Zahl eingeben';
    if (!form.dichtungsTyp.trim()) errs.dichtungsTyp = 'Pflichtfeld';
    return errs;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const data = {
      tagNummer: form.tagNummer.trim().toUpperCase(),
      tagNummerAusruestung: form.tagNummerAusruestung.trim().toUpperCase(),
      rohrklasse: form.rohrklasse.trim(),
      durchmesser: Number(form.durchmesser),
      druckstufe: form.druckstufe.trim(),
      bolzenAnzahl: Number(form.bolzenAnzahl),
      bolzenDurchmesser: form.bolzenDurchmesser.trim(),
      bolzenLaenge: Number(form.bolzenLaenge),
      bolzenMaterial: form.bolzenMaterial.trim(),
      bolzenNorm: form.bolzenNorm.trim(),
      anzugsmoment: Number(form.anzugsmoment),
      vorspannkraft: form.vorspannkraft ? Number(form.vorspannkraft) : 0,
      dichtungsTyp: form.dichtungsTyp.trim(),
      status: form.status,
      werkzeug: form.werkzeug || undefined,
      druckA: form.druckA ? Number(form.druckA) : undefined,
      druckB: form.druckB ? Number(form.druckB) : undefined,
    };

    if (isNew) {
      await db.flanschen.add(data);
    } else {
      await db.flanschen.update(Number(id), data);
    }

    navigate('/flanschen');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <button
        onClick={() => navigate('/flanschen')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm"
      >
        <ArrowLeft size={16} />
        Zurück zur Flanschliste
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          {isNew ? 'Neuen Flansch anlegen' : 'Flansch bearbeiten'}
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          <Section title="Identifikation">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="TAG-Nummer Flansch *" error={errors.tagNummer}>
                <input type="text" value={form.tagNummer} onChange={set('tagNummer')}
                  placeholder="z.B. 27-XV-04006"
                  className={inputCls(!!errors.tagNummer)} />
              </FormField>
              <FormField label="TAG-Nummer Ausrüstung *" error={errors.tagNummerAusruestung}>
                <input type="text" value={form.tagNummerAusruestung} onChange={set('tagNummerAusruestung')}
                  placeholder="z.B. 27-P-04001"
                  className={inputCls(!!errors.tagNummerAusruestung)} />
              </FormField>
            </div>
          </Section>

          <Section title="Rohrleitungsdaten">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FormField label="Rohrklasse *" error={errors.rohrklasse}>
                <input type="text" value={form.rohrklasse} onChange={set('rohrklasse')}
                  placeholder="z.B. B1A"
                  className={inputCls(!!errors.rohrklasse)} />
              </FormField>
              <FormField label="Durchmesser (DN) *" error={errors.durchmesser}>
                <input type="number" value={form.durchmesser} onChange={set('durchmesser')}
                  placeholder="150"
                  className={inputCls(!!errors.durchmesser)} />
              </FormField>
              <FormField label="Druckstufe *" error={errors.druckstufe}>
                <input type="text" value={form.druckstufe} onChange={set('druckstufe')}
                  placeholder="z.B. PN16"
                  className={inputCls(!!errors.druckstufe)} />
              </FormField>
            </div>
          </Section>

          <Section title="Bolzendaten">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FormField label="Bolzenanzahl *" error={errors.bolzenAnzahl}>
                <input type="number" value={form.bolzenAnzahl} onChange={set('bolzenAnzahl')}
                  placeholder="8"
                  className={inputCls(!!errors.bolzenAnzahl)} />
              </FormField>
              <FormField label="Bolzendurchmesser *" error={errors.bolzenDurchmesser}>
                <input type="text" value={form.bolzenDurchmesser} onChange={set('bolzenDurchmesser')}
                  placeholder="M20"
                  className={inputCls(!!errors.bolzenDurchmesser)} />
              </FormField>
              <FormField label="Bolzenlänge (mm) *" error={errors.bolzenLaenge}>
                <input type="number" value={form.bolzenLaenge} onChange={set('bolzenLaenge')}
                  placeholder="90"
                  className={inputCls(!!errors.bolzenLaenge)} />
              </FormField>
              <FormField label="Bolzenmaterial *" error={errors.bolzenMaterial}>
                <input type="text" value={form.bolzenMaterial} onChange={set('bolzenMaterial')}
                  placeholder="A2-70"
                  className={inputCls(!!errors.bolzenMaterial)} />
              </FormField>
              <FormField label="Bolzennorm *" error={errors.bolzenNorm}>
                <input type="text" value={form.bolzenNorm} onChange={set('bolzenNorm')}
                  placeholder="DIN 933"
                  className={inputCls(!!errors.bolzenNorm)} />
              </FormField>
            </div>
          </Section>

          <Section title="Anzug & Dichtung">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Anzugsmoment (Nm) *" error={errors.anzugsmoment}>
                <input type="number" value={form.anzugsmoment} onChange={set('anzugsmoment')}
                  placeholder="280"
                  className={inputCls(!!errors.anzugsmoment)} />
              </FormField>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Bolttensioning</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Werkzeug">
                  <select value={form.werkzeug} onChange={set('werkzeug')} className={inputCls(false)}>
                    <option value="">— nicht verwendet —</option>
                    <option value="SRT-1">SRT-1 (A = 18,67 cm²)</option>
                    <option value="SRT-2">SRT-2 (A = 30,01 cm²)</option>
                    <option value="SRT-3">SRT-3 (A = 44,01 cm²)</option>
                    <option value="SRT-4">SRT-4 (A = 66,68 cm²)</option>
                    <option value="SRT-5">SRT-5 (A = 100,03 cm²)</option>
                    <option value="SRT-6">SRT-6 (A = 166,71 cm²)</option>
                  </select>
                </FormField>
                <FormField label="A-Druck (bar) — 1. Runde 50%" error={errors.druckA}>
                  <input type="number" value={form.druckA} onChange={set('druckA')}
                    placeholder="z.B. 200"
                    className={inputCls(!!errors.druckA)} />
                </FormField>
                <FormField label="B-Druck (bar) — 2. Runde 50%" error={errors.druckB}>
                  <input type="number" value={form.druckB} onChange={set('druckB')}
                    placeholder="z.B. 220"
                    className={inputCls(!!errors.druckB)} />
                </FormField>
              </div>
              {form.werkzeug && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <KraftAnzeige label="Kraft A" bar={form.druckA} flaeche={WERKZEUG_FLAECHE[form.werkzeug]} />
                  <KraftAnzeige label="Kraft B" bar={form.druckB} flaeche={WERKZEUG_FLAECHE[form.werkzeug]} />
                </div>
              )}
            </div>
            <div className="mt-4">
              <FormField label="Dichtungstyp *" error={errors.dichtungsTyp}>
                <input type="text" value={form.dichtungsTyp} onChange={set('dichtungsTyp')}
                  placeholder="z.B. Spiralgewickelte Dichtung EN 1514-2"
                  className={inputCls(!!errors.dichtungsTyp)} />
              </FormField>
            </div>
          </Section>

          <Section title="Status">
            <FormField label="Aktueller Status">
              <select value={form.status} onChange={set('status')} className={inputCls(false)}>
                <option value="VERSCHLOSSEN">Fest verschlossen</option>
                <option value="GEOEFFNET">Geöffnet</option>
                <option value="PRUEFEN">Auf Dichtheit zu prüfen</option>
              </select>
            </FormField>
          </Section>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800
              text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
          >
            <Save size={18} />
            {isNew ? 'Flansch anlegen' : 'Änderungen speichern'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3 pb-1.5 border-b border-slate-100">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2
    focus:ring-blue-500 focus:border-transparent transition-colors
    ${hasError ? 'border-red-400 bg-red-50' : 'border-slate-300'}`;
}

function KraftAnzeige({ label, bar, flaeche }: { label: string; bar: string; flaeche: number }) {
  const val = bar !== '' && !isNaN(Number(bar)) ? (Number(bar) * flaeche * 0.01).toFixed(1) : null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">{label}</p>
      {val !== null
        ? <p className="text-xl font-bold text-blue-800">{val} <span className="text-sm font-normal text-blue-600">kN</span></p>
        : <p className="text-sm text-blue-300 italic">Druck eingeben…</p>
      }
    </div>
  );
}
