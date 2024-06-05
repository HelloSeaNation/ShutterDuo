import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GalleryContent = () => {
  return (
    <>
      <Box
        w={"90%"}
        margin={"auto"}
        border={"2px solid #E6E6E6"}
        borderRadius={"10"}
        marginTop={"2rem"}
      >
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"auto"}
          marginTop={"2rem"}
        >
          <FontAwesomeIcon icon={faImage} size="5x" color={"#E6E6E6"} />
          <Text fontSize={"1.5rem"} color={"#E6E6E6"} marginTop={"1rem"}>
            No images to display
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default GalleryContent;