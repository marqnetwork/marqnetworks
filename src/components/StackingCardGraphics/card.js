'use client';

import styles from './style.module.scss';
import BottomBar from './BottomBar';

const Card = ({ src, alt, i, bar }) => {
  return (
    <div className={styles.cardContainer} style={{ top: `calc(-5vh + ${i * 25}px)` }}>
      <div className={styles.cardOverlayContainer}>
        <img
          src={src}
          alt={alt}
          className={styles.cardImage}
        />
        <div className={styles.bottomOverlay}>
          <BottomBar label={bar.label} year={bar.year} tags={bar.tags} />
        </div>
      </div>
    </div>
  );
};

export default Card;
