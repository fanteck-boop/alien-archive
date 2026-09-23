import styles from './Card.module.css';
import FavoriteButton from './FavoriteButton';

const TYPE_LABELS = { movie: 'Film', game: 'Game', book: 'Book', comic: 'Comic' };

function getRatingColor(r) {
  if (r >= 8) return 'var(--acid)';
  if (r >= 7) return '#ffaa00';
  if (r >= 6) return '#ff8c00';
  return 'var(--red)';
}

const FALLBACK_EMOJI = { movie: '🎬', game: '🎮', book: '📚', comic: '📖' };

export default function Card({ item, liveRating, onClick, animDelay, isFavorite, onToggleFavorite }) {
  const displayRating = liveRating ?? null;
  const ratingColor = getRatingColor(displayRating);

  return (
    <div
      className={`${styles.card} ${styles[item.type]}`}
      style={{ animationDelay: `${animDelay}ms` }}
      onClick={() => onClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(item); }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${item.title} — view details`}
    >
      <div className={styles.posterWrap}>
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
              <span className={styles.fallbackEmoji}>{FALLBACK_EMOJI[item.type]}</span>
              <span className={styles.fallbackTitle}>{item.title}</span>
            </div>
          </>
        ) : (
          <div className={styles.posterFallback}>
            <span className={styles.fallbackEmoji}>{FALLBACK_EMOJI[item.type]}</span>
            <span className={styles.fallbackTitle}>{item.title}</span>
          </div>
        )}
        <div className={styles.posterOverlay} />
        <div className={styles.typeBadge}>{TYPE_LABELS[item.type]}</div>
        {displayRating && (
          <div className={styles.ratingBadge} style={{ color: ratingColor }}>
            {displayRating}
          </div>
        )}
        <div className={styles.favWrap}>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(item.id)}
            size="sm"
          />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardYear}>{item.year}</div>
          <div className={styles.cardTitle}>{item.title}</div>
        </div>
      </div>
      <div className={styles.hoverReveal}>
        <div className={styles.revealIcon}>+</div>
        <div className={styles.revealText}>View Details</div>
      </div>
    </div>
  );
}