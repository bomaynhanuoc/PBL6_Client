import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubmit } from "../slices/submitSlice";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/tabs";
import List from "../components/List";
import { getContestDetail } from "../slices/contestSlice";
import { isObject } from "../utils";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";

function ContestResultPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data);
  const { submits, loading } = useSelector((state) => state.submit);
  const { contestDetail } = useSelector((state) => state.contest);
  const dispatch = useDispatch();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    dispatch(
      getAllSubmit({
        id_contest: id,
        username: user.username,
      })
    );
    dispatch(getContestDetail({ id, token: user.token }));
  }, [dispatch, id, user]);

  useEffect(() => {
    if (submits.length > 0) {
      setKeys(Object.keys(submits[0]));
    }
  }, [submits]);

  console.log(contestDetail);

  return (
    <Layout>
      <Box as="main" mt="40px">
        <Box mb="20px">
          <Heading as="h3" fontSize="30px">
            Result
          </Heading>
        </Box>
        {loading ? (
          <Text mt="20px">Loading...</Text>
        ) : submits && submits.length > 0 ? (
          <Tabs isLazy>
            <TabList>
              <Tab>Status</Tab>
              <Tab>Standing</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box mt="30px">
                  <List titles={keys} content={submits.slice().reverse()} />
                </Box>
              </TabPanel>
              <TabPanel>
                {isObject(contestDetail) && (
                  <Box>
                    <Table>
                      <Thead>
                        <Tr mb="20px">
                          <Th>Username</Th>
                          <Th>Score</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.entries(contestDetail.participants).map(
                          ([key, val], idx) => (
                            <Tr key={idx} fontSize="17px">
                              <Td>{key}</Td>
                              <Td>{val}</Td>
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  </Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Text mt="20px">No data...</Text>
        )}
      </Box>
    </Layout>
  );
}

export default ContestResultPage;
