import { CalendarIcon, AddIcon, Search2Icon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
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
      <ListItem>
        <NavLink to="/">
          <ListIcon as={Search2Icon} />
          Search
        </NavLink>
      </ListItem>
    </List>
  );
}
