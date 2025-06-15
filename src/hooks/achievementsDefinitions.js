// src/hooks/achievementsDefinitions.js

export const ACHIEVEMENT_DEFS = [

  // ─── Click Achievements ─────────────────────────────────────
  { name: 'First Click',           description: 'Make your very first click',       condition: s => s.totalClicks >= 1 },
  { name: 'Click Cadet',           description: 'Click 50 times',                   condition: s => s.totalClicks >= 50 },
  { name: 'Click Pro',             description: 'Click 200 times',                  condition: s => s.totalClicks >= 200 },
  { name: 'Click Master',          description: 'Click 1 000 times',                condition: s => s.totalClicks >= 1_000 },
  { name: 'Click Legend',          description: 'Click 10 000 times',               condition: s => s.totalClicks >= 10_000 },
  { name: 'Click God',             description: 'Click 100 000 times',              condition: s => s.totalClicks >= 100_000 },
  { name: 'Click Illimitable',     description: 'Click 1 000 000 times',            condition: s => s.totalClicks >= 1_000_000 },

  // ─── Level Achievements ─────────────────────────────────────
  { name: 'Level I',               description: 'Reach level 1',                    condition: s => s.level >= 1 },
  { name: 'Level V',               description: 'Reach level 5',                    condition: s => s.level >= 5 },
  { name: 'Level X',               description: 'Reach level 10',                   condition: s => s.level >= 10 },
  { name: 'Level Century',         description: 'Reach level 100',                  condition: s => s.level >= 100 },
  { name: 'Level Millennial',      description: 'Reach level 1 000',                condition: s => s.level >= 1_000 },

  // ─── Earned Credits Achievements ────────────────────────────
  { name: 'Collector I',           description: 'Earn 100 credits total',           condition: s => s.totalCredits >= 100 },
  { name: 'Collector II',          description: 'Earn 1 000 credits total',         condition: s => s.totalCredits >= 1_000 },
  { name: 'Collector III',         description: 'Earn 10 000 credits total',        condition: s => s.totalCredits >= 10_000 },
  { name: 'Collector IV',          description: 'Earn 100 000 credits total',       condition: s => s.totalCredits >= 100_000 },
  { name: 'Collector V',           description: 'Earn 1 000 000 credits total',     condition: s => s.totalCredits >= 1_000_000 },
  { name: 'Collector VI',          description: 'Earn 10 000 000 credits total',    condition: s => s.totalCredits >= 10_000_000 },
  { name: 'Collector VII',         description: 'Earn 100 000 000 credits total',   condition: s => s.totalCredits >= 100_000_000 },
  { name: 'Collector VIII',        description: 'Earn 1 000 000 000 credits total', condition: s => s.totalCredits >= 1_000_000_000 },
  { name: 'Collector IX',          description: 'Earn 1 000 000 000 000 credits',   condition: s => s.totalCredits >= 1_000_000_000_000 },
  { name: 'Collector X',           description: 'Earn 1 000 000 000 000 000 credits', condition: s => s.totalCredits >= 1_000_000_000_000_000 },

  // ─── Upgrades Purchased ─────────────────────────────────────
  { name: 'Upgrade Novice',        description: 'Buy 1 upgrade level',              condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 1 },
  { name: 'Upgrade Enthusiast',    description: 'Buy 5 total upgrade levels',       condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 5 },
  { name: 'Upgrade Veteran',       description: 'Buy 10 total upgrade levels',      condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 10 },
  { name: 'Upgrade Elite',         description: 'Buy 100 total upgrade levels',     condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 100 },
  { name: 'Upgrade Master',        description: 'Buy 500 total upgrade levels',     condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 500 },
  { name: 'Upgrade Legend',        description: 'Buy 1 000 total upgrade levels',   condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 1_000 },
  { name: 'Upgrade Illimitable',   description: 'Buy 10 000 total upgrade levels',  condition: s => s.upgrades.reduce((a,u)=>a+u.level,0) >= 10_000 },

  // ─── Cases Opened ───────────────────────────────────────────
  { name: 'Case Opener I',         description: 'Open 1 case',                      condition: s => s.casesOpened >= 1 },
  { name: 'Case Opener II',        description: 'Open 10 cases',                    condition: s => s.casesOpened >= 10 },
  { name: 'Case Opener III',       description: 'Open 100 cases',                   condition: s => s.casesOpened >= 100 },
  { name: 'Case Opener IV',        description: 'Open 1 000 cases',                 condition: s => s.casesOpened >= 1_000 },
  { name: 'Case Opener V',         description: 'Open 10 000 cases',                condition: s => s.casesOpened >= 10_000 },

  // ─── Bonuses Collected ──────────────────────────────────────
  { name: 'Bonus Collector I',     description: 'Collect 1 bonus',                  condition: s => s.bonuses.length >= 1 },
  { name: 'Bonus Collector II',    description: 'Collect 5 bonuses',               condition: s => s.bonuses.length >= 5 },
  { name: 'Bonus Collector III',   description: 'Collect 10 bonuses',              condition: s => s.bonuses.length >= 10 },
  { name: 'Bonus Collector IV',    description: 'Collect 25 bonuses',              condition: s => s.bonuses.length >= 25 },
  { name: 'Bonus Collector V',     description: 'Collect 50 bonuses',              condition: s => s.bonuses.length >= 50 },

  // ─── Skins Unlocked ─────────────────────────────────────────
  { name: 'Skinned II',            description: 'Unlock 2 skins',                   condition: s => s.skins.filter(x=>x.unlocked).length >= 2 },
  { name: 'Skinned III',           description: 'Unlock 3 skins',                   condition: s => s.skins.filter(x=>x.unlocked).length >= 3 },
  { name: 'Skinned V',             description: 'Unlock 5 skins',                   condition: s => s.skins.filter(x=>x.unlocked).length >= 5 },
  { name: 'Cyber Unlocked',        description: 'Unlock the Cyber skin',            condition: s => s.skins.some(x=>x.name==='Cyber' && x.unlocked) },
  { name: 'Solar Unlocked',        description: 'Unlock the Solar skin',            condition: s => s.skins.some(x=>x.name==='Solar' && x.unlocked) },
  { name: 'Lunar Unlocked',        description: 'Unlock the Lunar skin',            condition: s => s.skins.some(x=>x.name==='Lunar' && x.unlocked) },
  { name: 'Nebula Unlocked',       description: 'Unlock the Nebula skin',           condition: s => s.skins.some(x=>x.name==='Nebula' && x.unlocked) },

  // ─── Prestige (∞coins) ──────────────────────────────────────
  { name: 'Prestige I',   description: 'Prestige once',             condition: s => s.prestigeCount >= 1 },
  { name: 'Prestige III', description: 'Prestige 3 times',         condition: s => s.prestigeCount >= 3 },
  { name: 'Prestige V',   description: 'Prestige 5 times',         condition: s => s.prestigeCount >= 5 },
  { name: 'Prestige X',   description: 'Prestige 10 times',        condition: s => s.prestigeCount >= 10 },
  { name: 'Prestige XX',  description: 'Prestige 20 times',        condition: s => s.prestigeCount >= 20 },

  // ─── Click Value Milestones ─────────────────────────────────
  { name: 'Click Power X10',       description: 'Reach click value ≥ 10',          condition: s => s.clickValue >= 10 },
  { name: 'Click Power X100',      description: 'Reach click value ≥ 100',         condition: s => s.clickValue >= 100 },
  { name: 'Click Power X10K',      description: 'Reach click value ≥ 10 000',      condition: s => s.clickValue >= 10_000 },
  { name: 'Click Power X1M',       description: 'Reach click value ≥ 1 000 000',    condition: s => s.clickValue >= 1_000_000 },
  { name: 'Click Power X1B',       description: 'Reach click value ≥ 1 000 000 000',condition: s => s.clickValue >= 1_000_000_000 },

  // ─── Passive Income Milestones ───────────────────────────────
  { name: 'Passive I',             description: 'Earn passive income once',         condition: s => s.totalCreditsPassive > 0 },
  { name: 'Passive II',            description: 'Earn 100 passive credits',         condition: s => s.totalCreditsPassive >= 100 },
  { name: 'Passive III',           description: 'Earn 10 000 passive credits',      condition: s => s.totalCreditsPassive >= 10_000 },
  { name: 'Passive IV',            description: 'Earn 1 000 000 passive credits',   condition: s => s.totalCreditsPassive >= 1_000_000 },
  { name: 'Passive V',             description: 'Earn 1 000 000 000 passive credits', condition: s => s.totalCreditsPassive >= 1_000_000_000 },

  // ─── INFINITYcoin Milestones ─────────────────────────────────
  { name: '∞coin I',               description: 'Gain 1 INFINITYcoin',              condition: s => s.duiktcoins >= 1 },
  { name: '∞coin II',              description: 'Gain 100 INFINITYcoins',           condition: s => s.duiktcoins >= 100 },
  { name: '∞coin III',             description: 'Gain 500 INFINITYcoins',           condition: s => s.duiktcoins >= 500 },
  { name: '∞coin IV',              description: 'Gain 1 000 INFINITYcoins',         condition: s => s.duiktcoins >= 1_000 },
  { name: '∞coin V',               description: 'Gain 10 000 INFINITYcoins',        condition: s => s.duiktcoins >= 10_000 },

  // ─── Crit Chance Milestones ──────────────────────────────────
  { name: 'Crit I',                description: 'Have 5% critical chance',          condition: s => s.critChance >= 5 },
  { name: 'Crit II',               description: 'Have 20% critical chance',         condition: s => s.critChance >= 20 },
  { name: 'Crit III',              description: 'Have 50% critical chance',         condition: s => s.critChance >= 50 },
  { name: 'Crit IV',               description: 'Have 100% critical chance',        condition: s => s.critChance >= 100 },
  { name: 'Crit V',                description: 'Have 500% critical chance',        condition: s => s.critChance >= 500 },

  // ─── Combo Count Milestones ──────────────────────────────────
  { name: 'Combo Streak 10',       description: 'Achieve combo streak of 10',       condition: s => s.comboCount >= 10 },
  { name: 'Combo Streak 50',       description: 'Achieve combo streak of 50',       condition: s => s.comboCount >= 50 },
  { name: 'Combo Streak 100',      description: 'Achieve combo streak of 100',      condition: s => s.comboCount >= 100 },
  { name: 'Combo Streak 500',      description: 'Achieve combo streak of 500',      condition: s => s.comboCount >= 500 },
  { name: 'Combo Streak 1K',       description: 'Achieve combo streak of 1 000',    condition: s => s.comboCount >= 1_000 },
  { name: 'Combo Streak 10K',      description: 'Achieve combo streak of 10 000',   condition: s => s.comboCount >= 10_000 },
  { name: 'Combo Streak 50K',      description: 'Achieve combo streak of 50 000',   condition: s => s.comboCount >= 50_000 },
  { name: 'Combo Streak 100K',     description: 'Achieve combo streak of 100 000',  condition: s => s.comboCount >= 100_000 },
  { name: 'Combo Streak 1M',       description: 'Achieve combo streak of 1 000 000',condition: s => s.comboCount >= 1_000_000 },

  // ─── Combo Multiplier Milestones ─────────────────────────────
  { name: 'Combo ×2',              description: 'Reach combo multiplier ×2',        condition: s => s.comboMultiplier >= 2 },
  { name: 'Combo ×5',              description: 'Reach combo multiplier ×5',        condition: s => s.comboMultiplier >= 5 },
  { name: 'Combo ×10',             description: 'Reach combo multiplier ×10',       condition: s => s.comboMultiplier >= 10 },
  { name: 'Combo ×50',             description: 'Reach combo multiplier ×50',       condition: s => s.comboMultiplier >= 50 },
  { name: 'Combo ×100',            description: 'Reach combo multiplier ×100',      condition: s => s.comboMultiplier >= 100 },
  { name: 'Combo ×1K',             description: 'Reach combo multiplier ×1 000',    condition: s => s.comboMultiplier >= 1_000 },
  { name: 'Combo ×10K',            description: 'Reach combo multiplier ×10 000',   condition: s => s.comboMultiplier >= 10_000 }
];
