import React, { useState, useEffect } from "react";
import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from 'axios';

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

const AccountContent = () => {
  const [user, setUser] = useState({ email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
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

  const handleSave = async () => {
    if (newPassword !== reEnterPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email: user.email,
      password: currentPassword,
      newPassword,
      newEmail
    };

    try {
      const response = await axios.put('http://localhost:5000/user/update-login', payload);

      if (response.status === 200) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <Flex w={"60%"} margin={"auto"} h={"100vh"} direction={"column"}>
      <FormControl>
        <FormLabel style={TextStyle}>Current Email</FormLabel>
        <Input value={user.email} readOnly />

        <FormLabel style={TextStyle}>New Email (optional)</FormLabel>
        <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

        <FormLabel style={TextStyle}>Current Password</FormLabel>
        <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

        <FormLabel style={TextStyle}>New Password</FormLabel>
        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <FormLabel style={TextStyle}>Re-Enter Password</FormLabel>
        <Input type="password" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} />
      </FormControl>

      <Flex justifyContent={"flex-end"} marginTop={"5rem"} paddingBottom={"5rem"}>
        <Button w={"165px"} h={"50px"} bgColor={"transparent"} fontSize={"18px"} marginRight={"10px"}>
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
          Save Account
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountContent;
