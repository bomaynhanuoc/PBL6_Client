import React, { useEffect, useState } from "react";
import { Tabs, Tab, TabList } from "@chakra-ui/tabs";
import { Link, useLocation } from "react-router-dom";

function PageList({ tabs, children }) {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState();

  useEffect(() => {
    setTabIndex(tabs.findIndex((tab) => tab.link === location.pathname));
    // switch (location.pathname) {
    //   case ROUTERS.HOME:
    //     setTabIndex(0);
    //     break;
    //   case ROUTERS.CONTESTS:
    //     setTabIndex(1);
    //     break;
    //   case ROUTERS.PROBLEMS:
    //     setTabIndex(2);
    //     break;
    //   default:
    //     return;
    // }
  }, [tabs, location.pathname]);

  return (
    <Tabs isLazy index={tabIndex}>
      <TabList>
        {tabs.map((tab, idx) => (
          <Link key={idx} to={tab.link}>
            <Tab textTransform="uppercase">{tab.name}</Tab>
          </Link>
        ))}
        {/* <Link to={ROUTERS.HOME}>
          <Tab textTransform="uppercase">Home</Tab>
        </Link>
        <Link to={ROUTERS.CONTESTS}>
          <Tab textTransform="uppercase">Contests</Tab>
        </Link>
        <Link to={ROUTERS.PROBLEMS}>
          <Tab textTransform="uppercase">Problems</Tab>
        </Link> */}
      </TabList>
      {children}
    </Tabs>
  );
}

export default PageList;
