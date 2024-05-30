import React from "react";
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
import axios from 'axios'

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

const ProfileSettingContent = () => {
  return (
    <Flex w={"60%"} margin={"auto"} h={"100vh"} direction={"column"}>
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
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../instagram.png"
            iconAlt="Instagram"
            label="Instagram"
            inputProps={{}}
            textStyle={TextStyle}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../pinterest.png"
            iconAlt="Pinterest"
            label="Pinterest"
            inputProps={{}}
            textStyle={TextStyle}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../twitter.png"
            iconAlt="X"
            label="X"
            inputProps={{}}
            textStyle={TextStyle}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../youtube.png"
            iconAlt="Youtube"
            label="Youtube"
            inputProps={{}}
            textStyle={TextStyle}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../linkedin.png"
            iconAlt="LinkedIn"
            label="LinkedIn"
            inputProps={{}}
            textStyle={TextStyle}
          />
        </FormControl>
        <FormControl>
          <LabeledInputWithIcon
            iconSrc="../tik-tok.png"
            iconAlt="TikTok"
            label="TikTok"
            inputProps={{}}
            textStyle={TextStyle}
          />
        </FormControl>
      </FormControl>
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
          _hover={{ color: "#4267cf", bgColor: "#F5F3F3"}}
        >
          Save Profile
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileSettingContent;
