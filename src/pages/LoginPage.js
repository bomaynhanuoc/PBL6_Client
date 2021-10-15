import React, { useState } from "react";

import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import { loginAccount } from "../slices/authSlice";

import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import { ROUTERS } from "../constants/routers";

function Login() {
  const dispatch = useDispatch();
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });
  const toast = useToast();
  const history = useHistory();

  const onChange = (e) => {
    setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (
      inputFields.username.length === 0 ||
      inputFields.password.length === 0
    ) {
      toast({
        title: "Username or password length must be greater than 0",
        status: "error",
        duration: 2000,
        position: "top-right",
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

      // console.log(response.payload);
      if (response.payload === "Wrong password") {
        toast({
          title: "Wrong password.",
          status: "error",
          duration: 1500,
          position: "top-right",
        });
        setInputFields({
          username: "",
          password: "",
        });
      } else if (response.payload === "Account doesn't existed") {
        toast({
          title: "Account doesn't existed.",
          status: "error",
          duration: 1500,
          position: "top-right",
        });
        setInputFields({
          username: "",
          password: "",
        });
      } else {
        toast({
          title: "Login successfully.",
          status: "success",
          duration: 1500,
          position: "top-right",
        });
        history.replace(ROUTERS.HOME);
      }
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
