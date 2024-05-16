import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Image,
} from "@chakra-ui/react";
// import StyledFormLabel from './StyledFormLabel'; // Adjust the import path as needed
import LabeledInputWithIcon from "./LabeledInputWithIcon"; // Adjust the import path as needed

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
    </Flex>
  );
};

export default ProfileSettingContent;
