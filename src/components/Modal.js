import { useEffect } from 'react';
import styles from './Modal.module.css';
import FavoriteButton from './FavoriteButton';

const TYPE_LABELS = { movie: 'Film', game: 'Game', book: 'Book', comic: 'Comic' };
const BY_KEY = { movie: 'director', game: 'developer', book: 'author', comic: 'author' };
const BY_LABEL = { movie: 'Director', game: 'Developer', book: 'Author', comic: 'Author' };
const FALLBACK_EMOJI = { movie: '🎬', game: '🎮', book: '📚', comic: '📖' };

function getRatingColor(r) {
  if (r >= 8) return 'var(--acid)';
  if (r >= 7) return '#ffaa00';
  if (r >= 6) return '#ff8c00';
  return 'var(--red)';
}

export default function Modal({ item, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!item) return null;

  const by = item[BY_KEY[item.type]];
  const rColor = getRatingColor(item.rating);
  const filled = Math.round(item.rating);

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
            </div>

            <div className={styles.ratingRow}>
              <div>
                <div className={styles.score} style={{ color: rColor }}>{item.rating}</div>
                <div className={styles.scoreSub}>/ 10 — Public Score</div>
              </div>
              <div className={styles.stars}>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className={`${styles.star} ${i < filled ? styles.lit : ''}`} />
                ))}
              </div>
            </div>

            <Section title="Synopsis">
              <p className={styles.desc}>{item.desc}</p>
            </Section>

            <Section title="About">
              <p className={styles.desc}>{item.detailedDesc}</p>
            </Section>

            <Section title="Public Reception">
              <div className={styles.prosCons}>
                <div className={`${styles.pcBox} ${styles.prosBox}`}>
                  <div className={styles.pcHeading}>✓ Praised For</div>
                  <ul className={styles.pcList}>
                    {item.pros.map((p, i) => (
                      <li key={i} className={styles.pcItem}>
                        <div className={`${styles.pcDot} ${styles.prosDot}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.pcBox} ${styles.consBox}`}>
                  <div className={styles.pcHeading}>✕ Criticized For</div>
                  <ul className={styles.pcList}>
                    {item.cons.map((c, i) => (
                      <li key={i} className={styles.pcItem}>
                        <div className={`${styles.pcDot} ${styles.consDot}`} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

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
