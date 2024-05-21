import React from "react";
import { Box, Flex, Button} from "@chakra-ui/react";

const SideBar = () => { 
    return (
        <Box>
        <Box bgColor={"#FAFAFA"} h={"100vh"}>
            <Flex direction={"column"} w={"20rem"}>
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
                Profile
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
                Account
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
                Highlight
                </Button>
            </Box>
            </Flex>
        </Box>
        </Box>
    );
    };

export default SideBar;