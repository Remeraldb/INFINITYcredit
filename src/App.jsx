import React, { useState } from 'react';
import FloatingCredit from './components/FloatingCredit';
import EffectStats from './components/EffectStats';
import ClickButton from './components/ClickButton';
import Upgrades from './features/upgrades/Upgrades';
import Bonuses from './features/bonuses/Bonuses';
import Prestige from './features/prestige/Prestige';
import Skins from './features/skins/Skins';
import Achievements from './features/achievements/Achievements';
import AchievementPopup from './components/AchievementPopup';
import Cases from './features/cases/Cases';
import ExportImport from './features/export/ExportImport';
import { useClicker } from './hooks/useClicker';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './styles/App.module.scss';

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App() {
  const clicker = useClicker();
  const [activeTab, setActiveTab] = useState('upgrades');

  return (
    <div className={styles.app}>
      <h1>💫INFINITYcredit </h1>

      {/* ── STATUS ROW: Level on the left, Credits on the right ── */}
      <div className={styles.statusRow}>
        <div className={styles.levelDisplay}>
          <strong>Level:</strong> {clicker.level}
        </div>
        <div className={styles.credits}>
          <strong>Credits:</strong> {clicker.credits}
        </div>
        <div className={styles.duiktcoins}>
          <strong>INFINITYcoins:</strong> {clicker.duiktcoins}
        </div>
      </div>


      {/* ── Click Button + Floating Bubbles ── */}
      <div style={{ position: 'relative', "borderRadius":'12px', border: '3px solid var(--fg)'}}>
        <ClickButton clicker={clicker} />
        {clicker.creditBubbles.map(b => (
          <FloatingCredit
            key={b.id}
            amount={b.amount}
            type={b.type}                            // ← ensures correct color
            onAnimationEnd={() => clicker.removeBubble(b.id)}
          />
        ))}
      </div>
      
      <EffectStats
        upgrades={clicker.upgrades}
        clickValue={clicker.clickValue}
        bonuses={clicker.bonuses}
        antibonuses={clicker.antibonuses}
        casesOpened={clicker.casesOpened}
        totalClicks={clicker.totalClicks}
        comboCount={clicker.comboCount}
        prestigeCount={clicker.prestigeCount}
        critChance={clicker.critChance}
        comboMultiplier={clicker.comboMultiplier}
      />



      {/* ── TABS ── */}
      <div className={styles.tabs}>
        {['upgrades','cases','bonuses','achievements','skins','prestige','export'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tabButton} ${activeTab===tab?styles.activeTab:''}`}
          >
            {tab === 'export' ? 'Save/Load' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
          className={styles.tabContent}
        >
          {activeTab === 'upgrades' && <Upgrades clicker={clicker} />}
          {activeTab === 'cases' && <Cases clicker={clicker} />}
          {activeTab === 'bonuses' && <Bonuses clicker={clicker} />}
          {activeTab === 'achievements' && <Achievements clicker={clicker} />}
          {activeTab === 'skins' && <Skins clicker={clicker} />}
          {activeTab === 'prestige' && <Prestige clicker={clicker} />}
          {activeTab === 'export' && <ExportImport clicker={clicker} />}
        </motion.div>
      </AnimatePresence>



      {clicker.achievementPopups.map(p => (
        <AchievementPopup key={p.id} name={p.name} />
      ))}


    </div>
  );
}
