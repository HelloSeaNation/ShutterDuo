import React, { useState} from "react";
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
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const handleLoginLinkClick = () => {
    window.location.reload();
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const navigate = useNavigate()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
        firstName,
        surname,
      });

      if (response.data === "Email already exists") {
        alert("User already exists");
        //Handle user already registered
      } else if (response.data === "Signup successful") {
        const user = { email, firstName }; // Create user object
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
        // Handle successful registration
      }
    } catch (error) {
      alert("Error during registration");
      console.log(error);
    } //Handle error
  }
  
  return (
    <Box>
      <Flex direction={"column"}>
        <form onSubmit={submit}>
          <FormControl>
            <FormLabel fontSize={"30px"} color={"white"}>
              Join Now!
            </FormLabel>
          <Text fontSize={"18px"} color={"white"} marginBottom={"20px"} marginTop={"-10px"}>
              Already have an account?
              <Link
                  href="#"
                  color={"white"}
                  marginLeft={"5px"}
                  onClick={handleLoginLinkClick}
                  _hover={{ color: "green", fontWeight: "bold" }}
              >
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
                onChange={(e) => {setFirstName(e.target.value)}}
                value={firstName}
              />
              <Input
                fontSize="20px"
                type="text"
                placeholder="Surname"
                w={"19vh"}
                h={"4vh"}
                backgroundColor={"white"}
                onChange={(e) => {setSurname(e.target.value)}}
                value={surname}
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
          <Text
            fontSize={"12px"}
            marginBottom={"20px"}
            color={"white"}
            w={"40vh"}
          >
            By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
            Policy. You may receive email from us and can opt out at any time.
          </Text>
          <Button
            w={"18vh"}
            h={"5.5vh"}
            fontSize={"20px"}
            backgroundColor={"#008F20"}
            color={"White"}
            _hover={{ bg: "#d6d6d6", color: "black" }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Flex>
    </Box>
  );
};
export default Register;
