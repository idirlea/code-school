
import { Heading } from "@chakra-ui/react";

import Layout from "../layout";
import Profile from "../../layouts/Profile";

export default function Payment() {
  return (
    <div>
      <Heading mb={4} as="h2" fontSize='xl' size="xl">
      Payment
      </Heading>
      <p>Only signed in users can see this page</p>
    </div>
  );
}

Payment.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Profile>{page}</Profile>
    </Layout>
  );
};
