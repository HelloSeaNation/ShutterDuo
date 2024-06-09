import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import TopBar from "../components/TopBar";
import { useLocation } from 'react-router-dom';

interface User {
  _id: string;
  firstName: string;
  surname: string;
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
      <TopBar />
      <Box mt="20px" ml="20px">
        <Text fontSize="2xl" fontWeight="bold">
          Showing search results for: 
          <Text as="span" color="#4267CF"> {searchTerm}</Text>
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" marginTop="30px">
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : (
                <SimpleGrid columns={[1, null]} spacing="40px" width="80%" maxW="1200px" mx="auto">
                {results.map((user) => (
                    <Box key={user._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
                    <Text fontWeight="bold">{user.firstName} {user.surname}</Text>
                    <Text color="#9E9E9E">{user.location}</Text>
                    <Text color="#9E9E9E">{user.job}</Text>
                    </Box>
                ))}
                </SimpleGrid>
            )}
        </Box>
    </>
  );
};

export default SearchResults;