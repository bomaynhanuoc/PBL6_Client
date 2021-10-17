import React, { useState } from "react";

import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import { registerAccount } from "../slices/authSlice";

import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";

import { ROUTERS } from "../constants/routers";

function RegisterPage() {
  const history = useHistory();
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const toast = useToast();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (
      inputFields.username.length === 0 ||
      inputFields.password.length === 0
    ) {
      toast({
        title: "Username or password must be greater than 0",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    if (inputFields.password !== inputFields.passwordConfirm) {
      toast({
        title: "Password confirm must match",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    try {
      const response = await dispatch(
        registerAccount({
          username: inputFields.username,
          password: inputFields.password,
        })
      );

      if (response.payload === "Added Successfully") {
        toast({
          title: "Register successfully.",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
        history.push(ROUTERS.LOGIN);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box as="main">
        <AuthForm
          isRegister
          title="Register"
          inputFields={inputFields}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Box>
    </Layout>
  );
}

export default RegisterPage;
