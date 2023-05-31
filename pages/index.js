'use client';

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <>
      <Head>
        <title>Welcome to code-school.eu</title>
        <meta
          name="description"
          content="Welcome to code school the place you can learn how to develop web & mobile apps"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        p={6}
        flex={1}
        display={"flex"}
        alignItems="center"
        justifyContent="center"
      >
        <VStack width={"60%"} align="center" justify="center">
          <Heading>Welcome to Code School!</Heading>
          <Text>
            Dont miss out on the opportunity to learn something new and boost
            your skills! Sign up now for access to our extensive library of
            online courses and take the first step towards reaching your full
            potential. With flexible scheduling and engaging instructors, youll
            have everything you need to succeed. Click here to get started now!
          </Text>
          <HStack mt={4}>
            <Button>Start Learning</Button>
            {!user && (
              <Link href="/auth/signin">
                <Box
                  bg="blue.400"
                  color="white"
                  borderRadius={6}
                  p={2}
                  width={100}
                  textAlign={"center"}
                >
                  Sign up
                </Box>
              </Link>
            )}
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
