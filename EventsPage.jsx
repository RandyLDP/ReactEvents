import React, { useEffect, useState } from "react";
import {
  Center,
  SimpleGrid,
  Checkbox,
  Heading,
  Box,
  Text,
  Image,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const EventsPage = () => {
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesData = [
    { name: "sports", id: "1" },
    { name: "games", id: "2" },
    { name: "relaxation", id: "3" },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const events = await response.json();

        if (!ignore) {
          setEventList(events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    return () => {
      ignore = true;
    };
  }, []);

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

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleAddEvent = () => {
    navigate("/add-event");
  };

  const filteredEvents = eventList.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      (event.categoryIds &&
        event.categoryIds.some((id) =>
          selectedCategories.includes(id.toString())
        ));

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Heading>List of events</Heading>
      <Button onClick={handleAddEvent}>Add Event</Button>
      <Input
        htmlSize={10}
        width="auto"
        color="tomato"
        placeholder="Search Event"
        _placeholder={{ opacity: 0.4, color: "inherit" }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories filter checkboxes */}
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        <Heading size="small">
          {categoriesData.map((category) => (
            <Checkbox
              key={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Checkbox>
          ))}
        </Heading>
      </SimpleGrid>

      <SimpleGrid minChildWidth="180px" spacing="40px">
        {filteredEvents.map((event) => (
          <Box key={event.id}>
            <Card maxW="sm">
              <CardHeader>
                <Center>
                  <Image src={event.image} width="160px" height="140px" />
                </Center>
              </CardHeader>
              <CardBody>
                <Link to={`/event/${event.id}`}>
                  <Heading size="md">{event.title}</Heading>
                  <Text>{event.description}</Text>
                  <Text>
                    Start Time: {new Date(event.startTime).toLocaleString()}
                  </Text>
                  <Text>
                    End Time: {new Date(event.endTime).toLocaleString()}
                  </Text>
                </Link>
              </CardBody>
              <CardFooter>
                <Text>Categories:{getCategoryNames(event.categoryIds)}</Text>
              </CardFooter>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
