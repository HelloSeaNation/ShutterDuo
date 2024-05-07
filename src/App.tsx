import React from "react";
import { Box, Image, Flex, Button, Text } from "@chakra-ui/react";
import Login from "./components/Login";


function App() {
  return (
    <Box height={"100vh"} bg={"#4267CF"} margin={"auto"}>
      <Box bg="#4267CF" p={4} color="orange">
        <Flex justifyContent={"space-between"}>
          <Image
            src="./shutterduologo.png"
            alt="shutterduologo"
            height={"50px"}
          />
          <Box>
            <Button
              color="white"
              variant="outline"
              borderRadius={"0"}
              fontFamily={"Inter"}
              fontWeight={"normal"}
              _hover={{ color: "#4267CF", bg: "white" }}
            >
              LOGIN
            </Button>
            <Button
              color="white"
              variant="outline"
              borderRadius={"0"}
              marginLeft={"-0.4"}
              fontFamily={"Inter"}
              fontWeight={"normal"}
              _hover={{ color: "#4267CF", bg: "white" }}
            >
              SIGN UP
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box
        bgImage="url('./blue-whale.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        h="94vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        position="relative"
      >
        <Box
          textAlign="left"
          position="absolute"
          left="70px"
          top="13%"
          fontSize={"70px"}
        >
          <Text>Where photographer</Text>
          <Text>send image fast and simple</Text>
        </Box>
      </Box>
      <Login />
    </Box>
  );
}

export default App;