import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const DashboardContent = () => {
  return (
    <Flex
      direction={"row"}
      justifyContent={"space-between"}
      w={"88%"}
      m={"auto"}
      marginTop={"50px"}
    >
      <Flex
        border={"2px solid #D4D4D4"}
        borderRadius={"30"}
        w={"40%"}
        height={"50vh"}
      >
        Box1
      </Flex>
      <Flex
        border={"2px solid #D4D4D4"}
        borderRadius={"30"}
        w={"40%"}
        height={"50vh"}
      >
        Box2
      </Flex>
    </Flex>
  );
};
export default DashboardContent;
