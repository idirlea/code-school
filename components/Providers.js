'use client';

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import { theme } from "../theme";

export default function Providers({ children }) {
  const { session, } = pageProps;

  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
}
