import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";

function SidebarItem({ name, icon, ..._ }) {
  return (
    <Box
      w="100%"
      color="whiteAlpha.900"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      fontSize="26px"
    >
      <Flex align="center" justify="center">
        <Icon as={icon} />
      </Flex>
      <Box textTransform="uppercase">
        <Text>{name}</Text>
      </Box>
    </Box>
  );
}

export default SidebarItem;
