import type { FlanschStatus } from '../db/database';

const cfg: Record<FlanschStatus, { label: string; classes: string }> = {
  VERSCHLOSSEN: {
    label: 'Fest verschlossen',
    classes: 'bg-green-100 text-green-800 border-green-300',
  },
  GEOEFFNET: {
    label: 'Geöffnet',
    classes: 'bg-red-100 text-red-800 border-red-300',
  },
  PRUEFEN: {
    label: 'Auf Dichtheit zu prüfen',
    classes: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
};

export default function StatusBadge({
  status,
  large,
}: {
  status: FlanschStatus;
  large?: boolean;
}) {
  const { label, classes } = cfg[status];
  return (
    <span
      className={`inline-flex items-center border font-semibold rounded-full
        ${large ? 'px-4 py-1.5 text-base' : 'px-2.5 py-0.5 text-xs'}
        ${classes}`}
    >
      <span
        className={`rounded-full mr-2 ${large ? 'w-2.5 h-2.5' : 'w-2 h-2'}
          ${status === 'VERSCHLOSSEN' ? 'bg-green-500' : status === 'GEOEFFNET' ? 'bg-red-500' : 'bg-yellow-500'}`}
      />
      {label}
    </span>
  );
}
