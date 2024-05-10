import React from "react";
import { Box, Flex, Button} from "@chakra-ui/react";

const SideBar = () => { 
    return (
        <Box>
        <Box bgColor={"#FAFAFA"} h={"100vh"}>
            <Flex direction={"column"} w={"25vh"}>
            <Box marginTop={"30px"}>
                <Button
                variant="ghost"
                color={"#4F4F4F"}
                w={"100%"}
                h={"50px"}
                fontSize={"20px"}
                justifyContent={"flex-start"}
                paddingLeft={"10%"}
                >
                Dashboard
                </Button>
            </Box>
            <Box>
                <Button
                variant="ghost"
                color={"#4F4F4F"}
                w={"100%"}
                h={"50px"}
                fontSize={"20px"}
                justifyContent={"flex-start"}
                paddingLeft={"10%"}
                >
                Gallery
                </Button>
            </Box>
            <Box>
                <Button
                variant="ghost"
                color={"#4F4F4F"}
                w={"100%"}
                h={"50px"}
                fontSize={"20px"}
                justifyContent={"flex-start"}
                paddingLeft={"10%"}
                >
                Settings
                </Button>
            </Box>
            </Flex>
        </Box>
        </Box>
    );
    };

export default SideBar;