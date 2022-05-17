import { GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "../../services/prismic";
import styles from "./styles.module.scss"

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            <a key={post.slug} href="#">
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}a</p>
          </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (previewData) => {
  const client = createClient({ previewData })

  const response = await client.getAllByType('post', {
    pageSize: 100,
  })
  console.log(response)
  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: post.data.title[0].text, // is better to use prismic dom package
      excerpt: post.data.Content.find(content => content.type === 'paragraph')?.text ?? '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  console.log(posts)
  return {
    props: { posts }, // Will be passed to the page component as props
  }
}