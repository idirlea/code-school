import { useFormik } from "formik";
import { Button, FormControl, Heading, Input, Text, } from "@chakra-ui/react";

import Layout from "../layout";
import Profile from "../../layouts/Profile";

export default function Account() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Heading mb={4} as="h2" fontSize="xl" size="xl">
        Account
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormControl id="name">
          <Text mb="4px">Name</Text>
          <Input
            type="text"
            placeholder="Enter your name"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </FormControl>
        <FormControl id="email">
          <Text mb="4px">Email</Text>

          <Input
            type="email"
            placeholder="Enter your email address"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>
        <FormControl>
            <Button type="submit">Update</Button>
        </FormControl>
      </form>
    </div>
  );
}

Account.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Profile>{page}</Profile>
    </Layout>
  );
};
