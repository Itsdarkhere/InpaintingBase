/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MaskControl from './MaskControl';
import PaintCursor from './PaintCursor';
import styles from '../../../../styles/StagingDisplay.module.css';
import ZoomParent from './Zoom/ZoomParent';

export default function Sketch({
  originalImage,
  sketchRef,
}: {
  originalImage: string;
  sketchRef: RefObject<any>;
}) {
  // State
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const [showBrushCursor, setShowBrushCursor] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [imgLoading, setImageLoading] = useState(true);
  const [paths, setPaths] = useState<
    Array<{ x: number; y: number; strokeWidth: number }[]>
  >([]);
  const [zoomData, setZoomData] = useState({
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowInstructions(true);
    clearAllPaths();
    setImageLoading(true);
  }, [originalImage]);

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoading(false);
  };

  const undoCanvas = () => {
    console.error('undoCanvas not implemented');
  };

  const sliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === 'number') {
      // Center and show the paint cursor
      if (!showBrushCursor) {
        setShowBrushCursor(true);
        centerPaintCursor();
      }
      setStrokeWidth(value);
    }
  };

  const centerPaintCursor = () => {
    const element = containerRef.current;
    if (element) {  
      const { zoom } = zoomData;
      const rect = element.getBoundingClientRect();
      const centerX = (rect.width / 2 - zoomData.offsetX) / zoom;
      const centerY = (rect.height / 2 - zoomData.offsetY) / zoom;
      setPosition({ x: centerX, y: centerY });
    }
  };

  const onSliderChangeCommitted = () => {
    setShowBrushCursor(false);
  };

  const clearAllPaths = useCallback(() => {
    if (!sketchRef.current) {
      return;
    }

    // Clear the canvas
    const ctx = sketchRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, sketchRef.current.width, sketchRef.current.height);

    // Reset the paths state
    setPaths([]);
  }, []);

  return (
    <div className={`${styles.box}`}>
      <div className={styles.loadable}>
        <ZoomParent
          strokeWidth={(strokeWidth / zoomData.zoom) / 2} // Its radius in here
          setShowBrushCursor={setShowBrushCursor}
          showInstructions={showInstructions}
          imgLoading={imgLoading}
          setPosition={setPosition}
          setShowInstructions={setShowInstructions}
          sketchRef={sketchRef}
          containerRef={containerRef}
          zoomRef={zoomRef}
          paths={paths}
          setPaths={setPaths}
          zoomData={zoomData}
          setZoomData={setZoomData}
        >
          <motion.img
            initial={{ height: '10rem', opacity: 0 }}
            animate={{
              height: imgLoading ? '10rem' : 'auto',
              opacity: imgLoading ? 0 : 1,
            }}
            className={`${styles.img}`}
            transition={{
              opacity: { delay: 0.3, duration: 0.2 },
              height: { delay: 0, duration: 0.2 },
            }}
            onLoad={onImageLoad}
            width="auto"
            src={originalImage}
          />
          {showBrushCursor && (
            <PaintCursor size={strokeWidth / zoomData.zoom} position={position} />
          )}
        </ZoomParent>
      </div>
      {!imgLoading && (
        <MaskControl
          undo={undoCanvas}
          sliderChange={sliderChange}
          onSliderChangeCommitted={onSliderChangeCommitted}
          clear={clearAllPaths}
          strokeWidth={strokeWidth}
        />
      )}
    </div>
  );
}
