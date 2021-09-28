import React from "react";
import Layout from "../components/Layout";
import { Box } from "@chakra-ui/react";
import AuthForm from "../components/AuthForm";

function Login() {
  return (
    <Layout>
      <Box as="main">
        <AuthForm title="Login" />
      </Box>
    </Layout>
  );
}

export default Login;
