import { useEffect, Suspense } from "react";

import axios from "axios";

import Prism from "prismjs";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { Box, Heading } from "@chakra-ui/react";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";

import styles from "../../styles/Article.module.css";

export default function Article({ article: { title, bodyHtml } }) {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 1000);
  }, []);

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Box
        overflowY={"scroll"}
        paddingRight={3}
        marginBottom={10}
        className={styles.articleWrapper}
      >
        <Heading>{title}</Heading>
        <MDXRemote {...bodyHtml} />
      </Box>
    </Suspense>
  );
}

export async function getServerSideProps(context) {
  const { params } = context.query;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts/${params[0]}`
  );

  const { id, attributes } = res?.data?.data || {};
  const html = await serialize(attributes.body);

  return {
    props: {
      article: {
        id,
        ...attributes,
        bodyHtml: html,
      },
    },
  };
}

export async function generateMetadata({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts/${params[0]}`
  );

  const { attributes: article } = res?.data?.data || {};

  console.log("------------------");
  console.log("article ", article.title);
  return {
    title: "Code school article" - article.title,
    description: article.shortDescription,
  };
}
