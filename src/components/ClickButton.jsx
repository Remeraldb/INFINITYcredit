import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ClickButton.module.scss';
import { useClickSound } from '../hooks/useClickSound';


export default function ClickButton({ clicker }) {
  const playClick = useClickSound();

  function onClick() {
    playClick();
    clicker.handleClick();
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={styles.clickButton}
      onClick={onClick}
    >
      +{clicker.clickValue} credits
    </motion.button>
  );
}
