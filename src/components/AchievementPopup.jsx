import React from 'react';
import styles from '../styles/AchievementPopup.module.scss';

export default function AchievementPopup({ name }) {
  return (
    <div className={styles.popup}>
      🎉 Achievement Unlocked: <strong>{name}</strong>
    </div>
  );
}
