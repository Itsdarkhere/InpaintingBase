import styles from '../../../../../../styles/FormInpainting.module.css';

export default function OptionsModel({
  clickMode,
  mode,
}: {
  clickMode: (mode: boolean) => void;
  mode: string;
}) {
  return (
    <div className={styles.ipButtonContainer}>
      <button
        type="button"
        className={`${styles.ipButton} 
              ${!mode && styles.selected}`}
        onClick={() => clickMode(false)}
      >
        {/* <Image
          className={`${!mode && styles.brightImage}`}
          src={PLUS}
          alt="plus"
          style={{ marginBottom: 5 }}
        /> */}
        Inpainting
      </button>
      <button
        type="button"
        className={`${styles.ipButton} ${mode && styles.selected}`}
        onClick={() => clickMode(true)}
      >
        {/* <Image
          className={`${mode && styles.brightImage}`}
          src={TRASH}
          alt="plus"
          style={{ marginBottom: 5 }}
        /> */}
        Img2Img
      </button>
      <button
        type="button"
        className={`${styles.ipButton} ${mode && styles.selected}`}
        onClick={() => clickMode(true)}
      >
        {/* <Image
          className={`${mode && styles.brightImage}`}
          src={REPLACE}
          height={15}
          alt="plus"
          style={{ marginBottom: 5 }}
        /> */}
        Controlnet
      </button>
    </div>
  );
}
