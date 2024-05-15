import React from "react";
import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ProfileContent from "./ProfileContent";

const SettingTitleBar = () => {
  return (
    <Box w={"90%"} h={"100vh"} bgColor={"#FFFFFF"}>
      <Flex
        w={"90%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          Profile
        </Text>
      </Flex>
      <Divider w={"92%"} m={"auto"} />
      <ProfileContent />
    </Box>
  );
};
export default SettingTitleBar;