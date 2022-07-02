import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";
import { createClient } from "../../services/prismic";

interface PostProps {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function Post({ post } : PostProps) {
  return (
    <>
      <Head>
        <title>
          {post.title} | Ignews
        </title>
      </Head>

      <main>
        
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  const client = createClient(req);
  const response = await client.getByUID('publication', String(slug));

  const post = {
    slug,
    title: response.data.title[0].text,
    content: response.data.Content,
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post,
    },
  }

}