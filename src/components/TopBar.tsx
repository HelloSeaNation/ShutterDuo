import React from "react";
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

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
              <Menu>
                <MenuButton>
                  <Image
                    src="../photography.png"
                    alt="dropdown"
                    w={"40px"}
                    h={"40px"}
                    borderRadius={"50%"}
                    marginTop={"10px"}
                    marginRight={"50px"}
                    border={"solid 2px green"}
                  />
                </MenuButton>
                <MenuList marginRight={"40px"} borderRadius={"0"}>
                  {/* Need to change to profile image and Full Name */}
                  <MenuItem>
                    <Flex direction={"row"} align={"center"}>
                      <Image
                        src="../photography.png"
                        alt="dropdown"
                        w={"35px"}
                        h={"35px"}
                        borderRadius={"50%"}
                        marginRight={"10px"}
                        border={"solid 2px green"}
                      />
                      Profile name
                    </Flex>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Account</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopBar;
