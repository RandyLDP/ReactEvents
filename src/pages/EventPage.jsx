import { Input, Text, Image, Heading, Button, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [editData, setEditData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]); // State to store users data
  const categoriesData = [
    { name: "sports", id: "1" },
    { name: "games", id: "2" },
    { name: "relaxation", id: "3" },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event details");
        const eventData = await response.json();

        // Fetch user details
        const user = usersData.find((user) => user.id === eventData.createdBy);

        if (!user) {
          console.error("User not found for id:", eventData.createdBy);
          throw new Error("User not found");
        }

        eventData.createdBy = user.name;

        setEvent(eventData);
        setEditData(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, usersData]);

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchUsersData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) throw new Error("Failed to fetch users data");
        const userData = await response.json();
        setUsersData(userData);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

  const handleEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setEvent(editData);
        setEditing(false);
        // Show success message
        alert("Event updated successfully");
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      // Show failure message
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Event deleted successfully");
          navigate("/");
        } else {
          throw new Error("Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>No event found.</div>;

  const getCategoryNames = (categoryIds) => {
    if (!categoryIds || categoryIds.length === 0) {
      return "No Categories";
    }

    return categoryIds
      .map((categoryId) => {
        const category = categoriesData.find(
          (cat) => cat.id === categoryId.toString()
        );
        return category ? category.name : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div>
      <h1>{event.title}</h1>
      {editing ? (
        <div>
          <Input
            placeholder="title"
            type="text"
            name="title"
            value={editData.title || ""}
            onChange={handleInputChange}
          />
          <Input
            placeholder="description"
            type="text"
            name="description"
            value={editData.description || ""}
            onChange={handleInputChange}
          />
          <Input
            placeholder="end time"
            type="text"
            name="startTime"
            value={editData.startTime || ""}
            onChange={handleInputChange}
          />
          <Input
            placeholder="start time"
            type="text"
            name="endTime"
            value={editData.endTime || ""}
            onChange={handleInputChange}
          />
          <Input
            placeholder="category"
            type="text"
            name="categoryIds"
            value={editData.categoryIds}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Author"
            type="text"
            name="createdBy"
            value={editData.createdBy}
            onChange={handleInputChange}
          />
          <Button colorScheme="green" onClick={handleSaveEdit}>
            Save Edit
          </Button>
        </div>
      ) : (
        <div>
          <Image src={event.image} />
          <Heading size="medium">{event.title}</Heading>
          <Text>{event.description}</Text>
          <Text>Starts:{new Date(event.startTime).toLocaleString()}</Text>
          <Text>Ends:{new Date(event.endTime).toLocaleString()}</Text>
          <Text>Category:{getCategoryNames()}</Text>
          <Text>Author: {event.createdBy.toString()}</Text>
          <Stack direction="row" spacing={4}>
            <Button colorScheme="green" onClick={handleEdit}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};
