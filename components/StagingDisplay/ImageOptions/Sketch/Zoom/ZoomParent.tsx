import { AnimatePresence } from 'framer-motion';
import React, {
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import Instructions from '../Instructions';

interface ZoomableParentProps {
  children: ReactNode;
  strokeWidth: number;
  paths: Array<{ x: number; y: number; strokeWidth: number }[]>;
  sketchRef: React.MutableRefObject<any>;
  zoomRef: React.MutableRefObject<any>;
  showInstructions: boolean;
  imgLoading: boolean;
  setShowBrushCursor: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  containerRef: React.RefObject<HTMLDivElement>;
  setPaths: React.Dispatch<
    React.SetStateAction<Array<{ x: number; y: number; strokeWidth: number }[]>>
  >;
  zoomData: {
    zoom: number;
    offsetX: number;
    offsetY: number;
  };
  setZoomData: React.Dispatch<
    React.SetStateAction<{
      zoom: number;
      offsetX: number;
      offsetY: number;
    }>
  >;
}

const ZoomParent: React.FC<ZoomableParentProps> = ({
  children,
  strokeWidth,
  showInstructions,
  containerRef,
  imgLoading,
  setPosition,
  zoomRef,
  setShowBrushCursor,
  setShowInstructions,
  sketchRef,
  paths,
  setPaths,
  zoomData,
  setZoomData,
}) => {
  // Add a new state for tracking whether you are currently drawing
  const [drawing, setDrawing] = useState(false);
  const [isNewStroke, setIsNewStroke] = useState(true);

  // Create the handleMouseDown and handleMouseUp functions
  const handleMouseDown = () => {
    setDrawing(true);
    setIsNewStroke(true);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  // Create the handleMouseMove function
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.pageX, e.pageY);
    if (!drawing) return;
    drawMask(e.pageX, e.pageY);
  };

  const handleMove = (pageX: number, pageY: number) => {
    const { offsetX, offsetY, zoom } = zoomData;
    const containerPosition = getContainerPosition();
    const x = (pageX - offsetX - containerPosition.x) / zoom;
    const y = (pageY - offsetY - containerPosition.y) / zoom;

    setPosition({ x, y });
  };

  const getContainerPosition = (): { x: number; y: number } => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      return { x: containerRect.left, y: containerRect.top };
    }
    return { x: 0, y: 0 };
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    const containerPosition = getContainerPosition();

    setZoomData((prevState) => {
      const newZoom = Math.max(prevState.zoom * delta, 1);

      const mouseXRelativeToContainer = e.clientX - containerPosition.x;
      const mouseYRelativeToContainer = e.clientY - containerPosition.y;

      const mouseXRelativeToImage = mouseXRelativeToContainer - prevState.offsetX;
      const mouseYRelativeToImage = mouseYRelativeToContainer - prevState.offsetY;

      const offsetX = prevState.offsetX - (delta - 1) * mouseXRelativeToImage;
      const offsetY = prevState.offsetY - (delta - 1) * mouseYRelativeToImage;

      return {
        zoom: newZoom,
        offsetX: newZoom === 1 ? 0 : offsetX,
        offsetY: newZoom === 1 ? 0 : offsetY,
      };
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const updateTransform = () => {
    const { zoom, offsetX, offsetY } = zoomData;
    if (zoomRef.current) {
      zoomRef.current.style.transformOrigin = '0 0';
      zoomRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
    }
  };

  useEffect(() => {
    updateTransform();
  }, [zoomData]);

  const drawMask = useCallback(
    (clientX: number, clientY: number) => {
      if (!sketchRef.current) {
        return;
      }

      const ctx = sketchRef.current.getContext('2d');
      const { offsetX, offsetY, zoom } = zoomData;
      const containerPosition = getContainerPosition();
      const x = (clientX - offsetX - containerPosition.x) / zoom;
      const y = (clientY - offsetY - containerPosition.y) / zoom;

      setPaths((prevPaths) => {
        const newPath = [...prevPaths];
        if (
          newPath.length === 0 ||
          !Array.isArray(newPath[newPath.length - 1])
        ) {
          newPath.push([]);
        }
        newPath[newPath.length - 1].push({ x, y, strokeWidth });
        return newPath;
      });

      if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, strokeWidth, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        if (
          !isNewStroke &&
          paths.length > 0 &&
          paths[paths.length - 1].length >= 2
        ) {
          const currentStroke = paths[paths.length - 1];
          const lastPoint = currentStroke[currentStroke.length - 2];
          const dx = x - lastPoint.x;
          const dy = y - lastPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const steps = Math.ceil(distance / strokeWidth);

          for (let i = 1; i < steps; i++) {
            const interpolatedX = lastPoint.x + (dx * i) / steps;
            const interpolatedY = lastPoint.y + (dy * i) / steps;
            ctx.beginPath();
            ctx.arc(
              interpolatedX,
              interpolatedY,
              strokeWidth,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
          }
        }
      }

      setIsNewStroke(false);
    },
    [zoomData, paths, drawing, isNewStroke]
  );

  useEffect(() => {
    if (sketchRef.current) {
      const ctx = sketchRef.current.getContext('2d');
      if (!ctx) return;
      // Remove old paths
      ctx.clearRect(0, 0, sketchRef.current.width, sketchRef.current.height);

      // Draw paths again
      for (const path of paths) {
        for (const point of path) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.strokeWidth, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
        }
      }
    }
  }, [zoomData.zoom]);

  const onMouseEnter = () => {
    setShowInstructions(false);
    setShowBrushCursor(true);
  };

  useEffect(() => {
    if (containerRef.current && sketchRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          if (!sketchRef.current) return;
          sketchRef.current.width = width;
          sketchRef.current.height = height;
        }
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [containerRef, sketchRef]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowBrushCursor(false)}
      onMouseEnter={() => onMouseEnter()}
      style={{ position: 'relative' }}
    >
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showInstructions && !imgLoading && <Instructions />}
      </AnimatePresence>
      <div ref={zoomRef}>
        <canvas
          ref={sketchRef}
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default ZoomParent;
