import Sketch from '@/components/StagingDisplay/ImageOptions/Sketch/Sketch';
import { RefObject, useState } from 'react';
import styles from '../../../styles/ImageOptions.module.css';
import TopBar from '../TopBar/TopBar';
import ImageDrop from './ImageDrop/ImageDrop';

export default function ImageOptions({
  originalImage,
  sketchRef,
  setImage,
}: {
  originalImage: string | undefined;
  sketchRef: RefObject<any>;
  setImage: (image: string | undefined) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <form className={styles.container}>
      <TopBar setImage={setImage} canRemove={loaded} />
      <div className={styles.innerContainer}>
        <div className={styles.sketchcontainer}>
          {originalImage && loaded ? (
            <Sketch
              originalImage={originalImage}
              sketchRef={sketchRef}
            />
          ) : (
            <ImageDrop
              originalImage={originalImage}
              setImage={setImage}
              loaded={loaded}
              setLoaded={setLoaded}
            />
          )}
        </div>
      </div>
    </form>
  );
}
