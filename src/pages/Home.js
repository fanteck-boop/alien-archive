import { useState, useEffect, useMemo } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { data } from '../data';
import { fetchAllMoviePosters, fetchAllComicCovers } from '../api';
import { useFavorites } from '../hooks/useFavorites';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Controls from '../components/Controls';
import styles from './Home.module.css';

export default function Home() {
  const [activeType, setActiveType] = useState('all');
  const [activeSort, setActiveSort] = useState('year-asc');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [enriched, setEnriched] = useState(data);

  const { favorites, toggle: toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      fetchAllMoviePosters(data),
      fetchAllComicCovers(data),
    ]).then(([movieResult, comicResult]) => {
      if (cancelled) return;
      const movieMap = movieResult.status === 'fulfilled' ? movieResult.value : {};
      const comicMap = comicResult.status === 'fulfilled' ? comicResult.value : {};
      const combined = { ...movieMap, ...comicMap };
      if (Object.keys(combined).length > 0) {
        setEnriched(data.map((d) => ({
          ...d,
          imageUrl: d.imageUrl || combined[d.id] || d.imageUrl || null,
        })));
      }
    });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let items = [...enriched];
    if (showFavOnly) {
      items = items.filter((d) => favorites.has(d.id));
    } else if (activeType !== 'all') {
      items = items.filter((d) => d.type === activeType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.desc.toLowerCase().includes(q) ||
          (d.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeSort === 'year-asc') items.sort((a, b) => a.year - b.year);
    else if (activeSort === 'year-desc') items.sort((a, b) => b.year - a.year);
    else if (activeSort === 'rating-desc') items.sort((a, b) => b.rating - a.rating);
    else if (activeSort === 'rating-asc') items.sort((a, b) => a.rating - b.rating);
    else if (activeSort === 'title-asc') items.sort((a, b) => a.title.localeCompare(b.title));
    return items;
  }, [enriched, activeType, activeSort, search, showFavOnly, favorites]);

  const counts = useMemo(() => ({
    total: enriched.length,
    movies: enriched.filter((d) => d.type === 'movie').length,
    games: enriched.filter((d) => d.type === 'game').length,
    books: enriched.filter((d) => d.type === 'book').length,
    comics: enriched.filter((d) => d.type === 'comic').length,
  }), [enriched]);

  const selectedItem = useMemo(
    () => enriched.find((d) => d.id === selectedId) ?? null,
    [selectedId, enriched]
  );

  const emptyMessage = showFavOnly
    ? { icon: '★', title: 'No saved entries yet', sub: 'Click the star on any card to save it.' }
    : { icon: '👾', title: 'No entries found', sub: 'Adjust your filters or search query.' };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBg} />
        <div className={styles.headerGrid} />
        <div className={styles.headerContent}>
          <div className={styles.eyebrow}>&gt; Weyland-Yutani Corp — Classified Archive // Est. 1979</div>
          <h1 className={styles.mainTitle}>ALIEN<span>.</span></h1>
          <p className={styles.subtitle}>Franchise Encyclopedia — All Media</p>
          <div className={styles.stats}>
            <Stat val={counts.total} label="Total Entries" />
            <Stat val={counts.movies} label="Films" />
            <Stat val={counts.games} label="Games" />
            <Stat val={counts.books} label="Books" />
            <Stat val={counts.comics} label="Comics" />
            <Stat val={favorites.size} label="Saved" accent="var(--amber)" />
          </div>
          <button className={styles.signOut} onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </div>
        <div className={styles.headerLine} />
      </header>

      <Controls
        activeType={activeType}
        setActiveType={setActiveType}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        search={search}
        setSearch={setSearch}
        count={filtered.length}
        showFavOnly={showFavOnly}
        setShowFavOnly={setShowFavOnly}
        favCount={favorites.size}
      />

      <main className={styles.main}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>{emptyMessage.icon}</div>
            <h3>{emptyMessage.title}</h3>
            <p>{emptyMessage.sub}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <Card
                key={item.id}
                item={item}
                onClick={(item) => setSelectedId(item.id)}
                animDelay={(i % 16) * 22}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <span>Alien™ &amp; © 20th Century Studios. All rights reserved.</span>
        <span>Archive — informational purposes only.</span>
      </footer>

      <Modal
        item={selectedItem}
        onClose={() => setSelectedId(null)}
        isFavorite={selectedItem ? favorites.has(selectedItem.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

function Stat({ val, label, accent = 'var(--acid)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: accent, lineHeight: 1 }}>
        {val}
      </span>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
        {label}
      </span>
    </div>
  );
}