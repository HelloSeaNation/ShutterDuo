import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Card, CardBody, Image } from "@chakra-ui/react";
import { fetchGalleriesData, Gallery } from "./api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faGears, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

interface DashboardContentProps {
  fetchGalleries: () => Promise<void>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  fetchGalleries,
}) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  const loadGalleries = async () => {
    try {
      const data = await fetchGalleriesData();
      setGalleries(data);
    } catch (error) {
      console.error("Error loading galleries:", error);
    }
  };

  useEffect(() => {
    loadGalleries();
  }, [fetchGalleries]);

  const boxStyles = {
    border: "2px solid #D4D4D4",
    borderRadius: "30px",
    fontWeight: "bold",
    color: "#6B6B6B",
    paddingTop: "15px",
    paddingLeft: "30px",
  };

  const renderBox = (text: string, content: JSX.Element | null) => (
    <Flex {...boxStyles} w="40%" height="50vh" direction="column">
      <Text mb={4}>{text}</Text>
      {content}
    </Flex>
  );

  const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/200/300?random=${randomId}`;
  };

  const handleCardClick = (galleryId: string) => {
    window.location.href = `/gallery/${galleryId}`;
  };

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      w="88%"
      m="auto"
      marginTop="15vh"
    >
      {renderBox(
        "LATEST GALLERIES",
        <Box overflowY="auto">
          {galleries.map((gallery) => (
            <Card key={gallery._id} onClick={() => handleCardClick(gallery._id)}>
              <CardBody
                mb={4}
                border={"1px solid #D4D4D4"}
                w={"95%"}
                boxShadow={"md"}
                borderRadius={"10"}
                bgColor={"#F8F8F8"}
              >
                <Flex direction={"row"} alignItems={"center"}>
                  <Image
                    src={gallery.coverImage || getRandomImageUrl()}
                    alt="Placeholder"
                    style={{
                      width: "60px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <Flex direction={"column"}>
                    <Text fontSize="15px" fontWeight="bold">
                      {gallery.title}
                    </Text>
                    <Text fontSize="10px" color={"#9E9E9E"}>
                      {gallery.description}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Box>
      )}
      {renderBox("SHORTCUTS", 
        <Box overflowY="auto">
          <Link to="/profile_setting">
        <Card>
          <CardBody
            mb={4}
            border={"1px solid #D4D4D4"}
            w={"95%"}
            boxShadow={"md"}
            borderRadius={"10"}
            bgColor={"#F8F8F8"}
          >
            <Flex direction="row" alignItems="center">
              <FontAwesomeIcon icon={faUser} color="#6B6B6B" size="2x" />
              <Text ml={3}>Edit Profile</Text>
            </Flex>
          </CardBody>
        </Card>
        </Link>

        <Link to="/account_setting">
        <Card>
          <CardBody
            mb={4}
            border={"1px solid #D4D4D4"}
            w={"95%"}
            boxShadow={"md"}
            borderRadius={"10"}
            bgColor={"#F8F8F8"}
          >
            <Flex direction="row" alignItems="center">
              <FontAwesomeIcon icon={faGears} color="#6B6B6B" size="2x" />
              <Text ml={3}>Account Settings</Text>
            </Flex>
          </CardBody>
        </Card>
        </Link>

        <Link to="/report">
        <Card>
          <CardBody
            mb={4}
            border={"1px solid #D4D4D4"}
            w={"95%"}
            boxShadow={"md"}
            borderRadius={"10"}
            bgColor={"#F8F8F8"}
          >
            <Flex direction="row" alignItems="center">
              <FontAwesomeIcon icon={faMessage} color="#6B6B6B" size="2x" />
              <Text ml={3}>Contact Us</Text>
            </Flex>
          </CardBody>
        </Card>
        </Link>
      </Box>
    )}
  </Flex>
  );
};

export default DashboardContent;
