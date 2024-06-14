import React, {useState, useEffect} from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password
      });

      if (response.data.message === "Login Successful") {
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      alert("Error during login");
      console.error(error);
    }
  }

  return (
    <Box>
      <Flex direction={"column"}>
        <form onSubmit={handleLogin}>
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
                onChange={(e) => {setEmail(e.target.value)}}
                value={email}
              />
              <Input
                fontSize="20px"
                type="password"
                placeholder="Password"
                w={"40vh"}
                h={"4vh"}
                backgroundColor={"white"}
                marginBottom={"20px"}
                onChange={(e) => {setPassword(e.target.value)}}
                value={password}
              />
            </Flex>
          </FormControl>
          <Flex direction="column">
            <ChakraLink
              href="#"
              fontSize="20px"
              marginBottom="20px"
              color="white"
            >
              Forgot your Password?
            </ChakraLink>
            <Button
              w="18vh"
              h="5.5vh"
              fontSize="20px"
              backgroundColor="#008F20"
              color="white"
              _hover={{ bg: "#d6d6d6", color: "black" }}
              type="submit"
            >
              Login
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
export default Login;
