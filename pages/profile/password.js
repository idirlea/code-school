import { Button, FormControl, Heading, Input, Text, } from "@chakra-ui/react";
import { useFormik } from "formik";

import Layout from "../layout";
import Profile from "../../layouts/Profile";


export default function Password() {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
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
        <FormControl id="old-password">
          <Text mb="4px">Old password</Text>
          <Input
            type="password"
            placeholder="Enter your old password"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
          />
        </FormControl>
        <FormControl id="password">
          <Text mb="4px">Password</Text>

          <Input
            type="password"
            placeholder="Enter your new password"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FormControl>
        <FormControl id="confirm-password">
          <Text mb="4px">Confirm Password</Text>

          <Input
            type="password"
            placeholder="Enter your password confirmation"
            border={1}
            borderColor="gray.800"
            borderStyle={"solid"}
            width={"100%"}
            marginBottom={5}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </FormControl>
        <FormControl>
          <Button type="submit">Update</Button>
        </FormControl>
      </form>
    </div>
  );
}

Password.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Profile>{page}</Profile>
    </Layout>
  );
};
