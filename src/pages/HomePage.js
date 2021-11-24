import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import useToastInfo from "../hooks/useToastInfo";
import { useDispatch, useSelector } from "react-redux";
import { getAllContest } from "../slices/contestSlice";
import List from "../components/List";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/tabs";
import {
  checkCurrentContest,
  checkPastContest,
  checkUpcomingContest,
} from "../utils";
import { useHistory } from "react-router";
import { ROUTERS } from "../constants/routers";

const HomePage = () => {
  const dispatch = useDispatch();
  const contests = useSelector((state) => state.contest.contests);
  const loading = useSelector((state) => state.common.loading);
  const data = useSelector((state) => state.auth.data);
  const [keys, setKeys] = useState([]);
  const [tabId, setTabId] = useState(0);
  const allContestTabs = ["past", "current", "upcoming"];
  const history = useHistory();

  useToastInfo();

  useEffect(() => {
    if (data.role === "admin") {
      history.replace(ROUTERS.ADMIN);
    }
  }, [history, data]);

  useEffect(() => {
    dispatch(getAllContest());
  }, [dispatch]);

  useEffect(() => {
    if (contests.length > 0) {
      setKeys(Object.keys(contests[0]));
    }
  }, [contests]);

  function renderContestByTime(timeId) {
    switch (timeId) {
      case 0:
        return contests.filter((item) => checkPastContest(item.time_end));
      case 1:
        return contests.filter((item) =>
          checkCurrentContest(item.time_regist, item.time_end)
        );
      case 2:
        return contests.filter((item) =>
          checkUpcomingContest(item.time_regist)
        );
      default:
        return;
    }
  }

  // console.log(contests);

  return (
    <Layout>
      <Box as="main" mt="40px">
        <Box mb="20px">
          <Heading as="h4" fontSize="30px">
            All contests
          </Heading>
        </Box>
        <Tabs isLazy index={tabId} onChange={(id) => setTabId(id)}>
          <TabList>
            {allContestTabs.map((item) => (
              <Tab key={item} textTransform="uppercase">
                {item}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {allContestTabs.map((_, id) => (
              <TabPanel key={id}>
                {loading ? (
                  <Text mt="20px">Loading...</Text>
                ) : renderContestByTime(id).length > 0 ? (
                  <Box mt="30px">
                    <List titles={keys} content={renderContestByTime(id)} />
                  </Box>
                ) : (
                  <Box mt="30px">No data...</Box>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default HomePage;
