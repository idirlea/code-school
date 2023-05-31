import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getCsrfToken, signIn } from "next-auth/react";

import {
  Button,
  FormControl,
  HStack,
  Input,
  Image,
  Box,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { authOptions } from "../api/auth/[...nextauth]";

const SignInEmailAndPasswordForm = ({ csrfToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", { email, password });
  };

  return (
    <Box w={"100%"}>
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <FormControl id="email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
          />
        </FormControl>
        <FormControl id="password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
          />
        </FormControl>
        <HStack
          marginBottom={3}
          justify="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <HStack>
            <input type="checkbox" />
            <Text>Remember me</Text>
          </HStack>
          <Text>Forgot password?</Text>
        </HStack>
        <Button
          bg={"black"}
          size="lg"
          width={"100%"}
          color="white"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default function SignIn({ csrfToken = "" }) {
  const router = useRouter();

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      align="center"
      justify="center"
      overflow={"hidden"}
    >
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent="center"
        flex={1}
        minHeight={"100%"}
      >
        <VStack
          height={"100%"}
          alignItems="flex-start"
          justifyContent="center"
          width={{ base: "50%", sm: "75%", md: "90%" }}
        >
          <Heading>Welcome back</Heading>
          <Text marginBottom={15}>Please enter the details bellow.</Text>
          <SignInEmailAndPasswordForm csrfToken={csrfToken} />
          <Text w={"100%"} textAlign={"center"}>
            or
          </Text>
          <Button
            bg={"black"}
            size="lg"
            width={"100%"}
            color="white"
            onClick={() => signIn("github")}
          >
            Sign In with GitHub
          </Button>
          <Button
            bg={"black"}
            size="lg"
            width={"100%"}
            color={"white"}
            onClick={() => signIn("apple")}
          >
            Sign In with Apple
          </Button>
          <Text w={'100%'} textAlign={"center"} marginTop={12}>
            Don&lsquo;t have an account? <Link href="/auth/signup">Sign Up</Link>
          </Text>
        </VStack>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
        minHeight={"100%"}
        bg={"blue.500"}
      />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken,
    },
  };
}