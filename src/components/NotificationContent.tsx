import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardContent = () => {
  return (
    <>
      <Box
        w={"65%"}
        margin={"auto"}
        border={"2px solid #E6E6E6"}
        borderRadius={"10"}
        marginTop={"2rem"}
      >
        <Flex alignItems={"center"} padding={"1rem"}>
          <FontAwesomeIcon icon={faImage} size="4x" width={"30%"} color={"#4267cf"}/>
          <Flex direction={"column"}>
            <Text fontSize={"18px"}>
              {"{client full name} "} is access the {" {gallery name} "}
            </Text>
            <Text color={"#4267CF"} fontSize={"14px"}>
                7 hours ago
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default DashboardContent;
