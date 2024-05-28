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
  // const history = useHistory()

  async function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000", {
        email,
        password
      });

      if (res.data === "Invalid email or password") {
        alert("Invalid email or password");
      } else {
        alert("Login Successful");
        navigate('/dashboard'); // Navigate to dashboard after successful login
      }
    } catch (e) {
      alert("An error occurred during login");
      console.log(e);
    }
  }

  return (
    <Box>
      <Flex direction={"column"}>
        <form onSubmit={submit}>
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
            type="submit"
          >
            Login
          </Button>
        </form>
      </Flex>
    </Box>
  );
};
export default Login;
