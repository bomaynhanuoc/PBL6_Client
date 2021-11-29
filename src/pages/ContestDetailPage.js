import React, { useState, useEffect } from "react";

import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Box, Text, Heading, HStack } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Table, Tbody, Thead, Tr, Th, Td } from "@chakra-ui/table";

import Layout from "../components/Layout";
import ConfirmDelete from "../components/ConfirmDelete";

import {
  getContestDetail,
  resetError,
  signUpContest,
  removeContest,
} from "../slices/contestSlice";
import {
  calculateRemainingTime,
  checkCurrentContest,
  checkPastContest,
  checkUpcomingContest,
  convertToJsDate,
  formatName,
  isObject,
} from "../utils";
import { ROUTERS } from "../constants/routers";

function ContestDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { contestDetail, loading, error } = useSelector(
    (state) => state.contest
  );
  const user = useSelector((state) => state.auth.data);
  const toast = useToast();
  const [tabId, setTabId] = useState(0);
  const history = useHistory();
  const [timeToStart, setTimeToStart] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const participantsField =
    isObject(contestDetail) &&
    Object.entries(contestDetail).find(([key]) => key === "participants");
  const allParticipants =
    Array.isArray(participantsField) &&
    participantsField.filter((val) => isObject(val));

  useEffect(() => {
    dispatch(getContestDetail({ id, token: user.token }));
  }, [dispatch, id, user.token]);

  const admin = location.state ? location.state.isAdmin : false;

  // console.log(admin);

  useEffect(() => {
    const showError = async () => {
      if (error) {
        toast({
          title: error,
          status: "error",
          duration: 2000,
          position: "bottom-left",
        });
      }

      await dispatch(resetError());
    };

    showError();
  }, [dispatch, error, toast]);

  useEffect(() => {
    if (!admin) {
      if (isObject(contestDetail)) {
        const timeInterval = setInterval(() => {
          const remainingTime = calculateRemainingTime(
            new Date().getTime(),
            convertToJsDate(contestDetail.time_start).getTime()
          );

          if (remainingTime === 0) {
            clearInterval(timeInterval);
            setTimeToStart({
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
          } else {
            // console.log(remainingTime);
            setTimeToStart(remainingTime);
          }
        }, 1000);

        return () => clearInterval(timeInterval);
      }
    }
  }, [admin, contestDetail]);

  const handleSignUpContest = async () => {
    await dispatch(
      signUpContest({
        id,
        username: user.username,
      })
    );

    await dispatch(getContestDetail({ id }));
  };

  console.log(contestDetail);

  return (
    <Layout>
      <Box as="main" mt="40px">
        <Box mb="20px">
          <Heading as="h4" fontSize="30px">
            Contest detail
          </Heading>
        </Box>
        {loading ? (
          <Box>Loading...</Box>
        ) : (
          isObject(contestDetail) && (
            <Tabs isLazy index={tabId} onChange={(id) => setTabId(id)}>
              <TabList>
                <Tab>Details</Tab>
                <Tab>Participants</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    <HStack align="flex-start">
                      <Box w={admin ? "100%" : "70%"} marginBottom="20px">
                        {Object.entries(contestDetail).map(([key, value]) => {
                          return (
                            key.indexOf("link") === -1 &&
                            key.indexOf("participants") === -1 &&
                            key.indexOf("id") === -1 && (
                              <Box
                                key={key}
                                borderBottom="1px solid var(--chakra-colors-blackAlpha-700)"
                                borderTopLeftRadius="lg"
                                borderTopRightRadius="lg"
                                p="10px 20px"
                              >
                                <Text
                                  fontSize="22px"
                                  textTransform="capitalize"
                                >
                                  {formatName(key)}
                                </Text>
                                {Array.isArray(value)
                                  ? value.map((lang) => (
                                      <Text
                                        as="span"
                                        key={lang}
                                        _notLast={{
                                          marginRight: "14px",
                                        }}
                                      >
                                        {lang}
                                      </Text>
                                    ))
                                  : typeof value !== "object" && (
                                      <Text>{value}</Text>
                                    )}
                              </Box>
                            )
                          );
                        })}
                      </Box>
                      {admin ? (
                        <Box
                          w="30%"
                          ml="20px !important"
                          p="20px"
                          border="1px solid black"
                          borderRadius="8px"
                        >
                          <ButtonGroup flexDir="column" w="100%">
                            <Button mb="20px" colorScheme="messenger">
                              Update
                            </Button>
                            <ConfirmDelete
                              selectedItem={contestDetail}
                              handleDelete={async ({ id }) => {
                                const response = await dispatch(
                                  removeContest({
                                    token: user.token,
                                    id,
                                  })
                                );

                                if (response.payload.includes("Successfully")) {
                                  toast({
                                    title: response.payload,
                                    status: "success",
                                    duration: 2000,
                                    position: "bottom-right",
                                  });
                                }

                                history.replace(ROUTERS.ADMIN);
                              }}
                            />
                          </ButtonGroup>
                        </Box>
                      ) : (
                        <Box
                          w="30%"
                          ml="20px !important"
                          p="20px"
                          border="1px solid black"
                          borderRadius="8px"
                          display="flex"
                          flexDir="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {checkPastContest(contestDetail.time_end) && (
                            <>
                              <Box mb="20px">
                                <Text fontSize="18px">
                                  Contest has been passed, can not register
                                </Text>
                              </Box>
                              <Box>
                                <Button
                                  p="20px 40px"
                                  fontSize="18px"
                                  w="100%"
                                  onClick={() =>
                                    history.push(
                                      `${ROUTERS.CONTEST}/${contestDetail.id}/result`
                                    )
                                  }
                                >
                                  See result
                                </Button>
                                <Button
                                  w="100%"
                                  p="20px 40px"
                                  mt="20px"
                                  fontSize="18px"
                                  onClick={() => {
                                    history.push(ROUTERS.HOME);
                                  }}
                                >
                                  Back to see all
                                </Button>
                              </Box>
                            </>
                          )}
                          {checkCurrentContest(
                            contestDetail.time_regist,
                            contestDetail.time_end
                          ) && (
                            <Box>
                              {allParticipants.length > 0 &&
                              Object.keys(allParticipants[0]).some(
                                (val) => user.username === val
                              ) ? (
                                Object.values(timeToStart).every(
                                  (val) => val === 0
                                ) ? (
                                  <Button
                                    p="20px 40px"
                                    fontSize="18px"
                                    w="100%"
                                    onClick={() =>
                                      history.push(
                                        `${ROUTERS.CONTEST}/${id}/start`
                                      )
                                    }
                                  >
                                    Start
                                  </Button>
                                ) : (
                                  <Box>
                                    <Text fontSize="18px" textAlign="center">
                                      Contest will start in:
                                      <br />
                                      {`${
                                        timeToStart.days < 10
                                          ? `0${timeToStart.days}`
                                          : timeToStart.days
                                      } d : ${
                                        timeToStart.hours < 10
                                          ? `0${timeToStart.hours}`
                                          : timeToStart.hours
                                      } h : ${
                                        timeToStart.minutes < 10
                                          ? `0${timeToStart.minutes}`
                                          : timeToStart.minutes
                                      } m : ${
                                        timeToStart.seconds < 10
                                          ? `0${timeToStart.seconds}`
                                          : timeToStart.seconds
                                      } s`}
                                    </Text>
                                  </Box>
                                )
                              ) : checkPastContest(
                                  contestDetail.time_regist
                                ) ? (
                                <Box>
                                  <Text fontSize="18px" textAlign="center">
                                    Contest has been started, can not register.
                                  </Text>
                                </Box>
                              ) : (
                                <Box>
                                  <Button
                                    p="20px 40px"
                                    fontSize="18px"
                                    w="100%"
                                    onClick={handleSignUpContest}
                                  >
                                    Register
                                  </Button>
                                </Box>
                              )}
                              <Box>
                                <Button
                                  w="100%"
                                  p="20px 40px"
                                  mt="20px"
                                  fontSize="18px"
                                  onClick={() => {
                                    history.push(ROUTERS.HOME);
                                  }}
                                >
                                  Back to see all
                                </Button>
                              </Box>
                            </Box>
                          )}
                          {checkUpcomingContest(contestDetail.time_regist) && (
                            <>
                              <Box mb="20px">
                                <Text fontSize="18px">
                                  Not a time for register
                                </Text>
                              </Box>

                              <Box>
                                <Button
                                  w="100%"
                                  p="20px 40px"
                                  fontSize="18px"
                                  onClick={() => {
                                    history.push(ROUTERS.HOME);
                                  }}
                                >
                                  Back to see all
                                </Button>
                              </Box>
                            </>
                          )}
                        </Box>
                      )}
                    </HStack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  {Object.entries(contestDetail).map(([key, val], id) => {
                    return (
                      key.indexOf("participants") !== -1 &&
                      (Object.keys(val).length > 0 ? (
                        <Box key={id}>
                          <Table variant="striped">
                            <Thead>
                              <Tr mb="20px">
                                <Th>Participants</Th>
                                <Th>Score</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {Object.entries(val).map(([key, val]) => (
                                <Tr key={key} fontSize="17px">
                                  <Td>{key}</Td>
                                  <Td>{val}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </Box>
                      ) : (
                        <Box key={id}>
                          <Text>No participants yet</Text>
                        </Box>
                      ))
                    );
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          )
        )}
      </Box>
    </Layout>
  );
}

export default ContestDetailPage;
