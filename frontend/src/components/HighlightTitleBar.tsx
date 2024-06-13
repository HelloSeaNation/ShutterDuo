import React from "react";
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react";
import HighlightContent from "./HighlightContent";
import { AddIcon } from "@chakra-ui/icons";

const HighlightTitleBar = () => {
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
          Highlight
        </Text>
        <Button
          bgColor={"#4267CF"}
          h={"50px"}
          w={"200px"}
          justifyContent={"space-around"}
        >
          <AddIcon color={"white"} />
          <Text fontSize={"18px"} color={"white"}>
            Add Highlight
          </Text>
        </Button>
      </Flex>
      <Divider w={"70%"} m={"auto"} />
      <HighlightContent />
    </Box>
  );
};
export default HighlightTitleBar;
