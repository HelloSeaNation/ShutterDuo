import React from "react";
import { Box, Image, Flex, Button, Text } from "@chakra-ui/react";
import Login from "../components/Login"; 
import Register from "../components/Register";

const LandingPage = () => {
const [showLogin, setShowLogin] = React.useState(true);
const [showRegister, setShowRegister] = React.useState(false);

const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
};

const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
};

return (
    <Box height={"100vh"} bg={"#4267CF"} margin={"auto"}>
        <Box bg="#4267CF" p={4} color="orange">
            <Flex justifyContent={"space-between"} w={"95%"} margin={"auto"}>
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
                        onClick={handleLoginClick}
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
                        onClick={handleRegisterClick}
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
                left="120px"
                top="10%"
                fontSize={"70px"}
            >
                <Text>Where photographer</Text>
                <Text>send image fast and simple</Text>
            </Box>
        </Box>

        <Box
            textAlign="left"
            position="absolute"
            right="8vh"
            top="15%"
            fontSize={"70px"}
        >
            {showLogin && <Login />}
            {showRegister && <Register />}
        </Box>
    </Box>
);
};
export default LandingPage;
