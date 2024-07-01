import React, { useEffect, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
} from "@chakra-ui/react";
// import StyledFormLabel from './StyledFormLabel'; // Adjust the import path as needed
import LabeledInputWithIcon from "./LabeledInputWithIcon"; // Adjust the import path as needed
import { color } from "framer-motion";
import axios from "axios";

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

interface User {
  //props for profile setup and editing
  firstName: string;
  surname: string;
  email: string;
  business: string;
  profilePicture: string;
  // Optional properties for additional profile information
  bio?: string;
  location?: string;
  job?: string;
  phone?: string;
  facebook?: string;
  insta?: string;
  pinterest?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
}

const ProfileSettingContent = () => {
  // State to manage selected profile picture file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State to manage user profile data
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user"); // Retrieve user data from local storage
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser); // Parse the stored user data
        if (parsedUser && parsedUser.email) {
          try {
            // Fetch user data from the server using the user's email
            const response = await axios.get(
              `http://localhost:5000/user/${parsedUser.email}`
            );
            setUser(response.data); // Set the fetched user data to state
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };
    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevState) =>
      prevState ? { ...prevState, [name]: value } : null // Update the user state with the new value
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSaveProfile = async () => {
    if (user) {
      try {
        // If a file is selected, upload it first
        if (selectedFile) {
          const formData = new FormData();
          formData.append("profilePicture", selectedFile); // Append the file to form data
          formData.append("email", user.email); // Pass the user's email for identification

          const uploadResponse = await axios.post(
            "http://localhost:5000/uploadProfilePicture",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Update user's profile picture URL with the response from the server
          user.profilePicture = uploadResponse.data.user.profilePicture;
        }

        // Send a PUT request to update the user's profile data on the server
        await axios.put(`http://localhost:5000/user/${user.email}`, user);
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating the profile");
      }
    }
  };

  return (
    <Flex
      w={"60%"}
      margin={"auto"}
      h={"100vh"}
      direction={"column"}
    >
      <FormControl>
        <FormLabel style={TextStyle}>Profile Image</FormLabel>
        <Input type="file" onChange={handleFileChange} />

        <FormLabel style={TextStyle}>Business Name</FormLabel>
        <Input
          name="business"
          value={user?.business || ""}
          onChange={handleInputChange}
        />

        <FormLabel style={TextStyle}>Type of Job</FormLabel>
        <Input
          name="job"
          value={user?.job || "Wedding, Food, Family"}
          onChange={handleInputChange}
        />

        <FormLabel style={TextStyle}>First Name</FormLabel>
        <Input
          name="firstName"
          value={user ? `${user.firstName}` : "First Name"}
          onChange={handleInputChange}
        />

        <FormLabel style={TextStyle}>Last Name</FormLabel>
        <Input
          name="surname"
          value={user ? `${user.surname}` : "Last Name"}
          onChange={handleInputChange}
        />

        <FormLabel style={TextStyle}>Email</FormLabel>
        <Input
          name="email"
          type="Email"
          value={user ? `${user.email}` : "email"}
        />

        <FormLabel style={TextStyle}>Contact Number</FormLabel>
        <Input
          name="phone"
          type="Phone"
          value={user?.phone || ""}
          onChange={handleInputChange}
        />

        <FormLabel style={TextStyle}>Location</FormLabel>
        <Input
          name="location"
          value={user?.location || ""}
          onChange={handleInputChange}
        />

        <FormLabel style={TextStyle}>Biography</FormLabel>
        <Textarea
          name="bio"
          h={"20vh"}
          value={user?.bio || ""}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <Text
          fontSize={"18px"}
          color={"#5F5F5F"}
          fontWeight={"bold"}
          marginTop={"50px"}
        >
          Social Media Links
        </Text>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../facebook.png"
            iconAlt="Facebook"
            label="Facebook"
            inputProps={{}}
            textStyle={TextStyle}
            name="facebook"
            value={user?.facebook || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../instagram.png"
            iconAlt="Instagram"
            label="Instagram"
            inputProps={{}}
            textStyle={TextStyle}
            name="insta"
            value={user?.insta || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../pinterest.png"
            iconAlt="Pinterest"
            label="Pinterest"
            inputProps={{}}
            textStyle={TextStyle}
            name="pinterest"
            value={user?.pinterest || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../twitter.png"
            iconAlt="X"
            label="X"
            inputProps={{}}
            textStyle={TextStyle}
            name="twitter"
            value={user?.twitter || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../youtube.png"
            iconAlt="Youtube"
            label="Youtube"
            inputProps={{}}
            textStyle={TextStyle}
            name="youtube"
            value={user?.youtube || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../linkedin.png"
            iconAlt="LinkedIn"
            label="LinkedIn"
            inputProps={{}}
            textStyle={TextStyle}
            name="linkedin"
            value={user?.linkedin || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../tik-tok.png"
            iconAlt="TikTok"
            label="TikTok"
            inputProps={{}}
            textStyle={TextStyle}
            name="tiktok"
            value={user?.tiktok || ""}
            onChange={handleInputChange}
          />
        </FormControl>
      </FormControl>
      <Flex
        justifyContent={"flex-end"}
        marginTop={"5rem"}
        paddingBottom={"5rem"}
      >
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
          onClick={handleSaveProfile}
        >
          Save Profile
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileSettingContent;
