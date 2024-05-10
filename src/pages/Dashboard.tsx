import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <SideBar />
      </Flex>
    </Box>
  );
};

export default Dashboard;
