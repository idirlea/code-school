import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Box, Divider, HStack, Heading } from "@chakra-ui/react";

import classNames from "classnames";

import { authOptions } from "../pages/api/auth/[...nextauth]";

import styles from "../styles/Profile.module.css";

export default function Profile({ children }) {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <Box
      display={"flex"}
      w="100%"
      h={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <HStack align={"flex-start"} w={"60%"} h={"50%"}>
        <Box width={"30%"} marginRight={5}>
          <Heading size={"xl"} fontSize="xl" mb={4}>
            Settings
          </Heading>
          <Divider />
          <ul className={styles.menuList}>
            <li
              className={classNames({
                [styles.navItemActive]: pathname === "/profile/account",
              })}
            >
              <Link display="block" href="/profile/account">
                Update profile
              </Link>
            </li>
            <li
              className={classNames({
                [styles.navItemActive]: pathname === "/profile/password",
              })}
            >
              <Link display="block" href="/profile/password">
                Change password
              </Link>
            </li>
            <li
              className={classNames({
                [styles.navItemActive]: pathname === "/profile/payment",
              })}
            >
              <Link display="block" href="/profile/payment">
                Payment
              </Link>
            </li>
            <li>
              <Link display="block" href="#" onClick={signOut}>
                Log out
              </Link>
            </li>
          </ul>
        </Box>
        <Box w="60%">{children}</Box>
      </HStack>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
