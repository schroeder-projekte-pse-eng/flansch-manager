import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { Search, Camera, CameraOff, ArrowRight, AlertCircle } from 'lucide-react';
import { db } from '../db/database';

export default function ScanPage() {
  const navigate = useNavigate();
  const [manualInput, setManualInput] = useState('');
  const [scannerActive, setScannerActive] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState('');
  const qrRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = 'qr-reader';

  const handleFound = async (tagNummer: string) => {
    const tag = tagNummer.trim().toUpperCase();
    setNotFound('');
    const flansch = await db.flanschen.getByTag(tag);
    if (!flansch) {
      setNotFound(tag);
      return;
    }
    navigate(`/flansch/${encodeURIComponent(flansch.tagNummer)}`);
  };

  const startScanner = () => {
    setError('');
    setScannerActive(true);
  };

  const stopScanner = () => {
    if (qrRef.current) {
      qrRef.current.stop().catch(() => {});
      qrRef.current = null;
    }
    setScannerActive(false);
  };

  useEffect(() => {
    if (!scannerActive) return;

    const qr = new Html5Qrcode(scannerDivId);
    qrRef.current = qr;

    qr.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (text) => {
        stopScanner();
        handleFound(text);
      },
      () => {}
    ).catch((err: unknown) => {
      setScannerActive(false);
      qrRef.current = null;
      setError(
        err instanceof Error
          ? err.message
          : 'Kamera konnte nicht gestartet werden. Bitte Kameraberechtigungen prüfen.'
      );
    });

    return () => {
      if (qrRef.current) {
        qrRef.current.stop().catch(() => {});
        qrRef.current = null;
      }
    };
  }, [scannerActive]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    handleFound(manualInput);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Flansch scannen</h1>
        <p className="text-slate-500 text-sm">
          QR-Code scannen oder TAG-Nummer manuell eingeben
        </p>
      </div>

      {/* Scanner area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {scannerActive ? (
          <div className="relative">
            <div id={scannerDivId} className="w-full" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
              <button
                onClick={stopScanner}
                className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-800 font-medium py-2.5 rounded-xl"
              >
                <CameraOff size={18} />
                Kamera schließen
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Camera size={36} className="text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-700">QR-Code scannen</p>
              <p className="text-sm text-slate-500 mt-1">
                Kamera auf den Flansch-QR-Code richten
              </p>
            </div>
            <button
              onClick={startScanner}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Camera size={18} />
              Kamera starten
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex gap-2 items-start bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-medium">ODER</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Manual input */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <p className="font-medium text-slate-700 mb-3">Manuelle Eingabe</p>
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={manualInput}
              onChange={e => setManualInput(e.target.value)}
              placeholder="z.B. 27-XV-04006"
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl
              flex items-center gap-1.5 font-medium text-sm transition-colors"
          >
            Suchen
            <ArrowRight size={16} />
          </button>
        </form>

        {notFound && (
          <div className="mt-3 flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>
              Flansch <strong>{notFound}</strong> wurde nicht gefunden.
              <br />
              Bitte TAG-Nummer prüfen oder in den Flanschdaten anlegen.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
