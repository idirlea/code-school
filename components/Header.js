import { Lilita_One } from "next/font/google";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsSunFill, BsMoonFill, BsFillPersonFill } from "react-icons/bs";

import styles from "../styles/Header.module.css";

const lilita = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
});

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return colorMode === "light" ? (
    <BsMoonFill onClick={toggleColorMode} />
  ) : (
    <BsSunFill onClick={toggleColorMode} />
  );
};

export default function Header() {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const { user } = session || {};

  const hiddenPaths = ["/auth/signin", "/auth/signup"];

  return (
    <>
      <nav className={styles.menu}>
        <Box
          flex={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          height="100%"
          paddingLeft={5}
        >
          <Link href="/">
            <Text fontWeight="bold" fontSize={22} className={lilita.className}>
              Code school
            </Text>
          </Link>
          <ul className={styles.nav} style={{ marginLeft: "3rem" }}>
          <li
              style={{
                display: hiddenPaths.includes(pathname) ? "none" : "block",
              }}
              className={styles.navItem}
            >
              <Link href="/articles">Articles</Link>
            </li>
            <li
              style={{
                display: hiddenPaths.includes(pathname) ? "none" : "block",
              }}
              className={styles.navItem}
            >
              <Link href="/courses">Courses</Link>
            </li>
            <li
              style={{
                display: hiddenPaths.includes(pathname) ? "none" : "block",
              }}
              className={styles.navItem}
            >
              <Link href="/videos">Videos</Link>
            </li>
          </ul>
        </Box>
        <Box
          flex={1}
          justifyContent="flex-end"
          height="100%"
          paddingRight={5}
          display={"flex"}
        >
          <ul className={styles.nav}>
            <li
              style={{
                display:
                  hiddenPaths.includes(pathname) || user ? "none" : "block",
              }}
              className={styles.navItem}
            >
              <Link href="/auth/signin">
                <BsFillPersonFill />
              </Link>
            </li>
            <li
              style={{ display: !user ? "none" : "block" }}
              className={styles.navItem}
            >
              <Menu>
                <MenuButton as={Text}>
                  Welcome, {user?.name}
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link href="/profile/account">Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/mycourses">My Courses</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="#" onClick={signOut}>
                      Sign out
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </li>
            <li
              style={{
                ...(hiddenPaths.includes(pathname) ? { color: "#fff" } : {}),
              }}
              className={styles.navItem}
            >
              <ThemeSwitcher />
            </li>
          </ul>
        </Box>
      </nav>
    </>
  );
}
