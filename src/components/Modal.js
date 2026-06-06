import { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import FavoriteButton from './FavoriteButton';
import {
  fetchMovieDetail,
  fetchGameDetail,
  fetchBookDetail,
  fetchComicDetail,
} from '../api';

const TYPE_LABELS = { movie: 'Film', game: 'Game', book: 'Book', comic: 'Comic' };
const BY_KEY      = { movie: 'director', game: 'developer', book: 'author', comic: 'author' };
const BY_LABEL    = { movie: 'Director', game: 'Developer', book: 'Author', comic: 'Author' };
const FALLBACK_EMOJI = { movie: '🎬', game: '🎮', book: '📚', comic: '📖' };

const SOURCE_LABEL = {
  movie: 'TMDB',
  game:  'RAWG',
  book:  'Open Library',
  comic: 'Comic Vine',
};

function getRatingColor(r) {
  if (r >= 8) return 'var(--acid)';
  if (r >= 7) return '#ffaa00';
  if (r >= 6) return '#ff8c00';
  return 'var(--red)';
}

async function fetchDetail(item) {
  switch (item.type) {
    case 'movie':  return fetchMovieDetail(item.title, item.year);
    case 'game':   return fetchGameDetail(item.rawgSearch ?? item.title);
    case 'book':   return fetchBookDetail(item.title);
    case 'comic':  return fetchComicDetail(item.cvId, item.title);
    default:       return null;
  }
}

export default function Modal({ item, onClose, isFavorite, onToggleFavorite }) {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (!item) { setDetail(null); return; }
    let cancelled = false;
    setDetail(null);
    setLoading(true);
    fetchDetail(item).then((data) => {
      if (!cancelled) {
        setDetail(data ?? {});
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [item]);

  if (!item) return null;

  const by = item[BY_KEY[item.type]];

  // Live API data only
  const overview   = detail?.overview ?? null;
  const apiRating  = detail?.apiRating ?? null;
  const apiRatingLabel = detail?.apiRatingLabel ?? null;
  const rColor     = getRatingColor(apiRating);
  const filled     = apiRating ? Math.round(apiRating) : 0;

  const extraMeta = [];
  if (detail?.runtime)    extraMeta.push({ label: 'Runtime',   value: detail.runtime });
  if (detail?.genres)     extraMeta.push({ label: 'Genres',    value: detail.genres });
  if (detail?.platforms)  extraMeta.push({ label: 'Platforms', value: detail.platforms });
  if (detail?.publisher)  extraMeta.push({ label: 'Publisher', value: detail.publisher });
  if (detail?.issueCount) extraMeta.push({ label: 'Issues',    value: detail.issueCount });
  if (detail?.subjects)   extraMeta.push({ label: 'Subjects',  value: detail.subjects });

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modal} ${styles[item.type]}`}>
        <div className={styles.topBar} />
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.favBtnWrap}>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(item.id)}
            size="lg"
          />
        </div>

        <div className={styles.body}>
          {/* Poster side */}
          <div className={styles.posterSide}>
            {item.imageUrl ? (
              <>
                <img
                  className={styles.posterImg}
                  src={item.imageUrl}
                  alt={`${item.title} poster`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.posterFallback} style={{ display: 'none' }}>
                  <span className={styles.fbEmoji}>{FALLBACK_EMOJI[item.type]}</span>
                  <span className={styles.fbTitle}>{item.title}</span>
                </div>
              </>
            ) : (
              <div className={styles.posterFallback}>
                <span className={styles.fbEmoji}>{FALLBACK_EMOJI[item.type]}</span>
                <span className={styles.fbTitle}>{item.title}</span>
              </div>
            )}
            <div className={styles.posterShade} />
          </div>

          {/* Content side */}
          <div className={styles.contentSide}>
            <div className={styles.badge}>{TYPE_LABELS[item.type]} — {item.year}</div>
            <h2 className={styles.title}>{item.title}</h2>

            {/* Meta */}
            <div className={styles.meta}>
              {by && (
                <div className={styles.metaItem}>
                  <span>{BY_LABEL[item.type]}:</span>
                  <b>{by}</b>
                </div>
              )}
              <div className={styles.metaItem}>
                <span>Year:</span><b>{item.year}</b>
              </div>
              {extraMeta.map(({ label, value }) => (
                <div key={label} className={styles.metaItem}>
                  <span>{label}:</span><b>{value}</b>
                </div>
              ))}
            </div>

            {/* Tagline */}
            {detail?.tagline && (
              <p className={styles.tagline}>"{detail.tagline}"</p>
            )}

            {/* Live score only */}
            {!loading && apiRating && (
              <div className={styles.ratingRow}>
                <div>
                  <div className={styles.score} style={{ color: rColor }}>{apiRating}</div>
                  <div className={styles.scoreSub}>/ 10 — {apiRatingLabel ?? SOURCE_LABEL[item.type]}</div>
                </div>
                <div className={styles.stars}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className={`${styles.star} ${i < filled ? styles.lit : ''}`} />
                  ))}
                </div>
              </div>
            )}

            {/* Live description only */}
            <Section title="Overview">
              {loading ? (
                <div className={styles.skeleton}>
                  <div className={styles.skeletonLine} style={{ width: '100%' }} />
                  <div className={styles.skeletonLine} style={{ width: '92%' }} />
                  <div className={styles.skeletonLine} style={{ width: '85%' }} />
                  <div className={styles.skeletonLine} style={{ width: '78%' }} />
                </div>
              ) : overview ? (
                <p className={styles.desc}>{overview}</p>
              ) : (
                <p className={styles.desc} style={{ opacity: 0.4, fontStyle: 'italic' }}>
                  No description available.
                </p>
              )}
            </Section>

            {/* Source tag */}
            {!loading && overview && (
              <div className={styles.sourceTag}>
                ↗ Description sourced live from {SOURCE_LABEL[item.type]}
              </div>
            )}

            {/* Tags */}
            <Section title="Tags">
              <div className={styles.tags}>
                {item.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
        marginBottom: '9px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {title}
        <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
      </div>
      {children}
    </div>
  );
}