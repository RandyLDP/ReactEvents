import React from "react";
import { InputGroup, InputLeftElement, Input, Icon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchEvent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={Search2Icon} color="gray.300" />
      </InputLeftElement>

      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export default SearchEvent;
