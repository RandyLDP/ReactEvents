import React from "react";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CalendarIcon, AddIcon } from "@chakra-ui/icons";
import SearchEvent from "./SearchEvent";

const Sidebar = ({ handleSearchChange }) => {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={CalendarIcon} />
          Dashboard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/add-event">
          <ListIcon as={AddIcon} />
          New Event
        </NavLink>
      </ListItem>
    </List>
  );
};

export default Sidebar;
