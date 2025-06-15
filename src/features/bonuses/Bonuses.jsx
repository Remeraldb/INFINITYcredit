// src/features/bonuses/Bonuses.jsx
import React from 'react';
import styles from '../../styles/Bonuses.module.scss';

const BONUS_LABELS = {
  clickMultiplier: 'Click Power +',
  passiveBoost:    'Passive Income +',
  autoBoost:       'Auto Income +',
  critChance:      'Critical Chance +',
  comboBoost:      'Combo Boost x'
};

const ANTIBONUS_LABELS = {
  slowClick:      'Click Speed ÷',
  reducedPassive: 'Passive Income ÷',
  noAuto:         'Auto Income Disabled'
};

export default function Bonuses({ clicker }) {
  const { bonuses, antibonuses } = clicker;
  const now = Date.now();

  return (
    <div className={styles.container}>
      <h2>🏅 Bonuses</h2>
      {bonuses.length === 0 ? (
        <p>No bonuses earned yet.</p>
      ) : (
        <ul className={styles.list}>
          {bonuses.map(b => {
            const label = BONUS_LABELS[b.type] || b.type;
            const isTemp = !b.permanent;
            const remaining = isTemp ? Math.ceil((b.expiresAt - now)/1000) : null;
            return (
              <li key={b.id} className={styles.perm}>
                <span>{label}</span>
                <span>
                  {b.type === 'comboBoost'
                    ? `×${b.value}`
                    : `${b.value}${b.type==='critChance'?'%':''}`}
                  {isTemp && ` (${remaining}s)`}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <h2>🛡️ Antibonuses</h2>
      {antibonuses.length === 0 ? (
        <p>No antibonuses active.</p>
      ) : (
        <ul className={styles.list}>
          {antibonuses.map(a => {
            const label = ANTIBONUS_LABELS[a.type] || a.type;
            const remaining = Math.ceil((a.expiresAt - now)/1000);
            return (
              <li key={a.id} className={styles.temp}>
                <span>{label}</span>
                <span>
                  {a.value !== 1 ? (a.type==='slowClick' || a.type==='reducedPassive' 
                    ? `×${a.value}`
                    : '') : ''}
                  {` (${remaining}s)`}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
