import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
// import StyledFormLabel from './StyledFormLabel'; // Adjust the import path as needed
import LabeledInputWithIcon from "./LabeledInputWithIcon"; // Adjust the import path as needed
import { color } from "framer-motion";

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

const AccountContent = () => {
  return (
    <Flex w={"60%"} margin={"auto"} h={"100vh"} direction={"column"}>
      <FormControl>
        <FormLabel style={TextStyle}>Username</FormLabel>
        <FormLabel style={TextStyle}>Account Email</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Account Password</FormLabel>
        <Input />
        <FormLabel style={TextStyle}>Login with</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <Text
          fontSize={"18px"}
          color={"black"}
          fontWeight={"bold"}
          marginTop={"50px"}
        >
          Email Notification
        </Text>
        <Divider />
        <
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
          Save Account
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountContent;
