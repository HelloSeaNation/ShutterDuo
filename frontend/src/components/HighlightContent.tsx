import React, { useState } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const TextStyle = {
  fontSize: "20px",
  color: "#4B4B4B",
  fontWeight: "bold",
  marginTop: "20px",
};

const AccountContent = () => {
  const [isToggledOnFirst, setIsToggledOnFirst] = useState(false);
  const [isToggledOnSecond, setIsToggledOnSecond] = useState(false);

  const handleToggleFirst = () => {
    setIsToggledOnFirst((prevState) => !prevState);
  };

  const handleToggleSecond = () => {
    setIsToggledOnSecond((prevState) => !prevState);
  };

  return (
    <Flex w={"70%"} margin={"auto"} h={"60vh"} direction={"column"}>
      <Text color={"#8D8D8D"} fontSize={"18px"} marginTop={"1rem"}>
        You can add up to 6 images as your profile highlight.
      </Text>
      <Box margin={"auto"}>
        <FontAwesomeIcon icon={faCirclePlus} size="5x" color="#C0C0C0" />
      </Box>

      <Flex
        justifyContent={"flex-end"}
        marginTop={"5rem"}
        paddingBottom={"5rem"}
      >
        <Button
          w={"165px"}
          h={"50px"}
          bgColor={"transparent"}
          fontSize={"18px"}
          marginRight={"10px"}
        >
          Cancel
        </Button>
        <Button
          bgColor={"#4267cf"}
          color={"white"}
          w={"165px"}
          h={"50px"}
          fontSize={"18px"}
          _hover={{ color: "#4267cf", bgColor: "#F5F3F3" }}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountContent;
