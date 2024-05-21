import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AccountTitleBar from "../components/AccountTitleBar";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBarSetting";

const AccountSetting = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <Flex direction={"row"} justifyContent={"none"}>
          <SideBar />
          <AccountTitleBar />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountSetting;