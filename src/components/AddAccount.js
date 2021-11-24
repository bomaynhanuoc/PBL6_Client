import React from "react";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/react";

function AddAccount({ isOpen, onClose, handleAccount, oldValue, onChange }) {
  const isUpdate = +oldValue.id > 0;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isUpdate ? "Update " : "Add "}
            account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {!isUpdate && (
                <FormControl id="username" mb="20px">
                  <FormLabel fontSize="18px">Username</FormLabel>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Your username"
                    borderColor="gray.500"
                    value={oldValue.username}
                    onChange={onChange}
                    _hover={{
                      borderColor: "gray.800",
                    }}
                  />
                </FormControl>
              )}
              <FormControl id="role" mb="30px">
                <FormLabel fontSize="18px">Role</FormLabel>
                <Select value={oldValue.role} onChange={onChange}>
                  <Box as="option" value="admin">
                    Admin
                  </Box>
                  <Box as="option" value="creator">
                    Creator
                  </Box>
                  <Box as="option" value="member">
                    Member
                  </Box>
                </Select>
              </FormControl>
              <FormControl id="password" mb="30px">
                <FormLabel fontSize="18px">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Your password"
                  borderColor="gray.500"
                  value={oldValue.password}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleAccount}>
              {isUpdate ? "Update" : "Add"}
            </Button>
            <Button ml={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddAccount;
