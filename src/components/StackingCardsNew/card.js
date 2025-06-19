// Card.jsx
'use client';

import styles from './style.module.scss';

const Card = ({ src, i }) => {
  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.card}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      />
    </div>
  );
};

export default Card;
