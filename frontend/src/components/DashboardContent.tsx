import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Card, CardBody, Image } from "@chakra-ui/react";

interface Gallery {
  _id: string;
  title: string;
  description: string;
}

interface DashboardContentProps {
  fetchGalleries: () => Promise<void>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  fetchGalleries,
}) => {
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

  const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    // return `https://source.unsplash.com/random/300x200?sig=${randomId}`;
    return `https://picsum.photos/200/300?random=${randomId}`;
  };

  const handleCardClick = (galleryId: string) => {
    window.location.href = `/gallery/${galleryId}`;
  };

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
            <Card key={gallery._id} onClick={() => handleCardClick(gallery._id)}>
              <CardBody
                mb={4}
                border={"1px solid #D4D4D4"}
                w={"95%"}
                boxShadow={"md"}
                borderRadius={"10"}
                bgColor={"#F8F8F8"}
              >
                <Flex direction={"row"} alignItems={"center"}>
                  <Image
                    src={getRandomImageUrl()}
                    alt="Placeholder"
                    style={{
                      width: "60px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <Flex direction={"column"}>
                    <Text fontSize="15px" fontWeight="bold">
                      {gallery.title}
                    </Text>
                    <Text fontSize="10px" color={"#9E9E9E"}>
                      {gallery.description}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Box>
      )}
      {renderBox("SHORTCUT", null)}
    </Flex>
  );
};

export default DashboardContent;
