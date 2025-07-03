'use client';

import Card from "./card";
import { projects } from "./data";
import styles from "./style.module.scss";

export default function StackingNewCard() {
  return (
    <main className={styles.main}>
      {projects.map((project, i) => (
        <Card key={`p_${i}`} {...project} i={i} />
      ))}
    </main>
  );
}
