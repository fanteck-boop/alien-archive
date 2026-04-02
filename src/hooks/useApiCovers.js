import { useState, useEffect } from 'react';
import { fetchAllComicCovers } from '../api';
// import { fetchAllGameCovers } from '../api'; // uncomment when RAWG key is ready

/**
 * Fetches live covers from external APIs on mount.
 * Returns coverMap: { [itemId]: imageUrl }
 *
 * Cards show their static imageUrl immediately, then upgrade to the
 * API cover once it arrives. Failed lookups silently keep the static image.
 */
export function useApiCovers(data) {
  const [coverMap, setCoverMap] = useState({});
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [comicCovers /*, gameCovers */] = await Promise.all([
          fetchAllComicCovers(data),
          // fetchAllGameCovers(data),
        ]);

        if (!cancelled) {
          setCoverMap({
            ...comicCovers,
            // ...gameCovers,
          });
        }
      } catch (err) {
        console.error('[useApiCovers] error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []); // run once on mount

  return { coverMap, loading };
}
