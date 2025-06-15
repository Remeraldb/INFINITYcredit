import React from 'react';
import styles from '../../styles/Achievements.module.scss';

export default function Achievements({ clicker }) {
  return (
    <div className={styles.achievements}>
      {clicker.achievements.map((a, i) => (
        <div
          key={a.name}
          className={`${styles.achievement} ${a.unlocked ? styles.unlocked : ''}`}
        >
          <h4>{a.name}</h4>
          <p>{a.description}</p>
        </div>
      ))}
    </div>
  );
}