'use client';
import { Button } from '@mui/material';
import Image from 'next/image';
import styles from '../../../../styles/ImageDrop.module.css';
import React, { useEffect, useState } from 'react';
import IMGUP from '../../../../public/imageup.svg';
import Spinner from '@/components/Spinner';

export default function ImageDrop({
  originalImage,
  setImage,
  loaded,
  setLoaded,
}: {
  originalImage: string | undefined;
  setImage: (image: string | undefined) => void;
  setLoaded: (loaded: boolean) => void;
  loaded: boolean;
}) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [originalImage]);

  // triggers when file is dropped
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadingPhoto(true);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Upload image to S3
      setImage(URL.createObjectURL(file));
      // await uploadPhoto(file);
    } else {
      setUploadingPhoto(false);
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUploadingPhoto(true);
    let file;
    // Handle possible error cases
    try {
      file = e.target.files?.[0]!;
    } catch {
      setUploadingPhoto(false);
      return;
    }
    // Upload image to S3
    console.log('b4 file');
    setImage(URL.createObjectURL(file));
    e.target.value = '';
  };

  // handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };


  const handleImageLoad = () => {
    console.log('loaded')
    setLoaded(true);
  };

  return (
    <div className={styles.container} onDragEnter={handleDrag}>
      <label
        htmlFor="input-file-upload"
        className={`${styles.inputLabel} ${dragActive && styles.drag_active}`}
      >
        <div className={styles.inputLabelInner}>
          {/* This is just for checking when image has loaded */}
          {originalImage !== undefined && (
            <Image
              onLoad={handleImageLoad}
              fill
              style={{ opacity: 0 }}
              src={originalImage}
              alt="load check"
            />
          )}
          {/* Show this when we are loading the image */}
          {uploadingPhoto ||
            (originalImage !== undefined && !loaded && (
              <Spinner wh={45} white={false} />
            ))}

          {/* Before uploading an image */}
          {originalImage === undefined && !uploadingPhoto && (
            <>
              <Image height={75} src={IMGUP} alt="upload" />
              <p className={styles.p}>
                Drag your image here to start uploading
              </p>
              <p className={styles.span}>───── OR ─────</p>
              <Button
                variant="contained"
                component="label"
                style={{
                  marginTop: 15,
                  textTransform: 'none',
                  position: 'relative',
                  backgroundColor: 'rgb(99, 102, 241)',
                  height: 40,
                  paddingLeft: 25,
                  paddingRight: 25,
                }}
              >
                Browse files
                <input
                  accept="image/*"
                  multiple={false}
                  onChange={handleChange}
                  type="file"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  name="input-file-upload"
                  required={originalImage ? false : true}
                />
              </Button>
            </>
          )}
        </div>
      </label>
      {dragActive && (
        <div
          className={styles.dragFileElement}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
}
