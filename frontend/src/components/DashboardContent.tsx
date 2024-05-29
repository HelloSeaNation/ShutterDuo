import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

interface Gallery {
  _id: string;
  title: string;
  description: string;
}

interface DashboardContentProps {
  fetchGalleries: () => Promise<void>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ fetchGalleries }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  const fetchGalleriesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/galleries");
      const data: Gallery[] = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

  useEffect(() => {
    fetchGalleriesData();
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
            <Box key={gallery._id} mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                {gallery.title}
              </Text>
              <Text>{gallery.description}</Text>
            </Box>
          ))}
        </Box>
      )}
      {renderBox("SHORTCUT", null)}
    </Flex>
  );
};

export default DashboardContent;
