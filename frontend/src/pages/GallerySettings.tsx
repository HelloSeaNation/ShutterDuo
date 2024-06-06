import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Flex,
  Divider,
  Stack,
  Icon,
  Input,
} from "@chakra-ui/react";
import { fetchGalleryById, updateGalleryTitle } from "../components/api"; // Import updateGalleryTitle function
import { Gallery } from "../components/api";
import TopBar from "../components/TopBar";
import InsideGallery from "../components/InsideGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const GallerySettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

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

  return (
    <Box>
      <TopBar />
      <Flex direction={"row"} margin="20px">
        <Flex direction={"column"}>
          {isEditingTitle ? (
            <Flex direction={"row"} w={"20rem"} alignItems={"baseline"}>
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
              direction={"row"}
              w={"20rem"}
              justifyContent={"flex-start"}
              alignItems={"baseline"}
            >
              <Flex direction={"column"} marginRight={"20px"}>
                <Text fontSize="30px" fontWeight="bold">
                  {gallery.title}
                </Text>
                <Text fontSize="20px" color="gray.500">
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
          <Button colorScheme="blue" mt={4}>
            Edit Gallery
          </Button>
        </Flex>
        <Stack height="100vh" p={4}>
          <Divider orientation="vertical" />
        </Stack>
        <InsideGallery gallery={gallery} />
      </Flex>
    </Box>
  );
};

export default GallerySettings;