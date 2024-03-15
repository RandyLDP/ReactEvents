import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import CategoryFilter from "../components/CategoryFilter";
import EventCard from "../components/EventCard";
import SearchEvent from "../components/SearchEvent";

export const EventsPage = () => {
  const [eventList, setEventList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesData = [
    { name: "sports", id: "1" },
    { name: "games", id: "2" },
    { name: "relaxation", id: "3" },
  ];

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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredEvents = eventList.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

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
      <SearchEvent onSearch={handleSearch} />
      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={4}
        display="flex "
        p="20px"
        alignItems="flex-end"
      >
        <CategoryFilter
          categoriesData={categoriesData}
          selectedCategories={selectedCategories}
          handleCategorySelect={handleCategorySelect}
        />
      </SimpleGrid>

      {/* Displaying the events in a grid */}
      <SimpleGrid columns={4} minChildWidth="300px" spacing="30px">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            getCategoryNames={getCategoryNames}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
