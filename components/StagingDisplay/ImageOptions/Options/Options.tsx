import Spinner from '@/components/Spinner';
import React from 'react';
import styles from '../../../../styles/Options.module.css';
import Image from 'next/image';
import wand from '../../../../public/generate.svg';
import { Slider } from '@mui/material';
import { Button } from '@mui/material';
import FormSelect from '@/components/FormSelect';

export default function Options({
  fetching,
  copies,
  copiesChange,
}: {
  fetching: boolean;
  copies: number;
  copiesChange: (value: number) => void;
}) {
  interface Option {
    value: string;
    label: string;
  }

  const furnitureOptions: Option[] = [
    { value: 'bedroom9800.pt', label: 'Bedroom' },
    { value: 'dining', label: 'Dining room' },
    { value: 'boardroom10000.pt', label: 'Boardroom' },
    { value: 'empty5000.pt', label: 'Remove anything' },
    { value: 'wall', label: 'Just a wall' },
    { value: 'office', label: 'Office' },
    { value: 'bluesky', label: 'Blue sky' },
    { value: 'living10000.pt', label: 'Living room' },
    { value: 'privateoffice10000.pt', label: 'Private office' },
  ];

  return (
    <div className={styles.container}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="what_to_add" className={styles.label}>
          Select room type
        </label>
        <FormSelect
          options={furnitureOptions}
          onChange={undefined}
          hasOnChange={false}
          name="what_to_add"
          placeholder="Room type"
        />
        <label
          htmlFor="copies"
          style={{ marginTop: 15 }}
          className={styles.label}
        >
          Amount of copies
        </label>
        {/* <Slider
          id="copies"
          name="copies"
          aria-label="copies"
          min={1}
          max={8}
          step={1}
          value={copies}
          onChange={sliderChange}
        /> */}
        <div className={styles.btnGroup}>
          <div className={styles.btnInner}>
            <Button
              onClick={() => copiesChange(1)}
              variant={copies === 1 ? 'contained' : 'outlined'}
              style={{ flex: 1 }}
            >
              1
            </Button>
            <Button
              onClick={() => copiesChange(2)}
              variant={copies === 2 ? 'contained' : 'outlined'}
              style={{ flex: 1 }}
            >
              2
            </Button>
            <Button
              onClick={() => copiesChange(3)}
              variant={copies === 3 ? 'contained' : 'outlined'}
              style={{ flex: 1 }}
            >
              3
            </Button>
          </div>
          <div className={styles.btnInner}>
            <Button
              onClick={() => copiesChange(4)}
              variant={copies === 4 ? 'contained' : 'outlined'}
              style={{ flex: 1 }}
            >
              4
            </Button>
            <Button
              onClick={() => copiesChange(5)}
              variant={copies === 5 ? 'contained' : 'outlined'}
              style={{ flex: 1 }}
            >
              5
            </Button>
            <Button
              onClick={() => copiesChange(6)}
              variant={copies === 6 ? 'contained' : 'outlined'}
              style={{ flex: 1 }}
            >
              6
            </Button>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        disabled={fetching}
        variant="contained"
        style={{ height: 45, marginTop: 20 }}
      >
        {fetching ? (
          <Spinner wh={30} white={false} />
        ) : (
          <>
            Generate{' '}
            <Image
              src={wand}
              style={{ width: 25, height: 25, marginLeft: 2 }}
              alt="wand"
            />
          </>
        )}
      </Button>
    </div>
  );
}
