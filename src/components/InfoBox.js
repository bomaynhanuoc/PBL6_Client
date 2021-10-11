import React from "react";
import { Box, Text } from "@chakra-ui/layout";

function InfoBox({ title, infos }) {
  return (
    <Box
      border="1px solid var(--chakra-colors-gray-800)"
      borderTopLeftRadius="8px"
      borderTopRightRadius="8px"
      p="10px 0 10px 16px"
      mb="24px"
    >
      <Box
        borderBottom="1px solid var(--chakra-colors-blue-600)"
        ml="-16px"
        pl="16px"
        pb="10px"
      >
        <Text as="h4" fontSize="20px">
          {title}
        </Text>
      </Box>
      <Box pt="10px">
        {infos.map((info) => (
          <Text key={info}>{info}</Text>
        ))}
      </Box>
    </Box>
  );
}

export default InfoBox;
