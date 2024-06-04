import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import TopBar from "../components/TopBar";
import GalleryTitleBar from "../components/GalleryTitleBar";
import SideBarGallery from "../components/SideBarGallery";



const GalleryPage = () => {
    
  return (
    <Box>
      <Flex direction={"column"}>
        <TopBar />
        <Flex direction={"row"}>
        <SideBarGallery />
        <GalleryTitleBar />
        </Flex>
      </Flex>
    </Box>
  );
};

export default GalleryPage;