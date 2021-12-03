import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Layout from "../components/Layout";
import { BsFillPersonFill, BsTrophy, BsCodeSlash } from "react-icons/bs";
import SidebarList from "../components/SidebarList";
import {
  deleteAccountWithName,
  getAllAccount,
  resetMessage,
  updateAccountByField,
} from "../slices/accountSlice";
import List from "../components/List";
import { useToast } from "@chakra-ui/toast";
import { useDisclosure } from "@chakra-ui/hooks";
import AddAccount from "../components/AddAccount";
import { registerAccount } from "../slices/authSlice";
import { addContest, getAllContest } from "../slices/contestSlice";
import {
  getAllLanguages,
  updateLanguageByField,
  addLanguage,
  removeLanguage,
  resetInfo,
} from "../slices/languageSlice";
import { useHistory } from "react-router";
import { ROUTERS } from "../constants/routers";
import AddContest from "../components/AddContest";
import ConfirmDelete from "../components/ConfirmDelete";
import AddLanguage from "../components/AddLanguage";

function AdminPage() {
  const history = useHistory();
  const [chosenItem, setChosenItem] = useState(0);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);
  const { accounts, loading } = useSelector((state) => state.account);
  const { contests, loading: contestLoading } = useSelector(
    (state) => state.contest
  );
  const { languages, loading: languagesLoading } = useSelector(
    (state) => state.language
  );
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConOpen,
    onOpen: onConOpen,
    onClose: onConClose,
  } = useDisclosure();
  const {
    isOpen: isLangOpen,
    onOpen: onLangOpen,
    onClose: onLangClose,
  } = useDisclosure();
  const items = [
    {
      name: "Accounts",
      icon: BsFillPersonFill,
    },
    {
      name: "Contests",
      icon: BsTrophy,
    },
    {
      name: "Language",
      icon: BsCodeSlash,
    },
  ];
  const [oldValue, setOldValue] = useState({
    id: "",
    username: "",
    password: "",
    role: "member",
  });
  const accountsWithActions =
    accounts.length > 0 &&
    accounts.map((acc) => ({
      ...acc,
      action: (
        <Box>
          <Button
            mr="16px"
            colorScheme="messenger"
            onClick={() => {
              onOpen();
              setOldValue({
                id: acc.id,
                username: acc.username,
                password: acc.password,
                role: acc.role,
              });
            }}
          >
            Update
          </Button>
          <ConfirmDelete
            handleDelete={handleDeleteAccount}
            selectedItem={acc}
          />
        </Box>
      ),
    }));
  const [selectedContest, setSelectedContest] = useState({
    id: "",
    title: "",
    description: "",
    content: "",
    dataTrain: "",
    dataTest: "",
    tester: "",
    dateRegist: "",
    timeRegist: "",
    dateStart: "",
    timeStart: "",
    dateEnd: "",
    timeEnd: "",
    language: [],
    timeOut: "",
  });
  const contestsWithActions =
    contests.length > 0 &&
    contests.map((con) => ({
      ...con,
      action: (
        <Box display="flex" alignItems="center">
          <Button
            mr="16px"
            colorScheme="green"
            onClick={() => {
              history.push(`${ROUTERS.CONTEST}/${con.id}/result`);
            }}
          >
            Standing and status
          </Button>
          <Button
            colorScheme="yellow"
            onClick={() => {
              history.push({
                pathname: `${ROUTERS.CONTEST}/${con.id}`,
                state: {
                  isAdmin: true,
                },
              });
            }}
          >
            Detail
          </Button>
        </Box>
      ),
    }));
  const [selectedLang, setSelectedLang] = useState({
    id: "",
    name: "",
    type: "",
  });
  const languagesWithActions = languages.map((lang) => ({
    ...lang,
    action: (
      <Box>
        <Button
          mr="16px"
          colorScheme="messenger"
          onClick={() => {
            onLangOpen();
            setSelectedLang({
              id: lang.id,
              name: lang.name,
              type: lang.type,
            });
          }}
        >
          Update
        </Button>
        <ConfirmDelete
          handleDelete={handleDeleteLanguage}
          selectedItem={lang}
        />
      </Box>
    ),
  }));

  const onChange = (e) => {
    if (data.role === "admin") {
      switch (chosenItem) {
        case 0:
          setOldValue((prev) => ({
            ...prev,
            [e.target.name || "role"]: e.target.value,
          }));
          break;

        case 1:
          // console.log(selectedContest);
          if (Array.isArray(e)) {
            setSelectedContest((prev) => ({
              ...prev,
              language: e.map((val) => val.value),
            }));
          } else if (e.target.files) {
            setSelectedContest((prev) => ({
              ...prev,
              [e.target.name]: e.target.files[0],
            }));
          } else {
            setSelectedContest((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }
          break;

        case 2:
          setSelectedLang((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
          break;

        default:
          break;
      }
    } else if (data.role === "creator") {
      switch (chosenItem) {
        case 0:
          // console.log(selectedContest);
          if (Array.isArray(e)) {
            setSelectedContest((prev) => ({
              ...prev,
              language: e.map((val) => val.value),
            }));
          } else if (e.target.files) {
            setSelectedContest((prev) => ({
              ...prev,
              [e.target.name]: e.target.files[0],
            }));
          } else {
            setSelectedContest((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }
          break;

        case 1:
          setSelectedLang((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
          break;

        default:
          break;
      }
    }
  };

  const handleAccount = async (e) => {
    e.preventDefault();
    // onClose();
    const isUpdate = accounts.some((acc) => acc.username === oldValue.username);

    if (isUpdate) {
      onClose();
      // console.log(oldValue);
      const response = await dispatch(
        updateAccountByField({
          token: data.token,
          username: oldValue.username,
          password: oldValue.password,
          role: oldValue.role,
        })
      );

      if (response.payload.includes("Updated")) {
        toast({
          title: response.payload,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });
      }
    } else {
      if (oldValue.username.length === 0 || oldValue.password.length === 0) {
        toast({
          title: "Username or password must be greater than 0",
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        return;
      } else {
        onClose();
        const response = await dispatch(
          registerAccount({
            username: oldValue.username,
            password: oldValue.password,
          })
        );
        if (response.payload === "Added Successfully") {
          toast({
            title: response.payload,
            status: "success",
            duration: 2000,
            position: "bottom-right",
          });
        }
      }
    }
    setOldValue({
      id: "",
      username: "",
      password: "",
      role: "member",
    });

    await dispatch(
      getAllAccount({
        token: data.token,
      })
    );
  };

  const handleContest = async (e) => {
    e.preventDefault();
    if (
      Object.values(selectedContest)
        .splice(1)
        .some((val) => val.length === 0)
    ) {
      toast({
        title: "All fields must be greater than 0",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      return;
    } else {
      console.log(selectedContest);
      onConClose();

      const dateTimeRegist = `${selectedContest.dateRegist} ${selectedContest.timeRegist}`;
      const dateTimeStart = `${selectedContest.dateStart} ${selectedContest.timeStart}`;
      const dateTimeEnd = `${selectedContest.dateEnd} ${selectedContest.timeEnd}`;
      const formData = new FormData();

      formData.append("creator", data.username);
      formData.append("title", selectedContest.title);
      formData.append("description", selectedContest.description);
      formData.append("contest", selectedContest.content);
      formData.append("data_train", selectedContest.dataTrain);
      formData.append("data_test", selectedContest.dataTest);
      formData.append("tester", selectedContest.tester);
      formData.append("time_regist", dateTimeRegist);
      formData.append("time_start", dateTimeStart);
      formData.append("time_end", dateTimeEnd);
      formData.append("language", JSON.stringify(selectedContest.language));
      formData.append("time_out", selectedContest.timeOut);

      const response = await dispatch(addContest(formData));

      if (response.payload.includes("Successfully")) {
        toast({
          title: response.payload,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });
      }

      dispatch(getAllContest());
    }
  };

  const handleLanguage = async (e) => {
    e.preventDefault();
    const isUpdate = languages.some((lang) => lang.id === selectedLang.id);

    if (isUpdate) {
      onLangClose();
      const response = await dispatch(
        updateLanguageByField({
          token: data.token,
          name: selectedLang.name,
          type: selectedLang.type,
        })
      );

      if (response.payload.includes("Updated")) {
        toast({
          title: response.payload,
          status: "success",
          duration: 2000,
          position: "bottom-right",
        });
      }
    } else {
      if (selectedLang.name.length === 0 || selectedLang.type.length === 0) {
        toast({
          title: "All fields must be greater than 0",
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        return;
      } else {
        onLangClose();
        const response = await dispatch(
          addLanguage({
            token: data.token,
            name: selectedLang.name,
            type: selectedLang.type,
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
      }
    }

    setSelectedLang({
      id: "",
      name: "",
      type: "",
    });

    await dispatch(getAllLanguages());
  };

  async function handleDeleteAccount({ username }) {
    const response = await dispatch(deleteAccountWithName({ username }));

    if (response.payload.includes("Delete")) {
      toast({
        title: response.payload,
        status: "success",
        duration: 2000,
        position: "bottom-right",
      });

      await dispatch(resetMessage());
    }
    await dispatch(
      getAllAccount({
        token: data.token,
      })
    );
  }

  async function handleDeleteLanguage({ name }) {
    const response = await dispatch(
      removeLanguage({
        token: data.token,
        name,
      })
    );

    if (response.payload.includes("Successfully")) {
      toast({
        title: response.payload,
        status: "success",
        duration: 2000,
        position: "bottom-right",
      });

      await dispatch(resetInfo());
    }

    await dispatch(getAllLanguages());
  }

  const handleChooseItem = (id) => {
    if (id !== chosenItem) {
      setChosenItem(id);
    }
  };

  useEffect(() => {
    if (data.role === "admin") {
      dispatch(
        getAllAccount({
          token: data.token,
        })
      );
      dispatch(getAllLanguages());
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(getAllContest());
  }, [dispatch]);

  // console.log(selectedContest);

  // console.log(accounts);
  console.log(contests);
  // console.log(languages);

  function renderDataByItem(id) {
    switch (id) {
      case 0:
        return (
          <>
            {loading ? (
              <Box>
                <Text>Loading...</Text>
              </Box>
            ) : accounts.length > 0 ? (
              <Box>
                <List
                  titles={["id", "username", "role", "action"]}
                  content={accountsWithActions}
                />
              </Box>
            ) : (
              <Box>
                <Text>No data...</Text>
              </Box>
            )}
          </>
        );
      case 1:
        return (
          <>
            {contestLoading ? (
              <Box>
                <Text>Loading...</Text>
              </Box>
            ) : contests.length > 0 ? (
              <Box>
                <List
                  titles={[
                    "id",
                    "title",
                    "time_regist",
                    "time_start",
                    "time_end",
                    "action",
                  ]}
                  content={contestsWithActions}
                />
              </Box>
            ) : (
              <Box>
                <Text>No data...</Text>
              </Box>
            )}
          </>
        );

      case 2:
        return (
          <>
            {languagesLoading ? (
              <Box>Loading...</Box>
            ) : languages.length > 0 ? (
              <Box>
                <List
                  titles={["id", "name", "type", "action"]}
                  content={languagesWithActions}
                />
              </Box>
            ) : (
              <Box>
                <Text>No data...</Text>
              </Box>
            )}
          </>
        );

      default:
        break;
    }
  }

  // console.log(items.splice(1));

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
            items={data.role !== "admin" ? [items[1]] : items}
            chosenItem={chosenItem}
            handleChooseItem={handleChooseItem}
          />
          <Box w="80%" h="100%" overflow="auto" pl="14px">
            <Box mb="14px">
              <Button
                colorScheme="blackAlpha"
                _hover={{
                  backgroundColor: "var(--chakra-colors-blackAlpha-700)",
                }}
                onClick={() => {
                  if (data.role === "admin") {
                    switch (chosenItem) {
                      case 0:
                        onOpen();
                        setOldValue({
                          id: "",
                          username: "",
                          password: "",
                          role: "member",
                        });
                        break;

                      case 1:
                        onConOpen();
                        setSelectedContest({
                          id: "",
                          title: "",
                          description: "",
                          content: "",
                          dataTrain: "",
                          dataTest: "",
                          tester: "",
                          dateRegist: "",
                          timeRegist: "",
                          dateStart: "",
                          timeStart: "",
                          dateEnd: "",
                          timeEnd: "",
                          language: [],
                          timeOut: "",
                        });
                        break;

                      case 2:
                        onLangOpen();
                        setSelectedLang({
                          id: "",
                          name: "",
                          type: "",
                        });
                        break;

                      default:
                        break;
                    }
                  }

                  if (data.role === "creator") {
                    if (chosenItem === 0) {
                      onConOpen();
                      setSelectedContest({
                        id: "",
                        title: "",
                        description: "",
                        content: "",
                        dataTrain: "",
                        dataTest: "",
                        tester: "",
                        dateRegist: "",
                        timeRegist: "",
                        dateStart: "",
                        timeStart: "",
                        dateEnd: "",
                        timeEnd: "",
                        language: [],
                        timeOut: "",
                      });
                    }
                  }
                }}
              >
                Add
              </Button>
            </Box>
            {data.role !== "admin"
              ? renderDataByItem(1)
              : renderDataByItem(chosenItem)}
          </Box>
        </Stack>
      </Box>
      <AddAccount
        isOpen={isOpen}
        onClose={onClose}
        oldValue={oldValue}
        onChange={onChange}
        handleAccount={handleAccount}
      />
      <AddContest
        isOpen={isConOpen}
        onClose={onConClose}
        selectedContest={selectedContest}
        onChange={onChange}
        languages={languages}
        handleContest={handleContest}
      />
      <AddLanguage
        isOpen={isLangOpen}
        onClose={onLangClose}
        selectedLang={selectedLang}
        onChange={onChange}
        handleLanguage={handleLanguage}
      />
    </Layout>
  );
}

export default AdminPage;
