import React, {useState, useEffect} from 'react'
import {Flex, Text, Box, MenuDivider, MenuItem, Menu, MenuList, MenuButton} from '@chakra-ui/react'
import TopBar from "../components/TopBar";
import axios from 'axios'
import { CalendarIcon, StarIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import SocialMedia from '../components/SocialMediaLinks';

interface User { //props for profile setup and editing
  firstName: string;
  surname: string;
  email: string;
  business: string;
  bio?: string;
  location?: string;
  job?: string;
  phone?: string;
  facebook?: string;
  insta?: string;
  pinterest?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  profilePicture?: string;
}

//social media links
const socialMediaPlatforms = [
  "facebook",
  "insta",
  "pinterest",
  "twitter",
  "youtube",
  "linkedin",
  "tiktok",
] as const;

type SocialMediaPlatform = (typeof socialMediaPlatforms)[number];

const socialMediaIcons: Record<SocialMediaPlatform, string> = {
  facebook: '../facebook.png',
  insta: '../instagram.png',
  pinterest: '../pinterest.png',
  twitter: '../twitter.png',
  youtube: './youtube.png',
  linkedin: '/linkedin.png',
  tiktok: '../tiktok.png'
};

const ProfilePage = () => {

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

  return(
<>
          <TopBar />

           {/* Basic information and profile photo */}
           <Box padding={35}>
        <Flex align="center">
          {user && user.profilePicture && (
            <img
              src={user && user.profilePicture ? user.profilePicture : "../defaultProfileImage.jpg"}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%', marginRight: '20px' }}
            />
          )}
          <Box>
            <Text marginBottom={2} fontWeight="bold">
              {user ? `${user.firstName} ${user.surname}` : 'User'}
            </Text>
            <Box>
              <Text color="#949494">
                <CalendarIcon marginRight={2} boxSize={4} />
                {user ? `${user.location}` : 'Location'}
              </Text>
              <Text color="#949494">
                <StarIcon marginRight={2} boxSize={4} />
                {user ? `${user.job}` : 'Job'}
              </Text>
            </Box>
          </Box>
          <Box marginLeft="150px">
            <Menu>
              <MenuButton>
                <ChevronDownIcon boxSize={5} />
              </MenuButton>
              <MenuList>
                <Link to="/report">
                  <MenuItem>Report User</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

          {/* About me section */}
          <Box marginTop={50}>
            <Text marginBottom={3} fontWeight="bold"> About Me </Text>

                <Box borderRadius={10}
                    borderColor="#D9D9D9"
                    borderWidth={1}        
                    borderStyle="solid"
                    padding={3}
                    width={400}
                    height={170}>
                    {user ? `${user.bio}` : 'Users'}
                </Box>
          </Box>
        
          {/* Contact Info */}
          <Box marginTop={50}>
            <Text marginBottom={3} fontWeight="bold"> Contact Info </Text>

            <Text>
                Phone: {user ? `${user.phone}` : 'Users'}
            </Text>

            <Text>
                Email: {user ? `${user.email}` : 'Users'}
            </Text>
          </Box>

          {/* Social media links */}
          <Box marginTop={20}>
          <Flex>
            {user && socialMediaPlatforms.map((platform) => (
              user[platform] && (
                <SocialMedia
                  key={platform}
                  iconSrc={socialMediaIcons[platform]}
                  iconAlt={`${platform} icon`}
                  url={user[platform] as string}
                />
              )
            ))}
          </Flex>
          </Box>
          </Box>

          {/* Highlights section */}
          <Box position="absolute" top="100px" right="525px" color="grey">
            <Text fontSize="2xl" fontWeight="bold">Highlights</Text>
            {/* Add your highlights content here */}
          </Box>
        
      </>
  )
}

export default ProfilePage;