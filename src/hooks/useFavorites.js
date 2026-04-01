import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';

/**
 * Stores each user's favorites as an array of item IDs in Firestore:
 *   /users/{uid}  →  { favorites: [1, 8, 30, ...] }
 *
 * Fixes vs previous version:
 *  1. uid comes from onAuthStateChanged — never stale/null on first render
 *  2. onSnapshot keeps local state in sync with Firestore automatically,
 *     so we don't need fragile optimistic updates
 *  3. toggle checks whether the doc exists before deciding updateDoc vs setDoc,
 *     instead of relying on catching a wrong error code
 */
export function useFavorites() {
  const [uid, setUid] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // 1 — Track the signed-in user reliably
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null);
      if (!user) {
        setFavorites(new Set());
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // 2 — Subscribe to the user's Firestore doc in real time
  useEffect(() => {
    if (!uid) return;

    const ref = doc(db, 'users', uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const ids = snap.exists() ? (snap.data().favorites ?? []) : [];
        setFavorites(new Set(ids));
        setLoading(false);
      },
      (err) => {
        console.error('Favorites listener error:', err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [uid]);

  // 3 — Toggle: check existence first, write once, let onSnapshot update state
  const toggle = useCallback(async (itemId) => {
    if (!uid) return;

    const ref = doc(db, 'users', uid);
    const isFav = favorites.has(itemId);

    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await updateDoc(ref, {
          favorites: isFav ? arrayRemove(itemId) : arrayUnion(itemId),
        });
      } else {
        // First save ever for this user — create their document
        await setDoc(ref, { favorites: [itemId] });
      }
      // No setFavorites call needed — onSnapshot picks up the change automatically
    } catch (err) {
      console.error('Favorites toggle error:', err);
    }
  }, [uid, favorites]);

  return { favorites, toggle, loading };
}
