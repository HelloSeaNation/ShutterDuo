import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import TopBar from "../components/TopBar";

const Dashboard = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
      </Flex>
    </Box>
  );
};

export default Dashboard;