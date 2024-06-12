import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DashboardContent from "./DashboardContent";
import CreateGalleryModal from "./CreateGalleryModal";
import axios from "axios";

interface User {
  firstName: string;
  email: string;
}

const DashboardTitleBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchFlag, setFetchFlag] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const fetchGalleries = async () => {
    setFetchFlag((prev) => !prev);
  };

  const handleSubmit = async (title: string, description: string) => {
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
      fetchGalleries();
    } else {
      alert(result.message);
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
      position={"fixed"}
    >
      <Flex
        w={"90%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          {user ? `${user.firstName}'s Dashboard` : "Users"}
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
              Create Gallery
            </Text>
          </Button>
        </Box>
      </Flex>
      <Divider w={"92%"} m={"auto"} />
      <DashboardContent fetchGalleries={fetchGalleries} />

      <CreateGalleryModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default DashboardTitleBar;
