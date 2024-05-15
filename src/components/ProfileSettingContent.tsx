import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

const ProfileSettingContent = () => {
  return (
    <Flex w={"50%"} margin={"auto"} h={"100vh"} direction={"column"}>
      <FormControl>
        <FormLabel style={TextStyle}>Profile Image</FormLabel>
        <FormLabel style={TextStyle}>Business Name</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Type of Job</FormLabel>
        <Input placeholder="Wedding, Food, Family" />
        <FormLabel style={TextStyle}>First Name</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Last Name</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Email</FormLabel>
        <Input type="Email" />
        <FormLabel style={TextStyle}>Contact Number</FormLabel>
        <Input type="Phone" />
        <FormLabel style={TextStyle}>Location</FormLabel>
        <Input placeholder={"Location of shooting"} />
        <FormLabel style={TextStyle}>Biography</FormLabel>
        <Textarea h={"20vh"} />
      </FormControl>
      <FormControl>
        <Text fontSize={"18px"} color={"#5F5F5F"} fontWeight={"bold"} marginTop={"50px"}>
          Social Media Links
        </Text>
        <FormLabel style={TextStyle}>Facebook</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Instagram</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Pinterest</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>X</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Youtube</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>LinkedIn</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>TikTok</FormLabel>
        <Input />
      </FormControl>
    </Flex>
  );
};

export default ProfileSettingContent;
