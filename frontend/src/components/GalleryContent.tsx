import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Card, CardBody, Image, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { fetchGalleriesData, Gallery } from "./api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const GalleryContent: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  const handleCardClick = (galleryId: string) => {
    window.location.href = `/gallery/${galleryId}`;
  };

  const loadGalleries = async () => {
    try {
      const data = await fetchGalleriesData();
      setGalleries(data);
    } catch (error) {
      console.error("Error loading galleries:", error);
    }
  };

  const handleDeleteGallery = async (galleryId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteGallery/${galleryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Gallery deleted successfully");
        loadGalleries();
      } else {
        alert("Failed to delete gallery");
      }
    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("An error occurred while deleting the gallery. Please try again.");
    }
  };

  useEffect(() => {
    loadGalleries();
  }, []);

  const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/300/200?random=${randomId}`;
  };

  return (
    <Box w={"90%"} margin={"auto"} marginTop={"2rem"}>
      <Flex direction={"row"} margin={"auto"} marginTop={"2rem"} justifyContent={"space-evenly"}>
        <Flex overflowY="auto" direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
          {galleries.map((gallery) => (
            <Card key={gallery._id} shadow={"none"}>
              <CardBody mb={10}>
                <Flex direction={"column"} alignItems={"flex-start"} justifyContent={"space-evenly"}>
                  <Image
                    src={getRandomImageUrl()}
                    alt="Placeholder"
                    style={{
                      width: "20rem",
                      height: "13rem",
                      marginRight: "2rem",
                    }}
                    onClick={() => handleCardClick(gallery._id)}
                  />
                  <Flex direction={"column"} width={"90%"}>
                    <Flex direction={"row"} marginTop="10px" marginBottom="10px" alignItems={"center"} justifyContent={"space-between"}>
                      <Text fontSize="2opx" fontWeight="bold">
                        {gallery.title}
                      </Text>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FontAwesomeIcon icon={faEllipsis} />}
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem onClick={() => handleDeleteGallery(gallery._id)}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                    <Text fontSize="15px" color={"#9E9E9E"}>
                      {gallery.description}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default GalleryContent;
