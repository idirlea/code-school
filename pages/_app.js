import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

import { SessionProvider } from "next-auth/react";

import Layout from "../layouts/Layout";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const { session, ...otherProps } = pageProps;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={theme}>
        {getLayout(<Component {...otherProps} />)}
      </ChakraProvider>
    </SessionProvider>
  );
}
