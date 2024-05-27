import React from "react";
import { Flex } from "@chakra-ui/react";

const DashboardContent = () => {
  const boxStyles = {
    border: "2px solid #D4D4D4",
    borderRadius: "30",
    fontWeight: "bold",
    color: "#6B6B6B",
    paddingTop: "15px",
    paddingLeft: "30px",
  };

  const renderBox = (text: string) => (
    <Flex {...boxStyles} w="40%" height="50vh">
      {text}
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
      {renderBox("LATEST GALLERIES")}
      {renderBox("SHORTCUT")}
    </Flex>
  );
};

export default DashboardContent;
