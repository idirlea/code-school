import { useEffect, Suspense } from "react";

import axios from "axios";

import Prism from "prismjs";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { Box, Heading } from "@chakra-ui/react";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";

// import styles from "../../styles/Article.module.css";

export const metadata = {
  title: 'Code School',
  desciption: 'Code School',
};


export default function Course({ course: { title, bodyHtml } }) {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 1000);
  }, []);

  return (
    <Suspense fallback={<p>Loading course...</p>}>
      <Box
        paddingRight={3}
        marginBottom={10}
      >
        <Heading>{title}</Heading>
      </Box>
    </Suspense>
  );
}

export async function getServerSideProps({query}) {
  const { params } = query;
 
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses/${params[0]}`
  );

  const { id, attributes } = res?.data?.data || {};
  
  return {
    props: {
      course: {
        id,
        ...attributes,
      },
    },
  };
}

export async function generateMetadata({ params }) {
  console.log('generateMetadata', params);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses/${params[0]}`
  );

  const { attributes: course } = res?.data?.data || {};

  return {
    title: "Code school course" - course.title,
    description: course.description,
  };
}
