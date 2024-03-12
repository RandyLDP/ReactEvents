import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  FormLabel,
  FormControl,
  Textarea,
  Input,
} from "@chakra-ui/react";

const AddEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    image: "null",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const imageUrl = new FileReader();

      imageUrl.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: imageUrl.result,
        }));
      };

      imageUrl.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      navigate("/");
      alert("event created");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Box maxW="480px">
      <Form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <FormControl isRequired mb="40px">
          <FormLabel>
            Title
            <Input
              placeholder="Event name"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel>
            Event Description
            <Textarea
              placeholder="Enter a description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormLabel>
        </FormControl>
        <FormControl mb="40px">
          <FormLabel>
            Starts
            <Input
              placeholder="Select Date and Time"
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </FormLabel>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>
            Ends
            <Input
              placeholder="Select Date and Time"
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </FormLabel>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Add Image</FormLabel>

          <Input
            colorScheme="blue"
            type="file"
            name="image"
            onChange={handleInputChange}
            multiple
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Add Event
        </Button>
      </Form>
    </Box>
  );
};

export default AddEventPage;
