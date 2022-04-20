import Head from "next/head";
import styles from "./styles.module.scss"

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating BLALBALBAB BLABLB LVBBa deass</strong>
            <p>O Textp é chato jdsaodias asjdoaijd aojij oia</p>
          </a>
        </div>
      </main>
    </>
  );
}