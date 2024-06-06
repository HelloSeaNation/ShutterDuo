import React, {useState, useEffect} from 'react'
import {Flex, Text, Box} from '@chakra-ui/react'
import TopBar from "../components/TopBar";
import axios from 'axios'
import { CalendarIcon, StarIcon} from '@chakra-ui/icons'
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
              <Text marginBottom={2} fontWeight="bold">
                   {user ? `${user.firstName} ${user.surname}` : 'Users'}
              </Text>

              <Box color="#949494">

              <Text>
              <CalendarIcon marginRight={2} boxSize={4}/>
                  {user ? `${user.location}` : 'Users'}
              </Text>


              <Text>
              <StarIcon marginRight={2} boxSize={4} />
                  {user ? `${user.job}` : 'Users'}
              </Text>

          </Box>

          {/* About me section */}
          <Box marginTop={50} >
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
        
      </>
  )
}

export default ProfilePage;