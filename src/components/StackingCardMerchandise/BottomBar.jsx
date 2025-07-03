'use client';

import styles from './style.module.scss';

export default function BottomBar({ label, year, tags }) {
  return (
    <div className={styles.bottomBar}>
      <div className={styles.barContent}>
        <div className={styles.leftSection}>
          <span className={styles.label}>{label}</span>
          <span className={styles.year}>· {year}</span>
        </div>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}></div>
        </div>
        <div className={styles.rightSection}>
          {tags?.map((tag, i) => (
            <button key={i} className={styles.tag}>{tag}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
