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
// import { Select } from "@chakra-ui/select";
import Select from "react-select";

function AddContest({
  isOpen,
  onClose,
  handleContest,
  onChange,
  selectedContest,
  languages,
}) {
  const isUpdate = +selectedContest.id > 0;
  // console.log(selectedContest);

  return (
    <>
      <Modal
        size="xl"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isUpdate ? "Update " : "Add "}
            Contest
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {isUpdate && (
                <FormControl id="id" mb="30px">
                  <FormLabel fontSize="18px">ID</FormLabel>
                  <Input
                    name="id"
                    type="text"
                    borderColor="gray.500"
                    value={selectedContest.id}
                    disabled
                    _hover={{
                      borderColor: "gray.800",
                    }}
                  />
                </FormControl>
              )}
              <FormControl id="title" mb="30px">
                <FormLabel fontSize="18px">Title</FormLabel>
                <Input
                  name="title"
                  type="text"
                  placeholder="Title"
                  borderColor="gray.500"
                  value={selectedContest.title}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </FormControl>
              <FormControl id="description" mb="30px">
                <FormLabel fontSize="18px">Description</FormLabel>
                <Input
                  name="description"
                  type="text"
                  placeholder="Description"
                  borderColor="gray.500"
                  value={selectedContest.description}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </FormControl>
              <FormControl id="content" mb="30px">
                <FormLabel fontSize="18px">Content</FormLabel>
                <Input
                  name="content"
                  type="file"
                  borderColor="gray.500"
                  pt="5px"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl id="dataTrain" mb="30px">
                <FormLabel fontSize="18px">Data Train</FormLabel>
                <Input
                  name="dataTrain"
                  type="file"
                  borderColor="gray.500"
                  pt="5px"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl id="dataTest" mb="30px">
                <FormLabel fontSize="18px">Data Test</FormLabel>
                <Input
                  name="dataTest"
                  type="file"
                  borderColor="gray.500"
                  pt="5px"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl id="tester" mb="30px">
                <FormLabel fontSize="18px">Tester</FormLabel>
                <Input
                  name="tester"
                  type="file"
                  borderColor="gray.500"
                  pt="5px"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl id="dateRegist" mb="30px">
                <FormLabel fontSize="18px">Date Register</FormLabel>
                <Input
                  name="dateRegist"
                  type="date"
                  borderColor="gray.500"
                  value={selectedContest.dateRegist}
                  onChange={onChange}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </FormControl>
              <FormControl id="timeRegist" mb="30px">
                <FormLabel fontSize="18px">Time Register</FormLabel>
                <Input
                  name="timeRegist"
                  type="time"
                  borderColor="gray.500"
                  value={selectedContest.timeRegist}
                  onChange={onChange}
                  onKeyDown={(e) => e.preventDefault()}
                  step="2"
                />
              </FormControl>
              <FormControl id="dateStart" mb="30px">
                <FormLabel fontSize="18px">Date Start</FormLabel>
                <Input
                  name="dateStart"
                  type="date"
                  borderColor="gray.500"
                  value={selectedContest.dateStart}
                  onChange={onChange}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </FormControl>
              <FormControl id="timeStart" mb="30px">
                <FormLabel fontSize="18px">Time Start</FormLabel>
                <Input
                  name="timeStart"
                  type="time"
                  borderColor="gray.500"
                  value={selectedContest.timeStart}
                  onChange={onChange}
                  onKeyDown={(e) => e.preventDefault()}
                  step="2"
                />
              </FormControl>
              <FormControl id="dateEnd" mb="30px">
                <FormLabel fontSize="18px">Date End</FormLabel>
                <Input
                  name="dateEnd"
                  type="date"
                  borderColor="gray.500"
                  value={selectedContest.dateEnd}
                  onChange={onChange}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </FormControl>
              <FormControl id="timeEnd" mb="30px">
                <FormLabel fontSize="18px">Time End</FormLabel>
                <Input
                  name="timeEnd"
                  type="time"
                  borderColor="gray.500"
                  value={selectedContest.timeEnd}
                  onChange={onChange}
                  onKeyDown={(e) => e.preventDefault()}
                  step="2"
                />
              </FormControl>
              {!isUpdate && (
                <FormControl id="language" mb="30px">
                  <FormLabel fontSize="18px">Language</FormLabel>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={
                      languages.length > 0
                        ? languages.map((val) => ({
                            value: val.name,
                            label: val.name,
                          }))
                        : []
                    }
                    defaultValue={selectedContest.language}
                    onChange={onChange}
                  />
                </FormControl>
              )}
              <FormControl id="timeOut" mb="30px">
                <FormLabel fontSize="18px">Time out</FormLabel>
                <Input
                  name="timeOut"
                  type="text"
                  placeholder="Time out"
                  borderColor="gray.500"
                  value={selectedContest.timeOut}
                  onChange={onChange}
                  _hover={{
                    borderColor: "gray.800",
                  }}
                />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleContest}>
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

export default AddContest;
