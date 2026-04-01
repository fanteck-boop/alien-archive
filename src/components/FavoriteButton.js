import styles from './FavoriteButton.module.css';

export default function FavoriteButton({ isFavorite, onToggle, size = 'sm' }) {
  const handleClick = (e) => {
    e.stopPropagation(); // don't open the card modal
    onToggle();
  };

  return (
    <button
      className={`${styles.btn} ${styles[size]} ${isFavorite ? styles.active : ''}`}
      onClick={handleClick}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}
