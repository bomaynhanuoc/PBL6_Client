import React from "react";
import { HStack, Box, Link } from "@chakra-ui/layout";
import { Link as ReachLink, NavLink as ReachNavLink } from "react-router-dom";
import { ROUTERS } from "../constants/routers";

import "./Header.css";

const Header = () => {
  const linkItems = [ROUTERS.LOGIN, ROUTERS.REGISTER];

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
                  as={ReachNavLink}
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
