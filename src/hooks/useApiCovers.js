import { useState, useEffect } from 'react';
import { fetchAllComicCovers } from '../api';
// import { fetchAllGameCovers } from '../api'; // uncomment when RAWG key is ready

/**
 * Fetches live covers from external APIs on mount and returns a
 * coverMap: { [itemId]: imageUrl }
 *
 * The map is merged with data in Home.js — any item whose id appears
 * in the map gets its imageUrl upgraded to the API result.
 * Items not in the map keep their existing imageUrl (Wikipedia / Open Library).
 *
 * Loading is done with Promise.allSettled so a single failed API call
 * never blocks the rest of the page from loading.
 */
export function useApiCovers(data) {
  const [coverMap, setCoverMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Run all cover-fetching APIs in parallel
        const [comicCovers /*, gameCovers */] = await Promise.all([
          fetchAllComicCovers(data),
          // fetchAllGameCovers(data),  // uncomment when RAWG key is ready
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
