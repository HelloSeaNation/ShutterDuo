import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateGalleryModal from "./CreateGalleryModal";
import axios from 'axios';

interface User {
  firstName: string;
  email: string;
}

const GalleryTitleBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const fetchGalleries = async () => {
    // Logic to refresh the gallery list (if any)
  };

  const handleSubmit = async (title: string, description: string) => {
    try {
      const response = await fetch("http://localhost:5000/createGallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        handleClose();
        fetchGalleries(); // Refresh the gallery list after creating a new gallery
      } else {
        alert(result.message);
      }
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
    <Box w={"90%"} h={"100vh"} bgColor={"#FFFFFF"}>
      <Flex
        w={"90%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          Gallery
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
            Upload Gallery
          </Text>
        </Button>
      </Flex>
      <Divider w={"90%"} m={"auto"} />
      <CreateGalleryModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default GalleryTitleBar;
