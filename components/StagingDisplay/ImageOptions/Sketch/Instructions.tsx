import { motion } from 'framer-motion';
import styles from '../../../../styles/StagingDisplay.module.css';
import { Alert, AlertTitle } from '@mui/material';

export default function Instructions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { delay: 0.5, duration: 0.4 },
      }}
      className={`${styles.instructionContainer}`}
    >
      <Alert severity="info" color="info">
        <AlertTitle>
          <strong>Draw</strong> on the parts of the image you want to modify.
        </AlertTitle>
        To avoid modifying floor materials etc,{' '}
        <strong>leave a part of it unpainted.</strong>
      </Alert>
    </motion.div>
  );
}
