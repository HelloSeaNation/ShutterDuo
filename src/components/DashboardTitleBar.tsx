import React from "react";
import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DashboardContent from "./DashboardContent";

const DashboardTitleBar = () => {
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
          Dashboard
        </Text>
        <Button
          bgColor={"#4267CF"}
          h={"50px"}
          w={"200px"}
          justifyContent={"space-around"}
        >
          <AddIcon color={"white"} />
          <Text fontSize={"18px"} color={"white"}>
            Upload Gallery
          </Text>
        </Button>
      </Flex>
      <Divider w={"92%"} m={"auto"} />
      <DashboardContent/>
    </Box>
  );
};
export default DashboardTitleBar;
