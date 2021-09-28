import React from "react";
import { HStack, Box, Link } from "@chakra-ui/react";
import { Link as ReachLink, useLocation } from "react-router-dom";
import { ROUTERS } from "../constants/routers";

const Header = () => {
  const linkItems = [ROUTERS.LOGIN, ROUTERS.REGISTER];
  const location = useLocation();

  console.log(location.pathname.slice(1) === linkItems[0].slice(1));

  return (
    <header>
      <HStack w="100%" justify="space-between">
        <Box>
          <Link
            textDecor="none"
            fontSize="32px"
            fontWeight="bold"
            textTransform="capitalize"
            as={ReachLink}
            to={ROUTERS.HOME}
            _hover={{
              textDecor: "none",
            }}
          >
            ai contest
          </Link>
        </Box>
        <Box>
          <Box as="ul" display="flex">
            {linkItems.map((item) => (
              <Box as="li" key={item}>
                <Link
                  fontSize="18px"
                  textDecor="none"
                  textTransform="capitalize"
                  transition="all 0.3s"
                  as={ReachLink}
                  to={`${item}`}
                  _hover={{
                    textDecor: "none",
                    color: "blue.500",
                  }}
                  ml="16px"
                >
                  {item.slice(1)}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </HStack>
    </header>
  );
};

export default Header;
