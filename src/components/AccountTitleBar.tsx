import React from "react";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import AccountContent from "./AccountContent";

const AccountTitleBar = () => {
  return (
    <Box w={"90%"} h={"100vh"} bgColor={"#FFFFFF"}>
      <Flex
        w={"70%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          Account
        </Text>
      </Flex>
      <Divider w={"70%"} m={"auto"} />
      <AccountContent />
    </Box>
  );
};
export default AccountTitleBar;