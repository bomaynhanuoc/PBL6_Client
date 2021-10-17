import React from "react";
import { Box } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import PageList from "../components/PageList";
import InfoBox from "../components/InfoBox";
import useToastInfo from "../hooks/useToastInfo";

const HomePage = () => {
  useToastInfo();
  return (
    <Layout>
      <Box as="main" mt="40px">
        <PageList>
          <Box mt="20px">
            <InfoBox
              title="New problems"
              infos={[
                "prob1 - Problem 1",
                "prob2 - Problem 2",
                "prob3 - Problem 3",
                "prob4 - Problem 4",
              ]}
            />
            <InfoBox
              title="Top coders"
              infos={[
                "a - 16 problems",
                "b - 14 problems",
                "c - 12 problems",
                "d - 10 problems",
              ]}
            />
          </Box>
        </PageList>
      </Box>
    </Layout>
  );
};

export default HomePage;
