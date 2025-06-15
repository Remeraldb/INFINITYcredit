import React from 'react';
import styles from '../../styles/Cases.module.scss';

export default function Cases({ clicker }) {
  const {
    cases,
    credits,
    openCase,
    lastCaseResult,
    closeCaseResult,
    level
  } = clicker;

  // Prepare bonus display data if any
  let bonusLabel, bonusText, bonusClass;
  if (lastCaseResult?.bonus) {
    const raw = lastCaseResult.bonus;
    const isAnti = raw.startsWith('⚠️');
    bonusLabel = isAnti ? '🔻 Antibonus' : '✨ Bonus';
    bonusText  = isAnti ? raw.replace('⚠️ ', '') : raw;
    bonusClass = isAnti ? styles.antibonus : styles.bonus;
  }

  return (
    <div className={styles.casesContainer}>
      <h2>🎁 Cases (Level {level})</h2>
      <div className={styles.caseList}>
        {cases.map((c, i) => (
          <div key={i} className={styles.caseItem}>
            <span>{c.name}</span>
            {c.unlocked ? (
              <button
                onClick={() => openCase(i)}
                disabled={credits < c.baseCost}
              >
                {c.baseCost} cr
              </button>
            ) : (
              <span className={styles.locked}>🔒 Locked</span>
            )}
          </div>
        ))}
      </div>

      {lastCaseResult && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Case Result</h3>
            <p>
              🎉 You won <strong>{lastCaseResult.reward} credits</strong>!
            </p>
            {lastCaseResult.bonus && (
              <p className={bonusClass}>
                {bonusLabel}: <strong>{bonusText}</strong>
              </p>
            )}
            <button onClick={closeCaseResult}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
