import React, { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { uploadImage } from "./api";  // Import the function

interface Gallery {
  title: string;
}

interface InsideGalleryProps {
  gallery: Gallery;
}

const InsideGallery: React.FC<InsideGalleryProps> = ({ gallery }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

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
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploading(false);
    }
  };

  return (
    <Box w={"80%"} h={"100vh"} bgColor={"#FFFFFF"}>
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
      </Flex>
      <Divider w={"90%"} m={"auto"} />

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

      {uploadSuccess && (
        <>
          <Divider w={"90%"} m={"auto"} mt={4} />
          <Flex flexWrap="wrap" justifyContent="center" mt={4}>
            {selectedFiles.map((file, index) => (
              <Box key={index} m={2}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${file.name}`}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </Box>
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default InsideGallery;
