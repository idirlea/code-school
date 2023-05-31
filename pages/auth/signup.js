import { useState } from "react";
import { getServerSession } from "next-auth";
import { getCsrfToken, } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Button,
  FormControl,
  Input,
  Image,
  Box,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";


import { signUp } from "../../services/auth";
import { authOptions } from "../api/auth/[...nextauth]";


const SignUpEmailForm = ({ csrfToken }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signUp(name, email, password);

    if (!res.error) {
      router.push("/");
    }
  };

  return (
    <Box w={"100%"}>
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <FormControl id="name">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
          />
        </FormControl>
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
        <FormControl id="password">
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your password confirmation"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
          />
        </FormControl>

        <Button
          bg={"black"}
          size="lg"
          width={"100%"}
          color="white"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <Text textAlign={"center"} marginTop={8}>
        Already have an account? <Link href="/auth/signin">Sign In</Link>
      </Text>
    </Box>
  );
};

export default function SignUp({ csrfToken = "" }) {
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} overflow={"hidden"}>
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
          <Heading>Register</Heading>
          <Text marginBottom={15}>
            Please enter the details bellow to create an account
          </Text>
          <SignUpEmailForm csrfToken={csrfToken} />
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
