import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import HighlightTitleBar from "../components/HighlightTitleBar";
import TopBar from "../components/TopBar";
import NotificationTitleBar from "../components/NotificationTitleBar";

const NotificationPage = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <Flex direction={"row"} justifyContent={"none"}>
          <NotificationTitleBar />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NotificationPage;