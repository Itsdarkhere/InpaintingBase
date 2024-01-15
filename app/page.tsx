import StagingDisplay from '@/components/StagingDisplay/StagingDisplay'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <StagingDisplay />
    </main>
  )
}
