// Use the layout defined at the page level, if available

import { Box } from "@chakra-ui/react";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <Box w={'100%'} h={'100%'} >
      <Header />
      <Box marginTop={'4rem'} w={'100%'} h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {children}
      </Box>
    </Box>
  );
};
