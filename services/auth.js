import axios from "axios";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export const signIn = async (email, password) => {
  try {
    console.log('strapiUrl', strapiUrl)

    const res = await axios.post(`${strapiUrl}/api/auth/local`, {
      identifier: email,
      password,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const signUp = async (name, email, password) => {
  const userName = email.split("@")[0];
  try {
    const res = await axios.post(`${strapiUrl}/api/auth/local/register`, {
      name,
      username: userName,
      email,
      password,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const signOut = () => {
  console.log("signing out");
};
