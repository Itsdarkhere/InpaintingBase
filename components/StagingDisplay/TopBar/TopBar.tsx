import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../../styles/TopBar.module.css';

export default function TopBar({
  setImage,
  canRemove,
}: {
  setImage: (image: string | undefined) => void;
  canRemove: boolean;
}) {
  // Remove image from state
  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(undefined);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        {canRemove && (
          <Button
            startIcon={<DeleteIcon />}
            onClick={removeImage}
            type="button"
            color="error"
            variant="contained"
            size="small"
          >
            Remove Image
          </Button>
        )}
      </div>
      {/* <ToggleButtonGroup
        value={mode}
        color="primary"
        exclusive
        onChange={changeMode}
        aria-label="text alignment"
        style={{ height: '100%' }}
      >
        <ToggleButton
          style={{ fontSize: 12, border: 'none' }}
          value="inpainting"
          aria-label="left aligned"
        >
          Inpainting
        </ToggleButton>
        <ToggleButton
          style={{ fontSize: 12, border: 'none' }}
          value="img2img"
          aria-label="centered"
        >
          IMG2IMG
        </ToggleButton>
        <ToggleButton
          style={{ fontSize: 12, border: 'none' }}
          value="controlnet"
          aria-label="right aligned"
        >
          Controlnet
        </ToggleButton>
      </ToggleButtonGroup> */}
    </div>
  );
}
