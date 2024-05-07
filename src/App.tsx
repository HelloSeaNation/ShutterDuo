import React from "react";
import { Box, Image, Flex, Button } from "@chakra-ui/react";

function App() {
  return (
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
            _hover={{ color:"#4267CF", bg:"white"}}
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
            _hover={{ color:"#4267CF", bg:"white"}}
          >
            SIGN UP
          </Button>
        </Box>
      </Flex>
    </Box>
    
  );
}

export default App;
