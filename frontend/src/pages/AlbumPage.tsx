import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image as ChakraImage,
  Divider,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        if (id) {
          const galleryData = await fetchGalleryById(id);
          const imageMetadata = await fetchImagesByGalleryID(id);
          setGallery({
            ...galleryData,
            coverImage: galleryData.coverImage || "",
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

  const handleImageClick = (imageURL: string) => {
    setSelectedImage(imageURL);
    onOpen();
  };

  const handleCloseFullSizeImage = () => {
    setSelectedImage(null);
    onClose();
  };

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
        <Text fontSize="xl">No Image in this gallery, please contact your photographer</Text>
      </Flex>
    );
  }

  return (
    <Box w="100%" m="auto">
      <Flex direction="column" alignItems="center">
        <Box position="relative">
          <ChakraImage
            src={gallery.coverImage}
            alt="Gallery Cover"
            height="100vh"
            width="100%"
            objectFit="cover"
            borderRadius="md"
            mb="4"
          />
          <Box
            position="absolute"
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            bottom={4}
            bg="rgba(0, 0, 0, 0.6)"
            p={4}
            w={"100%"}
          >
            <Text fontSize="3xl" fontWeight="bold" color="white" mb="2">
              {gallery.title}
            </Text>
            <Text fontSize="md" color="white">
              {gallery.description}
            </Text>
          </Box>
        </Box>
        <Divider w="100%" mb="8" />
        <Flex wrap="wrap" justifyContent="center">
          {images.map((image) => (
            <Box
              key={image._id}
              m={5}
              height="450px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid #E2E8F0"
              borderRadius="md"
              overflow="hidden"
              onClick={() => handleImageClick(image.imageURL)}
              cursor="pointer"
            >
              <ChakraImage
                src={image.imageURL}
                alt={image.filename}
                boxSize={"auto"}
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
      {selectedImage && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          background="rgba(0, 0, 0, 0.8)"
          zIndex={999}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={handleCloseFullSizeImage}
        >
          <ChakraImage src={selectedImage} maxH="80vh" maxW="80vw" />
        </Box>
      )}
    </Box>
  );
};

export default AlbumPage;
