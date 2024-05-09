import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import Login from "../components/Login"; 

const Register = () => {
    const handleLoginLinkClick = () => {
        window.location.reload();
    };
  return (
    <Box>
      <Flex direction={"column"}>
        <FormControl>
          <FormLabel fontSize={"30px"} color={"white"}>
            Join Now!
          </FormLabel>
          <Text fontSize={"18px"} color={"white"}>
            Already have an account?
            <Link href="#" color={"#008F20"} marginLeft={"10px"}  onClick={handleLoginLinkClick}>
              Login here
            </Link>
          </Text>
          <Flex direction={"row"} marginTop={"10px"}>
            <Input
              fontSize="20px"
              type="text"
              placeholder="First Name"
              w={"19vh"}
              h={"4vh"}
              backgroundColor={"white"}
              marginRight={"15px"}
            />
            <Input
              fontSize="20px"
              type="text"
              placeholder="Surname"
              w={"19vh"}
              h={"4vh"}
              backgroundColor={"white"}
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
        <Text
          fontSize={"12px"}
          marginBottom={"20px"}
          color={"white"}
          w={"40vh"}
        >
          By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
          Policy. You may receive email from us and can opu out at any time.
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
