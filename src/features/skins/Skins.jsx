import React from 'react';
import styles from '../../styles/Skins.module.scss';

export default function Skins({ clicker }) {
  const { skins, skin, buySkin, setSkin } = clicker;

  return (
    <div className={styles.skinsContainer}>
      <h2>🎨 Skins</h2>
      <div className={styles.list}>
        {skins.map((s, i) => {
          const isEquipped = skin.name === s.name;
          return (
            <div key={s.name} className={styles.skinItem}>
              <div
                className={styles.swatch}
                style={{ background: s.background }}
              />
              <div className={styles.info}>
                <span>{s.name}</span>
                { s.unlocked ? (
                    <button
                    onClick={() => setSkin(i)}
                    disabled={isEquipped}
                    style={
                      isEquipped
                        ? {
                            backgroundColor: 'var(--secondary)',
                            color: 'var(--bg)',
                            borderColor: 'var(--primary)',
                          }
                        : {}
                    }
                  >
                    {isEquipped ? 'Equipped' : 'Equip'}
                  </button>
                  ) : (
                    <button onClick={() => buySkin(i)}>
                      Unlock ({s.cost})
                    </button>
                  )
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
