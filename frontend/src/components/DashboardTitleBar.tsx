import React, { useState } from "react";
import { Box, Flex, Text, Button, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DashboardContent from "./DashboardContent";

const DashboardTitleBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
    } else {
      alert(result.message);
    }
  };

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
      <DashboardContent />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Gallery</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
