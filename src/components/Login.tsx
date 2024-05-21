import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box>
      <Flex direction={"column"}>
        <FormControl>
          <FormLabel fontSize={"30px"} color={"white"}>
            Welcome
          </FormLabel>
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
        <ChakraLink
          href="#"
          fontSize={"20px"}
          marginBottom={"20px"}
          color={"white"}
        >
          Forgot your Password?
        </ChakraLink>
        <Button
          w={"18vh"}
          h={"5.5vh"}
          fontSize={"20px"}
          backgroundColor={"#008F20"}
          color={"White"}
          _hover={{ bg: "#d6d6d6", color: "black" }}
          as={Link}
          to="/dashboard"
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
};
export default Login;
