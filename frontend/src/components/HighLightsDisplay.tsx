import React, {useEffect, useState} from 'react'
import { Box, Grid, GridItem, Text, Stack } from "@chakra-ui/react"
import axios from 'axios'

interface User {
    email: string;
    highLight0?: string;
    highLight1?: string;
    highLight2?: string;
    highLight3?: string;
    highLight4?: string;
    highLight5?: string;
}

const HighLightDisplay = () => {

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

    const highlights = [
        user?.highLight0,
        user?.highLight1,
        user?.highLight2,
        user?.highLight3,
        user?.highLight4,
        user?.highLight5,
    ].filter(Boolean); //remove any undefined highlights
    
    return(

        <Stack spacing={4} align="center">
            <Text fontSize="2xl" fontWeight="bold">
            Highlights
            </Text>
            
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {highlights.map((highlight, index) => (
                <GridItem key={index} w="350px" h="220px" bg="gray.200" borderRadius="md" overflow="hidden">
                <Box as="img" src={highlight} alt={`highlight-${index}`} w="100%" h="100%" objectFit="cover" />
                </GridItem>
            ))}
            </Grid>
      </Stack>
    )
}

export default HighLightDisplay