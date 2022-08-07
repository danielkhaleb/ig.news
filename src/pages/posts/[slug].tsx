import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";
import { createClient } from "../../services/prismic";
import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  }
}

export default function Post({ post } : PostProps) {
  return (
    <>
      <Head>
        <title>
          {post.title} | Ignews
        </title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const client = createClient(req);
  const response = await client.getByUID('post', String(slug));

  const post = {
    slug,
    title: response.data.title[0].text,
    content: response.data.Content[0].text,
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  console.log('post', post)

  return {
    props: {
      post,
    },
  }

}