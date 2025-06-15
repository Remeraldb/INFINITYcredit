import React from 'react';
import styles from '../../styles/Prestige.module.scss';

export default function Prestige({ clicker }) {
  const {
    prestigeGain,
    prestigeUnlocked,
    showPrestigePopup,
    closePrestigePopup,
    prestigeConfirm,
    prestigePopup,
  } = clicker;

  return (
    <div className={styles.prestigeContainer}>
      <h2>🌌 Prestige</h2>
      <p>
        {prestigeUnlocked
          ? `You can gain ${prestigeGain} Duiktcoin${prestigeGain > 1 ? 's' : ''}`
          : 'Reach 1 000 000 credits to unlock prestige'}
      </p>
      <button
        onClick={showPrestigePopup}
        disabled={!prestigeUnlocked}
      >
        Go Prestige
      </button>

      {prestigePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Prestige?</h3>
            <p>
              This will reset all your credits, upgrades, cases, and passive progress.<br/>
              You will keep your achievements and earn <strong>{prestigeGain}</strong> INFINITYcoins.
            </p>
            <div className={styles.buttons}>
              <button onClick={prestigeConfirm}>Yes, Prestige</button>
              <button onClick={closePrestigePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
