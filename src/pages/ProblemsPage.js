import React from "react";
import { Box, Text, Heading } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import PageList from "../components/PageList";
import List from "../components/List";
import { allContestTabs } from "../constants/allContestTabs";

function ProblemsPage() {
  return (
    <Layout>
      <Box as="main" mt="40px">
        <Box mb="20px">
          <Heading as="h4" fontSize="30px">
            All contests
          </Heading>
        </Box>
        <PageList tabs={allContestTabs}>
          <Box mt="20px" ml="16px">
            {/* <Text as="h4" fontSize="20px" mb="18px">
              All problems
            </Text>
            <List
              titles={["code", "name", "solved", "submit"]}
              content={[
                {
                  code: "prob1",
                  name: "Problem 1",
                  solved: "x26",
                  submit: "submit",
                },
                {
                  code: "prob2",
                  name: "Problem 2",
                  solved: "x35",
                  submit: "submit",
                },
                {
                  code: "prob3",
                  name: "Problem 3",
                  solved: "x44",
                  submit: "submit",
                },
                {
                  code: "prob4",
                  name: "Problem 4",
                  solved: "x10",
                  submit: "submit",
                },
              ]}
            /> */}
          </Box>
        </PageList>
      </Box>
    </Layout>
  );
}

export default ProblemsPage;
