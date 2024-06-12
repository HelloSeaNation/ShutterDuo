import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { fetchGalleryById, fetchImagesByGalleryID } from "../components/api";

interface Gallery {
  _id: string;
  title: string;
  coverImage: string;
  description: string;
}

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        if (id) {
          const galleryData = await fetchGalleryById(id);
          const imageMetadata = await fetchImagesByGalleryID(id);
          setGallery({
            ...galleryData,
            coverImage: galleryData.coverImage || ""
          });
          setImages(imageMetadata);
        }
      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [id]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!gallery) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="xl">Gallery not found.</Text>
      </Flex>
    );
  }

  return (
    <Box w="80%" m="auto" padding="20px">
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" mb="4">
          {gallery.title}
        </Text>
        {gallery.coverImage && (
          <Image
            src={gallery.coverImage}
            alt="Gallery Cover"
            height="300px"
            width="100%"
            objectFit="cover"
            borderRadius="md"
            mb="4"
          />
        )}
        <Text fontSize="md" color="gray.600" mb="8">
          {gallery.description}
        </Text>
        <Divider w="100%" mb="8" />
        <Flex wrap="wrap" justifyContent="center">
          {images.map((image) => (
            <Box
              key={image._id}
              m={2}
              height="250px"
              width="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid #E2E8F0"
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={image.imageURL}
                alt={image.filename}
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default AlbumPage;
