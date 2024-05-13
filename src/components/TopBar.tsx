import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <Box>
      <Box bgColor={"#F5F3F3"} h={"60px"}>
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          w={"97%"}
          margin={"auto"}
        >
          <Box>
            <Image
              src="./title.png"
              alt="shuttleduo"
              w={"26vh"}
              marginTop={"10px"}
            />
          </Box>
          <Box>
            {/* insert alert icon and profile image */}
            <Flex direction={"row"}>
              <Image
                src="../notification.png"
                alt="alert"
                w={"35px"}
                h={"35px"}
                marginTop={"12px"}
                marginRight={"20px"}
              />
              <Image
                src="../photography.png"
                alt="profile"
                w={"40px"}
                h={"40px"}
                borderRadius={"50%"}
                marginTop={"10px"}
                marginRight={"50px"}
                border={"solid 2px green"}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopBar;
