import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Flex,
  Divider,
  Stack,
  Icon,
  Input,
  Image,
} from "@chakra-ui/react";
import {
  fetchGalleryById,
  updateGalleryTitle,
  updateGalleryCoverImage,
} from "../components/api"; // Import updateGalleryCoverImage function
import { Gallery } from "../components/api";
import TopBar from "../components/TopBar";
import InsideGallery from "../components/InsideGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";

const GallerySettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);

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

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setEditedTitle(gallery.title);
  };

  const handleSaveTitle = async () => {
    try {
      await updateGalleryTitle(id!, editedTitle);
      setIsEditingTitle(false);
      setGallery((prevGallery) => ({
        ...prevGallery!,
        title: editedTitle,
      }));
    } catch (error) {
      console.error("Error saving title:", error);
    }
  };

  const handleCoverImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && id) {
      try {
        setIsUploadingCover(true);
        const newCoverImageUrl = await updateGalleryCoverImage(id, file);
        setGallery((prevGallery) => ({
          ...prevGallery!,
          coverImage: newCoverImageUrl,
        }));
        window.location.reload();
      } catch (error) {
        console.error("Error updating cover image:", error);
      } finally {
        setIsUploadingCover(false);
      }
    }
  };

  return (
    <Box>
      <TopBar />
      <Flex direction="row" margin="20px">
        <Flex direction="column" position={"fixed"} top={"5rem"}>
          {isEditingTitle ? (
            <Flex direction="row" w="20rem" alignItems="baseline">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <Button onClick={handleSaveTitle} colorScheme="blue" ml={2}>
                Save
              </Button>
            </Flex>
          ) : (
            <Flex
              direction="row"
              w="20rem"
              justifyContent="flex-start"
              alignItems="baseline"
            >
              <Flex direction="column" marginRight="20px">
                <Text fontSize="30px" fontWeight="bold">
                  {gallery.title}
                </Text>
                <Text fontSize="20px" color="gray.500" marginBottom={"20px"}>
                  {gallery.description}
                </Text>
              </Flex>
              <FontAwesomeIcon
                icon={faPen}
                color="#4267CF"
                onClick={handleEditTitle}
              />
            </Flex>
          )}
          <Flex justifyContent={"space-between"} h={"80vh"} flexDirection={"column"}>
            <Flex direction="column" alignItems="center">
              {gallery.coverImage ? (
                <Image
                  src={gallery.coverImage}
                  alt="Gallery Cover"
                  height={"180px"}
                  width={"300px"}
                  objectFit="cover"
                  borderRadius="md"
                />
              ) : (
                <Box
                  height={"180px"}
                  width={"300px"}
                  border="2px dashed gray"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FontAwesomeIcon icon={faCamera} color="gray" size="2x" />
                </Box>
              )}
              <Button
                as="label"
                colorScheme="blue"
                mt={4}
                isLoading={isUploadingCover}
              >
                Change Cover Image
                <Input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleCoverImageChange}
                />
              </Button>
            </Flex>
            <Button
              colorScheme="blue"
              mt={4}
              onClick={() => navigate(`/album/${id}`)}
            >
              View Album
            </Button>
          </Flex>
        </Flex>
        
      </Flex>
      <InsideGallery gallery={gallery} />
    </Box>
    
  );
};

export default GallerySettings;
