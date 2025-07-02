'use client';

import styles from './style.module.scss';

const Card = ({ src, alt, i }) => {
  return (
    <div className={styles.cardContainer} style={{ top: `calc(-5vh + ${i * 25}px)` }}>
      <img
        src={src}
        alt={alt}
        className={styles.card}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default Card;
