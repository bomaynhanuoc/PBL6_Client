import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { loginAccount } from "../slices/authSlice";

import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import useToastInfo from "../hooks/useToastInfo";

function Login() {
  const dispatch = useDispatch();
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });
  const toast = useToast();

  useToastInfo();

  const onChange = (e) => {
    setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      inputFields.username.length === 0 ||
      inputFields.password.length === 0
    ) {
      toast({
        title: "Username or password length must be greater than 0",
        status: "error",
        duration: 2000,
        position: "bottom-left",
      });
      setInputFields({
        username: "",
        password: "",
      });
      return;
    }

    try {
      const response = await dispatch(
        loginAccount({
          username: inputFields.username,
          password: inputFields.password,
        })
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box as="main">
        <AuthForm
          title="Login"
          inputFields={inputFields}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Box>
    </Layout>
  );
}

export default Login;
