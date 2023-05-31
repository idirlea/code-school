import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  cssVarPrefix: "ck",
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.300", "gray.800")(props),
      lineHeight: "base",
    },
  }),
};

export const theme = extendTheme({
  config,
  styles
});
