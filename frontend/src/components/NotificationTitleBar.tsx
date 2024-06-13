import React from "react";
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react";
import NotificationContent from "./NotificationContent";
import { AddIcon } from "@chakra-ui/icons";

const NotificationTitleBar = () => {
  return (
    <Box
      w={"70%"}
      h={"100vh"}
      margin={"auto"}
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
          Notification
        </Text>
      </Flex>
      <Divider w={"70%"} m={"auto"} />
      <NotificationContent />
    </Box>
  );
};
export default NotificationTitleBar;
