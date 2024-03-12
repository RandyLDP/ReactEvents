import React from "react";
import { Input } from "@chakra-ui/react";

const SearchEvent = ({ onSearchChange }) => {
  return (
    <>
      <Input
        htmlSize={10}
        padding="20px"
        width="auto"
        color="blue"
        placeholder="Search Event"
        _placeholder={{ opacity: 0.4, color: "inherit" }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </>
  );
};

export default SearchEvent;
