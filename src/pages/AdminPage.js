import React, { useState } from "react";
import { Box, Stack } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import { BsFillPersonFill, BsTrophy } from "react-icons/bs";
import SidebarList from "../components/SidebarList";

function AdminPage() {
  const [chosenItem, setChosenItem] = useState(0);
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

  const handleChooseItem = (id) => {
    if (id !== chosenItem) {
      setChosenItem(id);
    }
  };

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
          <Box w="80%" h="100%"></Box>
        </Stack>
      </Box>
    </Layout>
  );
}

export default AdminPage;
