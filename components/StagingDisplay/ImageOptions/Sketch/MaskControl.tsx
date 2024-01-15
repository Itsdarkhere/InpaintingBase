import React from 'react';
import BACK2 from '../../../../public/back2.svg';
import DELETE from '../../../../public/delete.svg';
import Image from 'next/image';
import styles from '../../../../styles/MaskControl.module.css';
import { Tooltip } from '@mui/material';
import { Slider } from '@mui/material';

export default function MaskControl({
  undo,
  sliderChange,
  onSliderChangeCommitted,
  clear,
  strokeWidth,
}: {
  undo: () => void;
  sliderChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  onSliderChangeCommitted: () => void;
  clear: () => void;
  strokeWidth: number;
}) {
  return (
    <div className={styles.maskControl}>
      {/* <div className={styles.controlTop}>
        <label className={styles.controlLabel}>Mask Controls</label>
      </div> */}
      <div className={styles.controlBottom}>
        <Slider
          min={25}
          max={200}
          onChange={sliderChange}
          onChangeCommitted={onSliderChangeCommitted}
          defaultValue={50}
          id="copies"
          name="width"
        />
        <input
          className={styles.controlValue}
          type={'text'}
          readOnly={true}
          value={strokeWidth}
        />
        <Tooltip title="Undo previous action">
          <button className={`${styles.controlB}`} onClick={undo} type="button">
            <Image width={20} height={20} src={BACK2} alt="back" />
          </button>
        </Tooltip>
        <Tooltip title="Remove paint">
          <button
            type="button"
            className={`${styles.controlR}`}
            onClick={clear}
          >
            <Image width={20} height={20} src={DELETE} alt="back" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
