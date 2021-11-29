import React from "react";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";

function ConfirmDelete({ handleDelete, selectedItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <PopoverTrigger>
          <Button colorScheme="red" marginInlineStart="0 !important">
            Delete
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader pt={4} fontWeight="bold" boder="0" textAlign="center">
            Confirm delete
          </PopoverHeader>

          <PopoverBody textAlign="center">Are you sure?</PopoverBody>
          <PopoverFooter border="0">
            <ButtonGroup w="100%" justifyContent="space-around">
              <Button
                colorScheme="green"
                onClick={() => {
                  onClose();
                  handleDelete(selectedItem);
                }}
              >
                OK
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ConfirmDelete;
