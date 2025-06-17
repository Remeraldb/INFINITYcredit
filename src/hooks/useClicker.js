// src/hooks/useClicker.js
import { useState, useEffect, useRef } from 'react';
//import { loadState, saveState } from '../db';
import { ACHIEVEMENT_DEFS } from './achievementsDefinitions';

export function useClicker() {

  const [credits, setCredits] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [duiktcoins, setDuiktcoins] = useState(0);
  const [upgrades, setUpgrades] = useState([
    {
      name: 'Double Click',   // Doubles your clickValue per level
      level: 0,
      baseCost: 10,
      cost: 10,
      multiplier: 2           // clickValue *= 2 each level
    },
    {
      name: 'Passive Income', // +1 credit/sec per level
      level: 0,
      baseCost: 50,
      cost: 50,
      passive: 50             // adds (passive * level) credits/sec
    },
    {
      name: 'Critical Clicks',// +1% crit chance per level
      level: 0,
      baseCost: 100,
      cost: 100,
      crit: 1                 // adds crit chance by (crit * level)%
    },
    {
      name: 'Combo Boost',    // ×0.5 click combo per level
      level: 0,
      baseCost: 250,
      cost: 250,
      combo: 0.5              // multiplies click gain by (1 + combo*level)
    },
    {
      name: 'Auto Clicker',   // +1 auto-click per level
      level: 0,
      baseCost: 1000,
      cost: 1000,
      auto: 1                 // adds (clickValue * auto * level) credits/sec
    }
  ]);



  const [bonuses, setBonuses] = useState([]);   // list of bonus keys awarded
  const [antibonuses, setAntibonuses] = useState([]);
  const [creditBubbles, setCreditBubbles] = useState([]);
  
  //fix to one error with bubbleids being the same if the event happened same millisecond
  let nextBubbleId = 0;
  
  const [skins, setSkins] = useState([
    {
      name: 'Default',
      unlocked: true,
      cost: 0,
      theme: {
        '--bg':          '#111111',
        '--fg':          '#EEEEEE',
        '--panel-bg':    '#1E1E1E',
        '--border':      '#444444',
        '--primary':     '#2196F3',
        '--secondary':   '#03A9F4',
        '--font':        "'Segoe UI', sans-serif"
      }
    },
    {
      name: 'Cyber',
      unlocked: false,
      cost: 1,
      theme: {
        '--bg':          '#0F0F1F',
        '--fg':          '#00FFAA',
        '--panel-bg':    '#13131F',
        '--border':      '#005533',
        '--primary':     '#00EE99',
        '--secondary':   '#00CC88',
        '--font':        "'Courier New', monospace"
      }
    },
    {
      name: 'Solar',
      unlocked: false,
      cost: 10,
      theme: {
        '--bg':          '#FFF8E1',
        '--fg':          '#333333',
        '--panel-bg':    '#FFECB3',
        '--border':      '#FFB300',
        '--primary':     '#FFB300',
        '--secondary':   '#FFC107',
        '--font':        "'Arial', sans-serif"
      }
    },
    {
      name: 'Lunar',
      unlocked: false,
      cost: 100,
      theme: {
        '--bg':        '#0A0A2A',
        '--fg':        '#DDEEFF',
        '--panel-bg':  '#1A1A3A',
        '--border':    '#445588',
        '--primary':   '#8899FF',
        '--secondary': '#6677CC',
        '--font':      "'Lucida Console', monospace"
      }
    },
    {
      name: 'Nebula',
      unlocked: false,
      cost: 1000,
      theme: {
        '--bg':        '#1C0A2A',
        '--fg':        '#FFCCEE',
        '--panel-bg':  '#331A3A',
        '--border':    '#994477',
        '--primary':   '#CC88AA',
        '--secondary': '#AA6677',
        '--font':      "'Georgia', serif"
      }
    }
  ]);

  const [skin, setSkin] = useState(skins[0]);
  const [pendingSkinName, setPendingSkinName] = useState(null);
  const [prestigePopup, setPrestigePopup] = useState(false);
  const prestigeGain = Math.floor(credits / 1_000_000);
  const prestigeUnlocked = prestigeGain >= 1;
  const [prestigeCount, setPrestigeCount] = useState(0);

  function prestigeConfirm() {
    const gain = prestigeGain;
    if (gain < 1) return; 

    setDuiktcoins(dc => dc + gain);
    setPrestigeCount(pc => pc + 1);

    // reset core progress
    setCredits(0);
    setTotalCredits(0);
    setClickValue(1);

    setUpgrades(us =>
    us.map(u => ({
        ...u,
        level: 0,
        cost: u.baseCost
      }))
    );

    setCasesOpened(0);
    setBonuses([]);
    setAntibonuses([]);

    setPrestigePopup(false);
  }

  function showPrestigePopup() {
    if (prestigeUnlocked) setPrestigePopup(true);
  }
  function closePrestigePopup() {
    setPrestigePopup(false);
  }

  function buySkin(i) {
    const s = skins[i];
    if (!s.unlocked && duiktcoins >= s.cost) {
      setDuiktcoins(dc => dc - s.cost);
      setSkins(ss => ss.map((x,j) =>
        j === i ? { ...x, unlocked: true } : x
      ));
    }
  }



  // - Achievements
  // 1) Track totals and popups
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCreditsPassive, setTotalCreditsPassive] = useState(0)
  const [achievementPopups, setAchievementPopups] = useState([]);
  const [casesOpened, setCasesOpened] = useState(0);

  const [comboCount, setComboCount]       = useState(0);
  const [lastClickTime, setLastClickTime] = useState(null);


  // 2) Define all achievements with name, description, unlocked flag, and condition fn
  const [achievements, setAchievements] = useState(
    ACHIEVEMENT_DEFS.map(def => ({ ...def, unlocked: false }))
  );

  function unlockAchievements() {
    setAchievements(prev =>
      prev.map(a => {
        if (!a.unlocked && a.condition({
          totalClicks,
          totalCredits,
          totalCreditsPassive,
          upgrades,
          level,
          bonuses,
          antibonuses,
          skins,
          duiktcoins,
          clickValue,
          casesOpened, 
          comboCount, 
          critChance, 
          comboMultiplier,
          prestigeCount
        })) {
          triggerAchievementPopup(a.name);
          return { ...a, unlocked: true };
        }
        return a;
      })
    );
  }


  function triggerAchievementPopup(name) {
    const id = Date.now().toString() + '-' + (nextBubbleId++);
    setAchievementPopups(p => [...p, { id, name }]);
    setTimeout(() => {
      setAchievementPopups(p => p.filter(x => x.id !== id));
    }, 1500);
  }

  // If 2s pass without a click, reset comboCount
  useEffect(() => {
    if (comboCount === 0) return;
    const timeout = setTimeout(() => setComboCount(0), 500);
    return () => clearTimeout(timeout);
  }, [comboCount]);

  // ─── Level state (infinite)
  const [level, setLevel] = useState(0);

  // ─── Case‐popup result (null or { reward, bonus })
  const [lastCaseResult, setLastCaseResult] = useState(null);

  // ─── Recalculate clickValue based on multiplier upgrades
  const recalcClickValue = (ups) => {
    let val = 1;
    ups.forEach(u => {
      if (u.multiplier && u.level > 0) {
        val *= Math.pow(u.multiplier, u.level);
      }
    });
    return val;
  };

  // ─── LOAD SAVED STATE
  function importState(state) {
    if (!state) return;

    // 1) Core progress
    setCredits(state.credits ?? 0);
    setClickValue(state.clickValue ?? 1);
    setTotalClicks(state.totalClicks ?? 0);
    setTotalCredits(state.totalCredits ?? 0);
    setTotalCreditsPassive(state.totalCreditsPassive ?? 0);

    // 2) Prestige & currency
    setDuiktcoins(state.duiktcoins ?? 0);
    setPrestigeCount(state.prestigeCount ?? 0);

    // 3) Upgrades / bonuses / cases
    setUpgrades(state.upgrades ?? upgrades);
    setBonuses(state.bonuses ?? []);
    setAntibonuses(state.antibonuses ?? []);
    setCasesOpened(state.casesOpened ?? 0);

    // 4) Level
    setLevel(state.level ?? 0);

    if (state.skins) {
      setSkins(state.skins);                // Step 1: load new skins
    }
    if (state.skin?.name) {
      setPendingSkinName(state.skin.name);  // Step 2: defer applying skin
    }

    // 6) Achievements: merge unlocked flags into defs
    if (state.achievements) {
      setAchievements(
        ACHIEVEMENT_DEFS.map(def => {
          const saved = state.achievements.find(a => a.name === def.name);
          return { ...def, unlocked: saved?.unlocked || false };
        })
      );
    }
  }

  // ─── SAVE STATE on relevant changes
  function exportState() {
    return JSON.stringify({
      credits,
      clickValue,
      upgrades,
      duiktcoins,
      bonuses,
      antibonuses,
      skins,
      skin,
      level,
      casesOpened,
      achievements: achievements.map(a => ({ name: a.name, unlocked: a.unlocked })),           
      totalClicks,            // ← if you want to restore click-based achievements
      totalCredits,
      totalCreditsPassive,
      prestigeCount
    }, null, 2);
  }


  // ─── RECALCULATE clickValue whenever upgrades change
  useEffect(() => {
    setClickValue(recalcClickValue(upgrades));
  }, [upgrades]);

  // ─── INFINITE LEVEL: level = ⌊log₁₀(credits)⌋
  useEffect(() => {
    if (credits < 10) {
      setLevel(0);
    } else {
      const newLevel = Math.floor(Math.log10(credits));
      setLevel(newLevel);
    }
  }, [credits]);

  // ─── Case templates (names only)
  const caseTemplates = [
    { name: 'Bronze Case' },
    { name: 'Silver Case' },
    { name: 'Gold Case' },
    { name: 'Platinum Case' },
    { name: 'Diamond Case' }
  ];

  // ─── COMPUTED CASES: cost, reward range, unlock status, and associated bonus type
  const cases = caseTemplates.map((tmpl, i) => {
    const baseCost = 250 * Math.pow(15, i);
    const minReward = Math.floor(baseCost * 0.2);
    const maxReward = Math.floor(baseCost * 10);
    return {
      name: tmpl.name,
      index: i,
      baseCost,
      minReward,
      maxReward,
      unlocked: level >= i + 2,             // Case 0 unlocks at level 2, Case 1 at level 3, …
      bonusChance: 0.2,
      bonusType: ['clickMultiplier', 'passiveBoost', 'autoBoost', 'critChance', 'comboBoost'][i]
    };
  });

  // Calculated combo multiplier (for display or logic)
  const [comboMultiplier, setComboMultiplier] = useState(1);

  // Calculated crit chance (for display or logic)
  const [critChance, setCritChance] = useState(0);

  // Recompute comboMultiplier whenever upgrades or bonuses change
  useEffect(() => {
    const upgradeCombo = upgrades
      .filter(u => u.combo)
      .reduce((m, u) => m * (1 + u.level * u.combo), 1);

    const bonusCombo = bonuses
      .filter(b => b.type === 'comboBoost')
      .reduce((m, b) => m * b.value, 1);

    setComboMultiplier(upgradeCombo * bonusCombo);
  }, [upgrades, bonuses]);

  // Recompute critChance whenever upgrades or bonuses change
  useEffect(() => {
    const upgradeCrit = upgrades
      .filter(u => u.crit)
      .reduce((sum, u) => sum + u.level * u.crit, 0);

    const bonusCrit = bonuses
      .filter(b => b.type === 'critChance')
      .reduce((sum, b) => sum + b.value, 0);

    setCritChance(upgradeCrit + bonusCrit);
  }, [upgrades, bonuses]);

  // ─── CLICK HANDLER
  function handleClick() {
    const now = Date.now();
    const id = Date.now().toString() + '-' + (nextBubbleId++);

    // 1) Combo streak logic
    if (lastClickTime && now - lastClickTime < 500) {
      setComboCount(c => c + 1);
    } else {
      setComboCount(1);
    }
    setLastClickTime(now);

    // 2) Base gain
    const base = clickValue;

    // 3) Combo bonus gain (uses our state comboMultiplier)
    const comboBonusGain = base * (comboMultiplier - 1) * (comboCount > 1 ? comboCount - 1 : 0);

    // 4) Crit roll (uses our state critChance)
    const isCrit = Math.random() * 100 < critChance;
    const critMul = isCrit ? 3 : 1;

    // 5) clickMultiplier bonuses
    const clickMultFactor = bonuses
      .filter(b => b.type === 'clickMultiplier')
      .reduce((m, b) => m * (1 + b.value), 1);

    // 6) SlowClick antibonus
    const slow = antibonuses.find(a => a.type === 'slowClick');
    const slowFactor = slow ? slow.value : 1;

    // 7) Compute final gain
    const preCritGain = (base + comboBonusGain) * clickMultFactor * slowFactor;
    const finalGain   = preCritGain * critMul;

    // 8) Apply it
    setCredits(c => c + finalGain);
    setTotalClicks(c => c + 1);

    // 9) Achievements and bubbles
    unlockAchievements();
    setCreditBubbles(cb => [
      ...cb,
      { id: id, amount: finalGain, type: isCrit ? 'crit' : 'manual' }
    ]);
  }


  // ─── Define your two mappings once, at top of file ───────
