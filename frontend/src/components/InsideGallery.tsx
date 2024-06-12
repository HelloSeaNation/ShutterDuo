import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image as ChakraImage,
  Checkbox,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { uploadImage, fetchImagesByGalleryID, deleteImages } from "./api"; // Import the function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";

interface Gallery {
  _id: string;
  title: string;
}

interface InsideGalleryProps {
  gallery: Gallery;
}

const InsideGallery: React.FC<InsideGalleryProps> = ({ gallery }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageMetadata = await fetchImagesByGalleryID(gallery._id); // Use gallery._id
        setImages(imageMetadata);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, [gallery._id]);

  const handleAddPhotoClick = () => {
    onOpen();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      await uploadImage(gallery.title, selectedFiles);
      setUploading(false);
      setUploadSuccess(true);
      onClose();

      // Reload images after upload
      const imageMetadata = await fetchImagesByGalleryID(gallery._id);
      setImages(imageMetadata);
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploading(false);
    }
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImageIds((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      console.log("Selected Image IDs for deletion:", selectedImageIds);
      await deleteImages(selectedImageIds);
      // Reload images after deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  const handleViewFullSize = (imageURL: string) => {
    setFullSizeImage(imageURL);
  };

  const handleCloseFullSizeImage = () => {
    setFullSizeImage(null);
  };

  return (
    <Box
      w={"75%"}
      h={"100vh"}
      bgColor={"#FFFFFF"}
      position={"absolute"}
      left={"23rem"}
      top={"5rem"}
      zIndex={0}
    >
      <Flex
        w={"90%"}
        margin={"auto"}
        paddingTop={"30px"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Text fontSize={"35px"} color={"#626262"}>
          {gallery.title}'s gallery
        </Text>
        <Flex>
          <Button
            bgColor={"#4267CF"}
            h={"50px"}
            w={"200px"}
            justifyContent={"space-around"}
            onClick={handleAddPhotoClick}
          >
            <AddIcon color={"white"} />
            <Text fontSize={"18px"} color={"white"}>
              Add Photo
            </Text>
          </Button>
          <Button
            bgColor={"#E53E3E"}
            h={"50px"}
            w={"200px"}
            justifyContent={"space-around"}
            ml={4}
            onClick={handleDeleteSelected}
            style={{ display: selectedImageIds.length === 0 ? "none" : "flex" }}
          >
            <DeleteIcon color={"white"} />
            <Text fontSize={"18px"} color={"white"}>
              Delete Selected
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Divider w={"90%"} m={"auto"} />
      <Flex
        w={"88%"}
        margin={"auto"}
        paddingTop={"20px"}
        paddingBottom={"20px"}
        justifyContent={"flex-start"}
      >
        <Text fontSize={"15px"} color={"#626262"}>
          {images.length} Photos
        </Text>
      </Flex>
      {/* Modal for file selection */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select images to upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
            />
            {selectedFiles.length > 0 && (
              <Text mt={2}>
                Selected files:{" "}
                {selectedFiles.map((file) => file.name).join(", ")}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {fullSizeImage && (
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
          <ChakraImage src={fullSizeImage} maxH="80vh" maxW="80vw" />
        </Box>
      )}
      <Flex
        flexWrap="wrap"
        justifyContent="flex-start"
        mt={4}
        width={"90%"}
        margin={"auto"}
      >
        {images.map((image) => (
          <Box
            key={image._id}
            m={4}
            position="relative"
            height={"250px"}
            width={"200px"}
            outline={"2px solid #E2E8F0"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px"}
            border={
              selectedImageIds.includes(image._id)
                ? "2px solid #4267CF"
                : "none"
            }
            onClick={() => handleImageSelect(image._id)}
            cursor="pointer"
          >
            <ChakraImage
              src={image.imageURL}
              alt={image.filename}
              boxSize="auto"
              objectFit="cover"
              maxWidth="100%"
              maxHeight="100%"
            />
            <Button
              onClick={() => handleViewFullSize(image.imageURL)}
              position="absolute"
              top={2}
              right={2}
              bgColor={"transparent"}
              size="sm"
            >
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            </Button>
            {selectedImageIds.includes(image._id) && (
              <Checkbox
                isChecked={true}
                position="absolute"
                top={2}
                left={2}
                colorScheme="blue"
              />
            )}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default InsideGallery;
