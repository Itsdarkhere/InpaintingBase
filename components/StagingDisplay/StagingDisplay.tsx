/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useRef, useState } from 'react';
import styles from '../../styles/StagingDisplay.module.css';
import ImageOptions from './ImageOptions/ImageOptions';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function StagingDisplay() {
  const [originalImage, setImage] = useState<string | undefined>(undefined);
  const sketchRef = useRef<any>(null);
  
  return (
    <div className={styles.stagingDisplay}>
      {/* Image and options */}
      <ImageOptions
        originalImage={originalImage}
        sketchRef={sketchRef}
        setImage={setImage}
      />
    </div>
  );
}
