import React from 'react';
import styles from '../styles/FloatingCredit.module.scss';

export default function FloatingCredit({ amount, type = 'auto', onAnimationEnd }) {
  // pick a class based on type:
  const cls =
    type === 'manual'
      ? styles.manualBubble
      : type === 'auto'
      ? styles.autoBubble
      : styles.caseBubble;

  return (
    <div className={`${styles.floatingBase} ${cls}`} onAnimationEnd={onAnimationEnd}>
      +{amount}
    </div>
  );
}
