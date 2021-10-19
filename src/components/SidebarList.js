import React from "react";
import { Box, VStack } from "@chakra-ui/layout";
import SidebarItem from "./SidebarItem";

function SidebarList({ items, chosenItem, handleChooseItem }) {
  return (
    <VStack w="20%" h="100%" bgColor="blackAlpha.600" pt="20px">
      {items.map((item, idx) => (
        <Box
          key={idx}
          w="100%"
          cursor="pointer"
          transition="all 0.2s ease-in-out"
          bgColor={idx === chosenItem && "var(--chakra-colors-blackAlpha-900)"}
          _notLast={{
            marginBottom: "20px",
          }}
          _hover={
            idx !== chosenItem && {
              bgColor: "var(--chakra-colors-blackAlpha-700)",
            }
          }
          p="10px 0"
          onClick={() => handleChooseItem(idx)}
        >
          <SidebarItem {...item} />
        </Box>
      ))}
    </VStack>
  );
}

export default SidebarList;
