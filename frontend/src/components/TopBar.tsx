import React, {useState, useEffect} from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

interface User { //user props
firstName: string;
surname: string;
profilePicture: string;
}

const TopBar = () => {

  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          try {
            const response = await axios.get(`http://localhost:5000/user/${parsedUser.email}`);
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };
    fetchUserData();
  }, []);

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
          <Link to="/dashboard">
            <Image
              src="./title.png"
              alt="shuttleduo"
              w={"26vh"}
              marginTop={"10px"}
            />
          </Link>
        </Box>
        <Box>
          {/* insert alert icon and profile image */}
          <Flex direction={"row"}>
            <Box as={Link} to="/notification_page">
              <Image
                src="../notification.png"
                alt="alert"
                w={"35px"}
                h={"35px"}
                marginTop={"12px"}
                marginRight={"20px"}
              />
            </Box>

            <Menu>
              <MenuButton>
                <Image
                  src={user?.profilePicture ? `http://localhost:5000/${user.profilePicture}` : "../photography.png"}
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
                <MenuItem as={Link} to="/profile_setting">
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
                     {user ? `${user.firstName} ${user.surname}` : 'Users'}
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem as={Link} to="/user_profile">Profile</MenuItem>
                <MenuItem as={Link} to="/account_setting">
                  Account
                </MenuItem>
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
