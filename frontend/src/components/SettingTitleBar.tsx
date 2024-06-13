import React from "react";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import ProfileSettingContent from "./ProfileSettingContent";

const SettingTitleBar = () => {
  return (
    <Box
      w={"80%"}
      h={"100vh"}
      bgColor={"#FFFFFF"}
      left={"20rem"}
      top={"5rem"}
      position={"absolute"}
    >
      <Flex
        w={"70%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          Profile
        </Text>
      </Flex>
      <Divider w={"70%"} m={"auto"} />
      <ProfileSettingContent />
    </Box>
  );
};
export default SettingTitleBar;
