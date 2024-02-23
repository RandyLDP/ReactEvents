import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";

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
    <Box>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <label>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Time
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Time
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            multiple
          />
        </label>
        <Button colorScheme="green" type="submit">
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEventPage;
