import React from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <Box>
      <Box bgColor={"#F5F3F3"} h={"50px"}>
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          w={"97%"}
          margin={"auto"}
        >
          <Box>
            <Image src="./title.png" alt="shuttleduo" w={"26vh"} />
          </Box>
          <Box>
            {/* insert alert icon and profile image */}
            <Text fontSize={"30px"} color={"green"}>
              test
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopBar;
