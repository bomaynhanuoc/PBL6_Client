import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Layout from "../components/Layout";
import { BsFillPersonFill, BsTrophy } from "react-icons/bs";
import SidebarList from "../components/SidebarList";
import {
  deleteAccountWithName,
  getAllAccount,
  resetMessage,
  updateAccountByField,
} from "../slices/accountSlice";
import List from "../components/List";
import { useToast } from "@chakra-ui/toast";
import { useDisclosure } from "@chakra-ui/hooks";
import AddAccount from "../components/AddAccount";
import { registerAccount } from "../slices/authSlice";

function AdminPage() {
  const [chosenItem, setChosenItem] = useState(0);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);
  const { accounts, loading } = useSelector((state) => state.account);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const items = [
    {
      name: "Accounts",
      icon: BsFillPersonFill,
    },
    {
      name: "Contests",
      icon: BsTrophy,
    },
  ];
  const [oldValue, setOldValue] = useState({
    id: "",
    username: "",
    password: "",
    role: "member",
  });
  const accountsWithActions =
    accounts.length > 0 &&
    accounts.map((acc) => ({
      ...acc,
      action: (
        <Box>
          <Button
            mr="16px"
            colorScheme="messenger"
            onClick={() => {
              onOpen();
              setOldValue({
                id: acc.id,
                username: acc.username,
                password: acc.password,
                role: acc.role,
              });
            }}
          >
            Update
          </Button>
          <Button colorScheme="red" onClick={() => handleDelete(acc.username)}>
            Delete
          </Button>
        </Box>
      ),
    }));

  const onChange = (e) => {
    setOldValue((prev) => ({
      ...prev,
      [e.target.name || "role"]: e.target.value,
    }));
  };

  const handleAccount = async (e) => {
    e.preventDefault();
    // onClose();
    const isUpdate = accounts.some((acc) => acc.username === oldValue.username);

    if (isUpdate) {
      onClose();
      // console.log(oldValue);
      const response = await dispatch(
        updateAccountByField({
          token: data.token,
          username: oldValue.username,
          password: oldValue.password,
          role: oldValue.role,
        })
      );

      if (response.payload.includes("Updated")) {
        toast({
          title: response.payload,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });
      }
    } else {
      if (oldValue.username.length === 0 || oldValue.password.length === 0) {
        toast({
          title: "Username or password must be greater than 0",
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        return;
      } else {
        onClose();
        const response = await dispatch(
          registerAccount({
            username: oldValue.username,
            password: oldValue.password,
          })
        );
        if (response.payload === "Added Successfully") {
          toast({
            title: response.payload,
            status: "success",
            duration: 2000,
            position: "bottom-right",
          });
        }
      }
    }
    setOldValue({
      id: "",
      username: "",
      password: "",
      role: "member",
    });

    await dispatch(
      getAllAccount({
        token: data.token,
      })
    );
  };

  async function handleDelete(username) {
    const response = await dispatch(deleteAccountWithName({ username }));

    if (response.payload.includes("Delete")) {
      toast({
        title: response.payload,
        status: "success",
        duration: 2000,
        position: "bottom-right",
      });

      await dispatch(resetMessage());
    }
    await dispatch(
      getAllAccount({
        token: data.token,
      })
    );

    // if (error) {
    //   toast({
    //     title: error,
    //     status: "error",
    //     duration: 2000,
    //     position: "top-right",
    //   });
    // }
  }

  const handleChooseItem = (id) => {
    if (id !== chosenItem) {
      setChosenItem(id);
    }
  };

  useEffect(() => {
    dispatch(
      getAllAccount({
        token: data.token,
      })
    );
  }, [data.token, dispatch]);

  console.log(accounts);

  function renderDataByItem(id) {
    switch (id) {
      case 0:
        return (
          <>
            {loading ? (
              <Box>
                <Text>Loading...</Text>
              </Box>
            ) : accounts.length > 0 ? (
              <Box>
                <List
                  titles={["id", "username", "role", "action"]}
                  content={accountsWithActions}
                />
              </Box>
            ) : (
              <Box>
                <Text>No data...</Text>
              </Box>
            )}
          </>
        );
      case 1:
        return <Text>Data about contest</Text>;

      default:
        break;
    }
  }

  return (
    <Layout>
      <Box as="main">
        <Stack
          spacing="0"
          direction="row"
          w="100%"
          h="calc(100vh - 50px)"
          p="20px 0"
        >
          <SidebarList
            items={items}
            chosenItem={chosenItem}
            handleChooseItem={handleChooseItem}
          />
          <Box w="80%" h="100%" overflow="auto" pl="14px">
            <Box mb="14px">
              <Button
                colorScheme="blackAlpha"
                _hover={{
                  backgroundColor: "var(--chakra-colors-blackAlpha-700)",
                }}
                onClick={() => {
                  onOpen();
                  setOldValue({
                    id: "",
                    username: "",
                    password: "",
                    role: "member",
                  });
                }}
              >
                Add new user
              </Button>
            </Box>
            {renderDataByItem(chosenItem)}
          </Box>
        </Stack>
      </Box>
      <AddAccount
        isOpen={isOpen}
        onClose={onClose}
        oldValue={oldValue}
        onChange={onChange}
        handleAccount={handleAccount}
      />
    </Layout>
  );
}

export default AdminPage;
