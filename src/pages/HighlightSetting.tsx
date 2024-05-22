import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import HighlightTitleBar from "../components/HighlightTitleBar";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBarSetting";

const HighlightSetting = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <Flex direction={"row"} justifyContent={"none"}>
          <SideBar />
          <HighlightTitleBar />
        </Flex>
      </Flex>
    </Box>
  );
};

export default HighlightSetting;