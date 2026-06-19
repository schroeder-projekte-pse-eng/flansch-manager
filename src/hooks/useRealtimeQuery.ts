import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Drop-in replacement for Dexie's useLiveQuery.
 * Runs `queryFn` on mount and whenever any of `tables` changes in Supabase.
 * Returns `undefined` while the initial fetch is in flight.
 */
export function useRealtimeQuery<T>(
  queryFn: () => Promise<T>,
  tables: string[],
  deps: unknown[] = []
): T | undefined {
  const [data, setData] = useState<T | undefined>(undefined);
  const fnRef = useRef(queryFn);
  fnRef.current = queryFn;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const result = await fnRef.current();
        if (!cancelled) setData(result);
      } catch (e) {
        console.error('useRealtimeQuery error:', e);
      }
    };

    run();

    const channels = tables.map((table, i) =>
      supabase
        .channel(`rt_${table}_${i}_${Date.now()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, run)
        .subscribe()
    );

    return () => {
      cancelled = true;
      channels.forEach(c => supabase.removeChannel(c));
    };
    // deps is intentionally spread — tables is passed as literal and excluded from lint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return data;
}
