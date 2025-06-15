import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ClickButton.module.scss';

export default function ClickButton({ clicker }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={styles.clickButton}
      onClick={clicker.handleClick}
    >
      +{clicker.clickValue} credits
    </motion.button>
  );
}
