import React from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <Box as="main" mt="40px">
        <Tabs>
          <TabList>
            <Tab textTransform="uppercase">Home</Tab>
            <Tab textTransform="uppercase">Contests</Tab>
            <Tab textTransform="uppercase">Rankings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text>Home</Text>
            </TabPanel>
            <TabPanel>
              <Text>Contests</Text>
            </TabPanel>
            <TabPanel>
              <Text>Ranking</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default HomePage;
