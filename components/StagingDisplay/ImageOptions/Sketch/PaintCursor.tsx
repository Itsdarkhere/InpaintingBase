import React, { useState, useEffect } from 'react';
import styles from '../../../../styles/PaintCursor.module.css';

export default function PaintCursor({
  size,
  position,
}: {
  size: number;
  position: { x: number; y: number };
}) {
  return (
    <div
      style={{
        top: position.y + 'px',
        left: position.x + 'px',
        width: size,
        height: size,
      }}
      className={styles.cursorCircle}
    ></div>
  );
}
