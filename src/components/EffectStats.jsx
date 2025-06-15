// src/components/EffectStats.jsx
import React from 'react';
import styles from '../styles/EffectStats.module.scss';

export default function EffectStats({
  upgrades,
  clickValue,
  bonuses,
  antibonuses,
  casesOpened,
  totalClicks,
  comboCount,
  prestigeCount
}) {
  // ─── Income Breakdown ──────────────────────────
  let passiveTotal = 0;
  let autoTotal    = 0;
  upgrades.forEach(u => {
    if (u.level > 0) {
      if (u.passive) {
        let base = u.passive * u.level;
        const pb = bonuses.find(b => b.type === 'passiveBoost');
        if (pb) base *= (1 + pb.value);
        const rp = antibonuses.find(a => a.type === 'reducedPassive');
        if (rp) base *= rp.value;
        passiveTotal += base;
      }
      if (u.auto) {
        let base = clickValue * u.level;
        const ab = bonuses.find(b => b.type === 'autoBoost');
        if (ab) base *= (1 + ab.value);
        const no = antibonuses.some(a => a.type === 'noAuto');
        if (!no) autoTotal += base;
      }
    }
  });

  // ─── Combo Multiplier ──────────────────────────
  // From upgrades:
  const upgradeCombo = upgrades
  .filter(u => u.combo)
  .reduce((m, u) => m * (1 + u.level * u.combo), 1);

  // From bonuses:
  const bonusCombo = bonuses
    .filter(b => b.type === 'comboBoost')
    .reduce((m, b) => m * b.value, 1);
  const comboMultiplier = upgradeCombo * bonusCombo;

  // ─── Crit Chance ───────────────────────────────
  // From upgrades:
  const upgradeCrit = upgrades
  .filter(u => u.crit)
  .reduce((sum, u) => sum + u.level * u.crit, 0);

  // From bonuses:
  const bonusCrit = bonuses
    .filter(b => b.type === 'critChance')
    .reduce((sum, b) => sum + b.value, 0);
  const critChance = upgradeCrit + bonusCrit;

  // ─── Manual Click Gain ─────────────────────────
  let manualGain = clickValue;
  manualGain *= comboMultiplier;               // apply combo
  // any clickMultiplier bonuses
  bonuses
    .filter(b => b.type === 'clickMultiplier')
    .forEach(b => { manualGain *= (1 + b.value); });
  // apply slowClick
  const slow = antibonuses.find(a => a.type === 'slowClick');
  if (slow) manualGain *= slow.value;

  // ─── Counts ───────────────────────────────────
  const activeBonuses   = bonuses.length;
  const activeAntibons  = antibonuses.length;

  const comboUpg = upgrades.find(u => u.combo);
  const comboLvl = comboUpg ? comboUpg.level : 0;
  const potentialComboBonus = clickValue * comboLvl * (comboCount > 1 ? comboCount - 1 : 0);


  return (
    <div className={styles.effectStats}>
      {/* Income Breakdown */}
      <div className={styles.section}>
        <h3>🧮 Non-Manual Income</h3>
        <ul className={styles.incomeList}>
          {passiveTotal > 0 && (
            <li className={styles.passive}>
              🛋 Passive: {passiveTotal.toFixed(1)}/sec
            </li>
          )}
          {autoTotal > 0 && (
            <li className={styles.auto}>
              ⚙️ Auto: {autoTotal.toFixed(1)}/sec
            </li>
          )}
          <li className={styles.total}>
            💰 Total: {(passiveTotal + autoTotal).toFixed(1)}/sec
          </li>
          <h3>🧮 Manual Income</h3>
          <li>
              🔥 Combo Streak: <strong>{comboCount}</strong>
          </li>
          <li>
              💥 Combo Bonus Next Click: <strong>{potentialComboBonus.toFixed(1)}</strong>
          </li>
        </ul>
      </div>

      {/* Other Stats */}
      <div className={styles.section}>
        <h3>📊 Stats</h3>
        <ul className={styles.statsList}>
          <li>
            👆 Click Gain: <strong>{manualGain.toFixed(1)}</strong>
          </li>
          <li>
            🎲 Cases Opened: <strong>{casesOpened}</strong>
          </li>
          <li>
            👆 Total Clicks: <strong>{totalClicks}</strong>
          </li>
          <li>
            🏆 Prestiges: <strong>{prestigeCount}</strong>
          </li>
          <li>
            🔗 Combo ×: <strong>{comboMultiplier.toFixed(2)}</strong>
          </li>
          <li>
            🎯 Crit Chance: <strong>{critChance.toFixed(1)}%</strong>
          </li>
          <li>
            ✨ Bonuses: <strong>{activeBonuses}</strong>
          </li>
          <li>
            ⚠️ Antibonuses: <strong>{activeAntibons}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