const bonusMapping = {
  clickMultiplier: { value: 0.5,  duration:    0, permanent: true  },
  passiveBoost:    { value: 0.5,  duration: 30000, permanent: false },
  autoBoost:       { value: 0.5,  duration: 30000, permanent: false },
  critChance:      { value: 5,    duration:    0, permanent: true  },
  comboBoost:      { value: 2,    duration: 15000, permanent: false }
};

const antibonusMapping = {
  slowClick:      { value: 0.5,  duration: 20000, permanent: false },
  reducedPassive: { value: 0.5,  duration: 30000, permanent: false },
  noAuto:         { value: 1,    duration: 15000, permanent: false }
};

// ─── OPEN A CASE ─────────────────────────────────────────
function openCase(index) {
  const c = cases[index];
  if (!c || !c.unlocked || credits < c.baseCost) return;

  setCredits(x => x - c.baseCost);
  const reward = Math.floor(Math.random() * (c.maxReward - c.minReward + 1)) + c.minReward;

  setCasesOpened(n => n + 1);
  let awardedBonus = null;

  // Increase base chance just for testing (set back to 0.2 later)
  const anyChance = 0.4;    // 40% chance to grant either bonus or antibonus
  const antiPortion = 0.5; // 50% of those will be antibonuses

  if (Math.random() < anyChance) {
    const now = Date.now();
    const isAnti = Math.random() < antiPortion;

    if (!isAnti) {
      // positive bonus
      const def = bonusMapping[c.bonusType];
      if (def) {
        const bonus = {
          id: now, type: c.bonusType, value: def.value,
          permanent: def.permanent,
          expiresAt: def.permanent ? null : now + def.duration
        };
        setBonuses(bs => [...bs, bonus]);
        awardedBonus = c.bonusType;
        console.log('🎉 Bonus awarded:', awardedBonus);
      }
    } else {
      // antibonus
      const keys = Object.keys(antibonusMapping);
      const antiKey = keys[Math.floor(Math.random() * keys.length)];
      const def    = antibonusMapping[antiKey];
      if (def) {
        const ab = {
          id: now, type: antiKey, value: def.value,
          permanent: def.permanent,
          expiresAt: def.permanent ? null : now + def.duration
        };
        setAntibonuses(abs => [...abs, ab]);
        awardedBonus = `⚠️ ${antiKey}`;
        console.log('💥 Antibonus awarded:', awardedBonus);
      }
    }
  }

  setCreditBubbles(arr => [...arr, { id: Date.now(), amount: reward, type: 'case' }]);
  setCredits(x => x + reward);
  setLastCaseResult({ reward, bonus: awardedBonus });
}




  // Remove a bubble when its animation ends
  function removeBubble(id) {
    setCreditBubbles(prev => prev.filter(b => b.id !== id));
  }

  // CLOSE the “case result” popup
  function closeCaseResult() {
    setLastCaseResult(null);
  }

  // ─── AUTO & PASSIVE INCOME TICK (every 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      let income = 0;
      const now = Date.now();


      const noAutoActive = antibonuses.some(a => a.type === 'noAuto');
      const reduced = antibonuses.find(a => a.type === 'reducedPassive');

      upgrades.forEach(u => {
        if (u.auto && !noAutoActive) {
          let base = clickValue * u.level;
          // apply positive autoBoost bonus
          const ab = bonuses.find(b => b.type === 'autoBoost');
          if (ab) base *= (1 + ab.value);
          income += base;
        }

        if (u.passive) {
          let base = u.passive * u.level;
          // apply positive passiveBoost
          const pb = bonuses.find(b => b.type === 'passiveBoost');
          if (pb) base *= (1 + pb.value);
          // apply negative reducedPassive
          if (reduced) base *= reduced.value; // e.g. 0.5 halves passive
          income += base;
        }
      });

      if (income > 0) {
        setCredits(c => c + income);
        setTotalCreditsPassive(p => p + income);
        setCreditBubbles(cb => [...cb, { id: Date.now(), amount: income, type: 'auto' }]);
        unlockAchievements();
      }

    setBonuses(bs => bs.filter(b => b.permanent || b.expiresAt > now));
    setAntibonuses(abs => abs.filter(a => a.permanent || a.expiresAt > now));
    }, 1000);
    return () => clearInterval(interval);
  }, [upgrades, clickValue, bonuses, antibonuses]);


  // ─── BUY AN UPGRADE
  function buyUpgrade(index) {
    // 1. grab the upgrade and its cost right away
    const upg = upgrades[index];
    const cost = upg.cost;

    // 2. guard — if you can’t afford *this* cost, bail
    if (credits < cost) return;

    // 3. subtract the correct cost
    setCredits(c => c - cost);

    // 4. build your new upgrades array
    const newUps = upgrades.map((u, i) => {
      if (i !== index) return u;
      return {
        ...u,
        level: u.level + 1,
        cost: Math.floor(cost * 1.5)   // new cost based on the old one
      };
    });

    setUpgrades(newUps);
  }


  function canBuy(i) {
    return credits >= upgrades[i].cost;
  }

  // ─── PRESTIGE
  function prestige() {
    const coins = Math.floor(credits / 1000);
    setDuiktcoins(prev => prev + coins);
    setCredits(0);
    setClickValue(1);
    setUpgrades(prev =>
      prev.map(upg => ({
        ...upg,
        cost: upg.baseCost,
        level: 0,
      }))
    );
  }

  // ─── SET SKIN BY INDEX
  function setSkinByIndex(i) {
    const s = skins[i];
    if (s.unlocked) {
      setSkin(s);
      Object.entries(s.theme).forEach(([k, v]) =>
        document.documentElement.style.setProperty(k, v)
      );
    }
  }

  useEffect(() => {
    if (pendingSkinName && skins.length) {
      const idx = skins.findIndex(s => s.name === pendingSkinName);
      if (idx >= 0) {
        setSkinByIndex(idx);
      }
      setPendingSkinName(null); // clear so it doesn't re-run
    }
  }, [pendingSkinName, skins]);

  
  useEffect(() => {
    unlockAchievements();
    }, [
            totalClicks,
            totalCredits,
            totalCreditsPassive,
            upgrades,
            level,
            bonuses,
            antibonuses,
            skins,
            duiktcoins,
            clickValue,
            casesOpened, 
            comboCount, 
            critChance, 
            comboMultiplier,
            prestigeCount

    ]);



  return {
    credits,
    clickValue,
    level,
    upgrades,
    bonuses,           // array of bonus‐type strings
    cases,             // computed array of 5 case objects
    lastCaseResult,    // { reward, bonus } or null
    creditBubbles,     // array of { id, amount }
    duiktcoins,
    skins,
    skin,
    buySkin,           // see next section
    setSkinByIndex,    // equip
    prestigeGain,
    prestigeUnlocked,
    showPrestigePopup,
    closePrestigePopup,
    prestigeConfirm,
    prestigePopup,
    achievements,
    handleClick,
    buyUpgrade,
    canBuy,
    openCase,
    closeCaseResult,
    removeBubble,
    prestige,
    setSkin: setSkinByIndex,
    achievementPopups,
    setAchievementPopups, 
    exportState,
    importState,
    antibonuses,
    casesOpened,
    totalClicks,
    comboCount,
    prestigeCount,
    comboMultiplier,
    critChance,
  };
}
