import React, { useEffect, useState } from "react";
import { Tabs, Tab, TabList } from "@chakra-ui/tabs";
import { Link, useLocation } from "react-router-dom";
import { ROUTERS } from "../constants/routers";

function PageList({ children }) {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case ROUTERS.HOME:
        setTabIndex(0);
        break;
      case ROUTERS.CONTESTS:
        setTabIndex(1);
        break;
      case ROUTERS.PROBLEMS:
        setTabIndex(2);
        break;
      default:
        return;
    }
  }, [location.pathname]);

  return (
    <Tabs isLazy index={tabIndex}>
      <TabList>
        <Link to={ROUTERS.HOME}>
          <Tab textTransform="uppercase">Home</Tab>
        </Link>
        <Link to={ROUTERS.CONTESTS}>
          <Tab textTransform="uppercase">Contests</Tab>
        </Link>
        <Link to={ROUTERS.PROBLEMS}>
          <Tab textTransform="uppercase">Problems</Tab>
        </Link>
      </TabList>
      {children}
    </Tabs>
  );
}

export default PageList;
