import { useState, useEffect } from 'react'
import {Box, Text, Input} from '@chakra-ui/react'
import TopBar from '../components/TopBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

//defining props interface for the rotating placeholder component
interface RotatingPlaceholderInputProps {
    placeholders: string[];
    interval: number;
  }
  
  //Rotating placeholder component
  const RotatingPlaceholderInput: React.FC<RotatingPlaceholderInputProps> = ({ placeholders, interval }) => {
    //state to track the current placeholder index
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  
    //handle the rotation logic
    useEffect(() => {
      const placeholderRotation = setInterval(() => {
        setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }, interval);
  
      return () => clearInterval(placeholderRotation);
    }, [placeholders, interval]);
  
    return (
        <>
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#3170dd" }} /> */}
      <Input
        borderRadius={15}
        borderColor="#D4D4D4"
        height="45px"
        placeholder={placeholders[currentPlaceholderIndex]}
        transition="placeholder 3s ease-in-out"
      />

      </>
      
    );
  };


const SearchBar = () => {

    //List of search suggestions to rotate through the search bar
    const placeholders = [
        "Wedding",
        "Birthday",
        "Event",
        "Location"
      ]

    return(
        <Box>
            <TopBar />
        
            <Box style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginTop: '300px', 
                width: '100vw'
            }}>

                <Box>
                    <Text
                    display='flex' 
                    justifyContent='center'
                    fontSize={"30px"}
                    >Search for a photographer</Text>

                    <Box
                    w="650px"
                    mt="15px">
                        <RotatingPlaceholderInput placeholders={placeholders} interval={10000} />
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default SearchBar;

