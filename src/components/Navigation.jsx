import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
export const Navigation = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Menu
      </MenuButton>
      <MenuList>
        <Link to="/">
          <MenuItem>Event List</MenuItem>
        </Link>
        <Link to="/event/1">
          <MenuItem>Event</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};
