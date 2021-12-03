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

function AddLanguage({
  isOpen,
  onClose,
  selectedLang,
  onChange,
  handleLanguage,
}) {
  const isUpdate = +selectedLang.id > 0;

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isUpdate ? "Update " : "Add "}
            language
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {isUpdate && (
                <FormControl id="id" mb="20px">
                  <FormLabel fontSize="18px">Id</FormLabel>
                  <Input
                    name="id"
                    type="text"
                    borderColor="gray.500"
                    _hover={{
                      borderColor: "gray.800",
                    }}
                    value={selectedLang.id}
                    disabled
                  />
                </FormControl>
              )}
              <FormControl id="name" mb="30px">
                <FormLabel fontSize="18px">Language name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your language name"
                  borderColor="gray.500"
                  value={selectedLang.name}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </FormControl>
              <FormControl id="type" mb="30px">
                <FormLabel fontSize="18px">Language type</FormLabel>
                <Input
                  name="type"
                  type="text"
                  placeholder="Your language type"
                  borderColor="gray.500"
                  value={selectedLang.type}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleLanguage}>
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

export default AddLanguage;
