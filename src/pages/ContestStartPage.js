import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContestDetail } from "../slices/contestSlice";
import { useHistory, useParams } from "react-router";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import Layout from "../components/Layout";
import { isObject, calculateRemainingTime, convertToJsDate } from "../utils";
import { ROUTERS } from "../constants/routers";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { createSubmit } from "../apis/contest";

function ContestStartPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { contestDetail, loading } = useSelector((state) => state.contest);
  const user = useSelector((state) => state.auth.data);
  const history = useHistory();
  const toast = useToast();
  const [timeToEnd, setTimeToEnd] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [language, setLanguage] = useState();
  const [result, setResult] = useState();

  // console.log(allParticipants);

  useEffect(() => {
    dispatch(getContestDetail({ id, token: user.token }));
  }, [dispatch, id, user.token]);

  useEffect(() => {
    if (isObject(contestDetail)) {
      const participantsField = Object.entries(contestDetail).find(
        ([key]) => key === "participants"
      );
      const allParticipants = participantsField.filter((val) => isObject(val));
      const isRegis = Object.keys(allParticipants[0]).some(
        (val) => user.username === val
      );
      setIsRegistered(isRegis);
    }
  }, [contestDetail, user.username]);

  useEffect(() => {
    if (isObject(contestDetail)) {
      const timeInterval = setInterval(() => {
        const remainingTime = calculateRemainingTime(
          new Date().getTime(),
          convertToJsDate(contestDetail.time_end).getTime()
        );

        if (remainingTime === 0) {
          clearInterval(timeInterval);
        } else {
          setTimeToEnd(remainingTime);
        }
      }, 1000);

      return () => clearInterval(timeInterval);
    }
  }, [contestDetail]);

  useEffect(() => {
    if (isObject(contestDetail)) {
      setLanguage(contestDetail.language[0]);
    }
  }, [contestDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (result && typeof language === "string") {
      console.log(result);
      console.log(language);
      const formData = new FormData();

      formData.append("id_contest", contestDetail.id);
      formData.append("username", user.username);
      formData.append("language", language);
      formData.append("code", result);

      await createSubmit(formData);
      history.push(`${ROUTERS.CONTEST}/${contestDetail.id}/result`);
    } else {
      toast({
        title: "Please upload your result",
        status: "error",
        duration: 1500,
        position: "bottom-right",
      });
    }
  };

  return (
    <Layout>
      <Box as="main" mt="40px">
        <Box mb="20px">
          <Heading as="h3" fontSize="30px">
            Contest start
          </Heading>
        </Box>
        {loading ? (
          <Box>Loading...</Box>
        ) : isRegistered ? (
          isObject(contestDetail) && (
            <Box mt="30px">
              <HStack align="flex-start">
                <Box w="70%" p="10px 20px">
                  <Box mb="20px">
                    <Heading
                      as="h4"
                      fontSize="24px"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {contestDetail.title}
                    </Heading>
                  </Box>
                  <Box fontSize="20px" textTransform="capitalize" mb="20px">
                    <Text>Description: {contestDetail.description}</Text>
                  </Box>
                  <Box fontSize="20px" textTransform="capitalize" mb="20px">
                    <Text>Time out: {contestDetail.time_out}</Text>
                  </Box>
                  <Box mb="20px">
                    <Box>
                      <Text fontSize="20px" mb="16px">
                        Content:
                      </Text>
                    </Box>
                    <Box
                      as="embed"
                      src={`data:application/pdf;base64,${contestDetail.link_contest}`}
                      type="application/pdf"
                      w="100%"
                      h="500px"
                    ></Box>
                  </Box>
                  <Box fontSize="20px" textTransform="capitalize">
                    <Text mb="16px">Data for train:</Text>
                    <Box>
                      <Box
                        as="a"
                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                          contestDetail.link_datatrain
                        )}`}
                        download
                        transition="all 0.25s ease"
                        _hover={{
                          color: "var(--chakra-colors-blue-500)",
                        }}
                      >
                        Download data for train
                      </Box>
                    </Box>
                  </Box>
                  <Box mt="20px">
                    {Object.values(timeToEnd).every((val) => val === 0) ? (
                      <Box as="h6" fontSize="20px" textAlign="center">
                        Contest has done, can not submit
                      </Box>
                    ) : (
                      <>
                        <Box as="h6" fontSize="20px" textAlign="center">
                          Submit result here
                        </Box>
                        <Box as="form" onSubmit={handleSubmit}>
                          <FormControl id="language" mb="20px">
                            <FormLabel fontSize="18px">
                              Choose languages:
                            </FormLabel>
                            <Select
                              variant="outline"
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                            >
                              {contestDetail.language.map((item, id) => (
                                <Box key={id} as="option" value={item}>
                                  {item}
                                </Box>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl id="result" mb="20px">
                            <FormLabel fontSize="18px">Result:</FormLabel>
                            <Box
                              as="input"
                              type="file"
                              name="result"
                              accept=".py, .cpp, .c"
                              onChange={(e) => setResult(e.target.files[0])}
                            />
                          </FormControl>
                          <Button
                            minW="100%"
                            bg="blue.300"
                            fontSize="18px"
                            _hover={{
                              backgroundColor: "blue.500",
                            }}
                            // disabled={loading}
                            // isLoading={loading}
                            type="submit"
                            textTransform="uppercase"
                          >
                            Submit
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
                <Box
                  w="30%"
                  ml="20px !important"
                  p="20px"
                  border="1px solid black"
                  borderRadius="8px"
                >
                  {Object.values(timeToEnd).every((val) => val === 0) ? (
                    // timeToEnd.days === 0 &&
                    // timeToEnd.hours === 0 &&
                    // timeToEnd.minutes === 0 &&
                    // timeToEnd.seconds === 0
                    <>
                      <Box mb="20px" textAlign="center">
                        <Text fontSize="18px">Time's out</Text>
                      </Box>
                      <Box>
                        <Button p="20px 40px" fontSize="18px" w="100%">
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
                  ) : (
                    <Box textAlign="center">
                      <Text fontSize="18px">
                        Time remaining to end:
                        <br />
                        {`${
                          timeToEnd.days < 10
                            ? `0${timeToEnd.days}`
                            : timeToEnd.days
                        } d : ${
                          timeToEnd.hours < 10
                            ? `0${timeToEnd.hours}`
                            : timeToEnd.hours
                        } h : ${
                          timeToEnd.minutes < 10
                            ? `0${timeToEnd.minutes}`
                            : timeToEnd.minutes
                        } m : ${
                          timeToEnd.seconds < 10
                            ? `0${timeToEnd.seconds}`
                            : timeToEnd.seconds
                        } s`}
                      </Text>
                    </Box>
                  )}
                </Box>
              </HStack>
            </Box>
          )
        ) : (
          <Box mt="30px">
            <Heading as="h4" fontSize="24px" fontWeight="bold">
              You need to register before joining this contest
            </Heading>
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
        )}
      </Box>
    </Layout>
  );
}

export default ContestStartPage;
