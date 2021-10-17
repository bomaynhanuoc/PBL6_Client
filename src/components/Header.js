import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReachLink, NavLink as ReachNavLink } from "react-router-dom";
import { HStack, Box, Link, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { ROUTERS } from "../constants/routers";

import "./Header.css";
import { logoutAccount } from "../slices/authSlice";

const Header = () => {
  const linkItems = [ROUTERS.LOGIN, ROUTERS.REGISTER];
  const user = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      await dispatch(logoutAccount({ username: user.username }));
    } catch (error) {
      console.log(error);
    }
  };

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
          {user && user.username ? (
            <HStack justify="space-between" fontSize="18px">
              <Text mr="10px">Welcome, {user.username}</Text>
              <Button
                _hover={{
                  color: "blue.500",
                }}
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? (
                  <Spinner size="sm" color="blackAlpha.700" />
                ) : (
                  "Log out"
                )}
              </Button>
            </HStack>
          ) : (
            <Box as="ul" display="flex" listStyleType="none">
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
          )}
        </Box>
      </HStack>
    </header>
  );
};

export default Header;
