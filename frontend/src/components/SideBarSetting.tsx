import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Box>
      <Box bgColor={"#FAFAFA"} h={"100vh"} top={"3rem"} position={"fixed"}>
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
              as={Link}
              to="/profile_setting"
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
              as={Link}
              to="/account_setting"
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
              as={Link}
              to="/highlight_setting"
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
