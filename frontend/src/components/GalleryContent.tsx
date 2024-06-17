import React, { useEffect, useState, useRef } from "react";
import { 
  Box, 
  Flex, 
  Text, 
  Card, 
  CardBody, 
  Image, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  IconButton, 
  Button, 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogContent, 
  AlertDialogOverlay 
} from "@chakra-ui/react";
import { fetchGalleriesData, Gallery, deleteGallery, createGallery } from "./api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const GalleryContent: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleCardClick = (galleryId: string) => {
    navigate(`/gallery/${galleryId}`);
  };

  const loadGalleries = async () => {
    try {
      const data = await fetchGalleriesData();
      setGalleries(data);
    } catch (error) {
      console.error("Error loading galleries:", error);
    }
  };

  const openDialog = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedGallery(null);
  };

  const confirmDelete = async () => {
    if (selectedGallery) {
      const success = await deleteGallery(selectedGallery._id);
      if (success) {
        alert("Gallery deleted successfully");
        loadGalleries();
      } else {
        alert("Failed to delete gallery");
      }
      closeDialog();
    }
  };

  const handleCreateGallery = async (title: string, description: string, userId: string) => {
    const success = await createGallery(title, description, userId);
    if (success) {
      alert("Gallery created successfully");
      loadGalleries();
    } else {
      alert("Failed to create gallery");
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
                    src={gallery.coverImage || getRandomImageUrl()}
                    alt="Placeholder"
                    style={{
                      width: "20rem",
                      height: "13rem",
                      marginRight: "2rem",
                    }}
                    onClick={() => handleCardClick(gallery._id)}
                  />
                  <Flex direction={"column"} width={"93%"}>
                    <Flex direction={"row"} marginTop="10px" marginBottom="10px" alignItems={"center"} justifyContent={"space-between"}>
                      <Text fontSize="2opx" fontWeight="bold">
                        {gallery.title}
                      </Text>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FontAwesomeIcon icon={faEllipsis} color="#4267CF"/>}
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem onClick={() => navigate(`/album/${gallery._id}`)}>View album</MenuItem>
                          <MenuItem onClick={() => openDialog(gallery)}>Delete</MenuItem>
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

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Gallery
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? All photos for <Text as="span" fontWeight="bold">{selectedGallery?.title}</Text> will be removed. This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default GalleryContent;
