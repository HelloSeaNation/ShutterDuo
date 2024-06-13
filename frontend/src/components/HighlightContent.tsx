import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from 'axios';

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

interface User {
  email: string;
  highLight0: string;
  highLight1: string;
  highLight2: string;
  highLight3: string;
  highLight4: string;
  highLight5: string;
}

const AccountContent = () => {
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null, null, null, null]);
  const [user, setUser] = useState<User | null>(null);

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

  const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...selectedFiles];
    if (e.target.files && e.target.files.length > 0) {
      files[index] = e.target.files[0];
    } else {
      files[index] = null;
    }
    setSelectedFiles(files);
  };

  const handleSave = async () => {
    if (user) {
      try {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
          if (file) {
            formData.append("highlights", file);
          }
        });
        formData.append("email", user.email); // Pass the user's email for identification

        const uploadResponse = await axios.post(
          "http://localhost:5000/uploadHighlights",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload response:", uploadResponse.data);

        // Update user's highlight URLs
        const updatedUser: User = { ...user };
        for (let i = 0; i < 6; i++) {
          // Assert that the key exists on the updatedUser
          (updatedUser as any)[`highLight${i}`] = uploadResponse.data.user[`highLight${i}`];
        }

        await axios.put(`http://localhost:5000/user/${user.email}`, updatedUser);
        alert("Profile updated successfully");
        setUser(updatedUser);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating the profile");
      }
    }
  };

  return (
    <Flex w={"70%"} margin={"auto"} h={"60vh"} direction={"column"}>
      <Text color={"#8D8D8D"} fontSize={"18px"} marginTop={"1rem"}>
        You can add up to 6 images as your profile highlight.
      </Text>
      <Box marginTop={10}>
        <FormControl>
          {selectedFiles.map((_, index) => (
            <div key={index}>
              <FormLabel marginTop={2}>{`Highlight ${index + 1}`}</FormLabel>
              <Input type="file" onChange={handleFileChange(index)}></Input>
            </div>
          ))}
        </FormControl>
      </Box>

      <Flex justifyContent={"flex-end"} marginTop={"5rem"} paddingBottom={"5rem"}>
        <Button
          w={"165px"}
          h={"50px"}
          bgColor={"transparent"}
          fontSize={"18px"}
          marginRight={"10px"}
        >
          Cancel
        </Button>
        <Button
          bgColor={"#4267cf"}
          color={"white"}
          w={"165px"}
          h={"50px"}
          fontSize={"18px"}
          _hover={{ color: "#4267cf", bgColor: "#F5F3F3" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountContent;