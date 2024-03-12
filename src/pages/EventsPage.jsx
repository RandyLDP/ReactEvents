import React, { useEffect, useState } from "react";
import {
  Center,
  Checkbox,
  SimpleGrid,
  Heading,
  Text,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SearchEvent from "../components/SearchEvent";

export const EventsPage = () => {
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesData = [
    { name: "sports", id: "1" },
    { name: "games", id: "2" },
    { name: "relaxation", id: "3" },
  ];

  const handleSearchChange = (value) => {
    setSearch(value);
  };

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
    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
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
    <Box display="grid">
      <Heading p="15px" color="whiteAlpha.800">
        List of events
      </Heading>

      <SearchEvent onSearchChange={handleSearchChange} />

      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={4}
        display="flex "
        p="20px"
        alignItems="flex-end"
      >
        <Heading size="small" p="10px">
          {categoriesData.map((category) => (
            <Checkbox
              pr="25px"
              key={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Checkbox>
          ))}
        </Heading>
      </SimpleGrid>

      {/* Displaying the events in a grid */}
      <SimpleGrid columns={4} minChildWidth="300px" spacing="30px">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            bg="#DCF2F1"
            maxW="sm"
            borderTop="8px"
            borderColor="#7FC7D9"
          >
            <CardHeader>
              <Center>
                <Image src={event.image} width="80%" height="140px" />
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
            <Divider color="#7FC7D9" />
            <CardFooter>
              <Text>Categories: {getCategoryNames(event.categoryIds)}</Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
