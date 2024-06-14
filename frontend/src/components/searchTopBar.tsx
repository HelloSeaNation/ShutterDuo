import React from "react";
import {
Box,
Flex,
Image
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SearchTopBar = () => {

return (
  <Box display={"flex"}width={"100%"} zIndex={"99"} top={0}>
    <Box bgColor={"#F5F3F3"} h={"60px"} width={"100%"}>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        w={"97%"}
        margin={"auto"}
      >
        <Box>
          <Link to="/dashboard">
            <Image
              src="../title.png"
              alt="shuttleduo"
              w={"26vh"}
              marginTop={"10px"}
            />
          </Link>
        </Box>
      </Flex>
    </Box>
  </Box>
);
};

export default SearchTopBar;