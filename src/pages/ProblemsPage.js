import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import PageList from "../components/PageList";
import List from "../components/List";

function ProblemsPage() {
  return (
    <Layout>
      <Box as="main" mt="40px">
        <PageList>
          <Box mt="20px" ml="16px">
            <Text as="h4" fontSize="20px" mb="18px">
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
            />
          </Box>
        </PageList>
      </Box>
    </Layout>
  );
}

export default ProblemsPage;
