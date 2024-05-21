import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

const AccountContent = () => {
  const [isToggledOnFirst, setIsToggledOnFirst] = useState(false);
  const [isToggledOnSecond, setIsToggledOnSecond] = useState(false);

  const handleToggleFirst = () => {
    setIsToggledOnFirst((prevState) => !prevState);
  };

  const handleToggleSecond = () => {
    setIsToggledOnSecond((prevState) => !prevState);
  };

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
          marginBottom={"20px"}
        >
          Email Notification
        </Text>
        <Divider marginBottom={"20px"} />
        <Text marginBottom={"20px"} color={"#939393"}>
          Send me an email when
        </Text>
        <Flex direction={"column"}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Text fontSize={"20px"} color={"black"} marginBottom={"20px"}>
              Someone download a Gallery
            </Text>
            <FontAwesomeIcon
              icon={isToggledOnFirst ? faToggleOn : faToggleOff}
              fontSize={"25px"}
              onClick={handleToggleFirst}
              style={{ cursor: "pointer" }}
            />
          </Flex>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Text fontSize={"20px"} color={"black"} marginBottom={"20px"}>
              Someone open a Gallery
            </Text>
            <FontAwesomeIcon
              icon={isToggledOnSecond ? faToggleOn : faToggleOff}
              fontSize={"25px"}
              onClick={handleToggleSecond}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        </Flex>
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
        >
          Save Account
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountContent;
