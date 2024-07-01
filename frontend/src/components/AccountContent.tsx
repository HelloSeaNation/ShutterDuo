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
  // State to hold the current user data, passwords, and new email
  const [user, setUser] = useState({ email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // useEffect hook to fetch user data from local storage and API
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          try {
            // Fetch user data from API using the stored email
            const response = await axios.get(`http://localhost:5000/user/${parsedUser.email}`);
            setUser(response.data); // Update state with fetched user data
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };
    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSave = async () => {
    // Check if the new password and re-entered password match
    if (newPassword !== reEnterPassword) {
      alert("Passwords do not match");
      return; // Exit the function if passwords don't match
    }

    const payload = {
      email: user.email,
      password: currentPassword,
      newPassword,
      newEmail
    };

    try {
      // Send a PUT request to the API to update user login details
      const response = await axios.put('http://localhost:5000/user/update-login', payload);

      if (response.status === 200) {
        alert("Profile updated successfully");
      }
    } catch (error) {     // Send a PUT request to the API to update user login details
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
