import React from 'react';
import styles from '../styles/Spinner.module.css';

export default function Spinner({ wh, white }: { wh: number; white: boolean }) {
  return (
    <div
      className={`${styles.spinner} ${white ? styles.white : styles.black}`}
      style={{ width: wh, height: wh }}
    ></div>
  );
}
