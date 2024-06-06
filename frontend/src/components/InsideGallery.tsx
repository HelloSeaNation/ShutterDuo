import React from "react";
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface Gallery {
  title: string;
}

interface InsideGalleryProps {
  gallery: Gallery;
}

const InsideGallery: React.FC<InsideGalleryProps> = ({ gallery }) => {
  return (
    <Box w={"80%"} h={"100vh"} bgColor={"#FFFFFF"}>
      <Flex
        w={"90%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          {gallery.title}'s gallery
        </Text>
        <Button
          bgColor={"#4267CF"}
          h={"50px"}
          w={"200px"}
          justifyContent={"space-around"}
        >
          <AddIcon color={"white"} />
          <Text fontSize={"18px"} color={"white"}>
            Add Photo
          </Text>
        </Button>
      </Flex>
      <Divider w={"90%"} m={"auto"} />
    </Box>
  );
};

export default InsideGallery;