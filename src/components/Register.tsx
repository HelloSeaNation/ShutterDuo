import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";

const Register = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <FormControl>
          <FormLabel fontSize={"30px"} color={"white"}>
            Join with us
          </FormLabel>
          <Flex direction={"row"}>
            <Input
              fontSize="20px"
              type="text"
              placeholder="First Name"
              w={"19vh"}
              h={"4vh"}
              backgroundColor={"white"}
              marginTop={"20px"}
              marginRight={"15px"}
            />
            <Input
              fontSize="20px"
              type="text"
              placeholder="Surname"
              w={"19vh"}
              h={"4vh"}
              backgroundColor={"white"}
              marginTop={"20px"}
            />
          </Flex>
          <Flex direction={"column"}>
            <Input
              fontSize="20px"
              type="email"
              placeholder="Email"
              w={"40vh"}
              h={"4vh"}
              backgroundColor={"white"}
              marginBottom={"20px"}
              marginTop={"20px"}
            />
            <Input
              fontSize="20px"
              type="password"
              placeholder="Password"
              w={"40vh"}
              h={"4vh"}
              backgroundColor={"white"}
              marginBottom={"20px"}
            />
          </Flex>
        </FormControl>
        <Text  fontSize={"12px"} marginBottom={"20px"} color={"white"} w={"40vh"}>
          By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.
          You may receive email from us and can opu out at any time.
        </Text>
        <Button
          w={"18vh"}
          h={"5.5vh"}
          fontSize={"20px"}
          backgroundColor={"#008F20"}
          color={"White"}
          _hover={{ bg: "#d6d6d6", color: "black" }}
        >
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
};
export default Register;
