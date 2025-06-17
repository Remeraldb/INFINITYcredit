import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ClickButton.module.scss';
import clickAudio from '../assets/sounds/click.mp3';

export default function ClickButton({ clicker }) {

  function onClick() {
    const clickSound = new Audio(clickAudio);
    clickSound.volume = 0.05;
    clickSound.play().catch(err => {
      console.warn('Audio play error:', err);
    });

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
