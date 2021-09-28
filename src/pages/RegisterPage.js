import React from "react";
import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";

function RegisterPage() {
  return (
    <Layout>
      <Box as="main">
        <AuthForm isRegister title="Register" />
      </Box>
    </Layout>
  );
}

export default RegisterPage;
