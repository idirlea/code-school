import {
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";

import axios from "axios";
import { useRouter } from "next/router";

const Article = ({ title, shortDescription, onClick }) => {
  return (
    <Card maxW="sm" cursor={'pointer'} onClick={onClick}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{shortDescription}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default function Articles({ articles }) {
  const router = useRouter();

  return (
    <Box>
      <Heading size="xl" mb={4}>Articles</Heading>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      {articles?.data.map(({ id, attributes: article }) => (
        <Article key={id} {...article} onClick={() => router.push(`/article/${id}/${article.slug}`)} />
      ))}
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts`
  );

  return {
    props: {
      articles: res?.data || [],
    },
  };
}
