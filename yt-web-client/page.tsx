import styles from "./page.module.css";
import { getVideos } from './firebase/functions'

export default function Home() {
  await getVideos();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
          </p>
      </div>
    </main>
  )
}
