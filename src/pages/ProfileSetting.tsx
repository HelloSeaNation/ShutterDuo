import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DashboardTitleBar from "../components/SettingTitleBar";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBarSetting";

const Dashboard = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <Flex direction={"row"} justifyContent={"none"}>
          <SideBar />
          <DashboardTitleBar />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Dashboard;
