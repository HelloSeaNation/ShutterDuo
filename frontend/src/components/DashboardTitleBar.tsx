import React, { useState, useEffect } from "react";
import {
  Box, Flex, Text, Button, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DashboardContent from "./DashboardContent";
import axios from 'axios'

interface User { //user props to define the user data on the dashboard
  firstName: string;
  email: string;

}

const DashboardTitleBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fetchFlag, setFetchFlag] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const fetchGalleries = async () => {
    setFetchFlag(prev => !prev);
  };

  const handleSubmit = async () => {
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
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          try {
            const response = await axios.get(`http://localhost:5000/user/${parsedUser.email}`);
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
        {user ? `${user.firstName}'s Dashboard` : 'Users'}
        </Text>
        <Box>
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
        </Box>
      </Flex>
      <Divider w={"92%"} m={"auto"} />
      <DashboardContent fetchGalleries={fetchGalleries} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Gallery</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Gallery name</Text>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb={4}
            />
            <Text fontWeight={"bold"} marginBottom={"5px"}>What is the date of the event?</Text>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="date"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardTitleBar;
