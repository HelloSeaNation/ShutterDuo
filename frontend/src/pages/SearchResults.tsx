import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SearchTopBar from '../components/searchTopBar';

interface User {
  _id: string;
  firstName: string;
  surname: string;
  profilePicture: string;
  bio: string;
  location: string;
  job: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        console.log(`Fetching results for: ${searchTerm}`);
        const response = await axios.get(`http://localhost:5000/api/search?query=${searchTerm}`);
        console.log('Search results:', response.data);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results', error);
        setError("Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <>
      <SearchTopBar />
      <Box mt="20px" ml="20px">
        <Text fontSize="2xl" fontWeight="bold">
          Showing search results for:
          <Text as="span" color="#4267CF">
            {' '}
            {searchTerm}
          </Text>
        </Text>
      </Box>
      <Link to="/search_photographer">
        <Text mt="5px" ml="20px"  color="#9E9E9E">
          Return to search
        </Text>
      </Link>
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" marginTop="30px">
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : results.length === 0 ? (
          <Text fontSize="xl" color="gray.500">Sorry, no profiles match this search</Text>
        ) : (
          <SimpleGrid columns={[1, null]} spacing="40px" width="80%" maxW="1200px" mx="auto">
            {results.map((user) => (
              <Link to={`/profile/${user._id}`} state={{ user }} key={user._id}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" position="relative" display="flex" alignItems="center">
                  <Flex align="center" flex="1">
                    <img
                      src={user && user.profilePicture ? user.profilePicture : "../defaultProfileImage.jpg"}
                      alt={`${user.firstName} ${user.surname}`}
                      style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
                    />
                    <Box>
                      <Text fontWeight="bold">
                        {user.firstName} {user.surname}
                      </Text>
                      <Text color="#9E9E9E">{user.location}</Text>
                      <Text color="#9E9E9E">{user.job}</Text>
                    </Box>
                  </Flex>
                  <Button
                    bg="green.500"
                    color="white"
                    width="60px"
                    height="40px"
                    alignSelf="center"
                    marginRight="20px"
                  >
                    View
                  </Button>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

export default SearchResults;