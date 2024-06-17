// CreateGalleryModal.tsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";

interface CreateGalleryModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, userId: string) => Promise<void>;
}

const CreateGalleryModal: React.FC<CreateGalleryModalProps> = ({ userId, isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await onSubmit(title, description, userId);
    setTitle("");
    setDescription("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Gallery</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={"bold"}>Gallery name</Text>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={4}
          />
          <Text fontWeight={"bold"} marginBottom={"5px"}>What is the date of the event?</Text>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="date"
          />
          <Input
            value={userId}
            hidden={true}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGalleryModal;
