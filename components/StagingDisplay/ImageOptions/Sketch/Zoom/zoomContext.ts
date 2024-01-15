import { createContext, useContext } from 'react';

interface ZoomDataContextType {
  zoomData: {
    zoom: number;
    offsetX: number;
    offsetY: number;
  };
  setZoomData: (data: {
    zoom: number;
    offsetX: number;
    offsetY: number;
  }) => void;
}

export const ZoomDataContext = createContext<ZoomDataContextType>({
  zoomData: { zoom: 1, offsetX: 0, offsetY: 0 },
  setZoomData: () => {},
});

export const useZoomData = () => useContext(ZoomDataContext);
