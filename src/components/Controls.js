import styles from './Controls.module.css';

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Films' },
  { value: 'game', label: 'Games' },
  { value: 'book', label: 'Books' },
  { value: 'comic', label: 'Comics' },
];

const SORTS = [
  { value: 'year-asc', label: 'Year ↑ Oldest' },
  { value: 'year-desc', label: 'Year ↓ Newest' },
  { value: 'rating-desc', label: '★ Best Rated' },
  { value: 'rating-asc', label: '★ Lowest Rated' },
  { value: 'title-asc', label: 'A → Z' },
];

export default function Controls({
  activeType, setActiveType,
  activeSort, setActiveSort,
  search, setSearch,
  count,
  showFavOnly, setShowFavOnly,
  favCount,
}) {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>Type</span>
      <div className={styles.filterGroup}>
        {TYPES.map((t) => (
          <button
            key={t.value}
            className={`${styles.btn} ${styles[`type_${t.value}`]} ${activeType === t.value && !showFavOnly ? styles.active : ''}`}
            onClick={() => { setActiveType(t.value); setShowFavOnly(false); }}
          >
            {t.label}
          </button>
        ))}
        <button
          className={`${styles.btn} ${styles.type_fav} ${showFavOnly ? styles.active : ''}`}
          onClick={() => setShowFavOnly((v) => !v)}
          title="Show favorites only"
        >
          ★ Saved {favCount > 0 && <span className={styles.favCount}>{favCount}</span>}
        </button>
      </div>

      <div className={styles.divider} />

      <span className={styles.label}>Sort</span>
      <select
        className={styles.select}
        value={activeSort}
        onChange={(e) => setActiveSort(e.target.value)}
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <div className={styles.divider} />

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.count}>
        <span>{count}</span> entries
      </div>
    </div>
  );
}
