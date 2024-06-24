import React, { useState } from "react";
import TopBar from "../components/TopBar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const Report: React.FC = () => {
    // Initialize state to hold form data (name, email, message)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Update the corresponding field in the formData state
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a POST request to the server with form data
      await axios.post("http://localhost:5000/send-email", formData);
      alert("Email sent successfully");
    } catch (error) {
      alert("Error sending email");
      console.error(error);
    }
  };

  return (
    <Box>
      <TopBar />
      <Box
        w={"60%"}
        mx="auto"
        margin={"auto"}
        mt={5}
        left={"20rem"}
        top={"5rem"}
        position={"absolute"}
      >
        <Text
          color="#4267CF"
          fontSize="30px"
          fontWeight="bold"
          textAlign="center"
        >
          Submit a report
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="message" mb={4}>
            <FormLabel>Write your report here</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              h="250px"
            />
          </FormControl>
          <Box display="flex" justifyContent="center" onClick={handleSubmit}>
            <Button type="submit" color="white" backgroundColor="#4267CF">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Report;
