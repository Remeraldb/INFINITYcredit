import React from 'react';
import styles from '../../styles/Upgrades.module.scss';

export default function Upgrades({ clicker }) {
  return (
    <div className={styles.upgrades}>
      <h2>Upgrades</h2>
      {clicker.upgrades.map((upg, i) => (
        <button key={i} onClick={() => clicker.buyUpgrade(i)} disabled={!clicker.canBuy(i)}>
          {upg.name} (x{upg.level}) - {upg.cost} cr
        </button>
      ))}
    </div>
  );
}
