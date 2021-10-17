import React from "react";

import { Heading, VStack, Box } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import {
  BsFillPersonFill,
  BsLockFill,
  BsPersonCheckFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";

function AuthForm({
  title,
  isRegister,
  inputFields,
  onChange,
  onSubmit = () => {},
}) {
  const loading = useSelector((state) => state.common.loading);

  return (
    <VStack w="900px" m="30px auto 0">
      <Heading as="h1" fontSize="38px" fontWeight="bold" mb="20px">
        {title}
      </Heading>
      <Box w="60%" padding="20px 30px">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl id="username" mb="20px">
            <FormLabel fontSize="18px">Username</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsFillPersonFill />}
              />
              <Input
                name="username"
                type="text"
                placeholder="Your username"
                borderColor="gray.500"
                value={inputFields.username}
                onChange={onChange}
                _hover={{
                  borderColor: "gray.800",
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="password" mb={isRegister ? "20px" : "30px"}>
            <FormLabel fontSize="18px">Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsLockFill />}
              />
              <Input
                name="password"
                type="password"
                placeholder="Your password"
                borderColor="gray.500"
                value={inputFields.password}
                onChange={onChange}
                _hover={{
                  borderColor: "gray.800",
                }}
              />
            </InputGroup>
          </FormControl>
          {isRegister && (
            <FormControl id="passwordConfirm" mb="30px">
              <FormLabel fontSize="18px">Password Confirm</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BsPersonCheckFill />}
                />
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm your password"
                  borderColor="gray.500"
                  value={inputFields.passwordConfirm}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </InputGroup>
            </FormControl>
          )}
          <Button
            minW="100%"
            bg="blue.300"
            fontSize="18px"
            _hover={{
              backgroundColor: "blue.500",
            }}
            disabled={loading}
            isLoading={loading}
            type="submit"
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </Box>
      </Box>
    </VStack>
  );
}

export default AuthForm;
