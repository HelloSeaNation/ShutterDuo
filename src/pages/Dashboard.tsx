import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DashboardTitleBar from "../components/DashboardTitleBar";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBarDashboard";

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
