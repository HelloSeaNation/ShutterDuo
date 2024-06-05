import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import { fetchGalleryById } from "../components/api"; // This function fetches gallery details by ID
import { Gallery } from "../components/api";

const GallerySettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      if (id) {
        try {
          console.log(`Loading gallery with ID: ${id}`);
          const data = await fetchGalleryById(id);
          console.log("Fetched gallery data:", data);
          setGallery(data);
        } catch (error) {
          console.error("Error loading gallery:", error);
        }
      }
    };

    loadGallery();
  }, [id]);

  if (!gallery) {
    console.log("Gallery is null");
    return <Text>Loading...</Text>;
  }

  console.log("Gallery is not null, rendering data", gallery);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">{gallery.title}</Text>
      <Text fontSize="md" color="gray.500">{gallery.description}</Text>
      <Button colorScheme="blue" mt={4}>
        Edit Gallery
      </Button>
      {/* Add more settings and functionality here */}
    </Box>
  );
};

export default GallerySettings;