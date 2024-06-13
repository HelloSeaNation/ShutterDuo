import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateGalleryModal from "./CreateGalleryModal";
import axios from "axios";
import { createGallery } from "./api";
import GalleryContent from "./GalleryContent";

interface User {
  firstName: string;
  email: string;
}

const GalleryTitleBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const fetchGalleries = async () => {};

  const handleSubmit = async (title: string, description: string) => {
    try {
      const result = await createGallery(title, description);
      alert(result.message);
      handleClose();
      fetchGalleries();
    } catch (error) {
      console.error("Error creating gallery:", error);
      alert("An error occurred while creating the gallery. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          try {
            const response = await axios.get(
              `http://localhost:5000/user/${parsedUser.email}`
            );
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box
      w={"80%"}
      h={"100vh"}
      bgColor={"#FFFFFF"}
      left={"20rem"}
      top={"3rem"}
      position={"absolute"}
    >
      <Flex
        w={"90%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          Galleries
        </Text>
        <Button
          bgColor={"#4267CF"}
          h={"50px"}
          w={"200px"}
          justifyContent={"space-around"}
          onClick={handleOpen}
        >
          <AddIcon color={"white"} />
          <Text fontSize={"18px"} color={"white"}>
            Create Gallery
          </Text>
        </Button>
      </Flex>
      <Divider w={"90%"} m={"auto"} />
      <CreateGalleryModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <GalleryContent />
    </Box>
  );
};

export default GalleryTitleBar;
