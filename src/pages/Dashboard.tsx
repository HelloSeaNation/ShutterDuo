import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <Flex direction={"row"} justifyContent={"none"}>
          <SideBar />
          <Box w={"90%"} h={"100vh"} bgColor={"#FFFFFF"}>
            <Text>Dashboard test</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Dashboard;
