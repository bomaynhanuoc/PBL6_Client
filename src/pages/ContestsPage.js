import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import List from "../components/List";
import Layout from "../components/Layout";
import PageList from "../components/PageList";

function ContestsPage() {
  return (
    <Layout>
      <Box as="main" mt="40px">
        <PageList>
          <Box mt="20px" ml="16px">
            <Box>
              <Text as="h4" fontSize="20px" mb="18px">
                Past contests
              </Text>
              <List
                titles={["name", "start", "length"]}
                blankTitle={1}
                content={[
                  {
                    name: "Test 1",
                    start: "16/09/2021 14:30:00",
                    length: "09:29",
                    3: "x47",
                  },
                  {
                    name: "Test 2",
                    start: "08/05/2021 19:00:00",
                    length: "03:00",
                    3: "x93",
                  },
                  {
                    name: "Test 3",
                    start: "05/05/2021 19:00:00",
                    length: "03:00",
                    3: "x33",
                  },
                  {
                    name: "Test 4",
                    start: "24/04/2021 19:00:00",
                    length: "03:00",
                    3: "x69",
                  },
                ]}
              />
            </Box>
          </Box>
        </PageList>
      </Box>
    </Layout>
  );
}

export default ContestsPage;
