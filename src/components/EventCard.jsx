import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Center,
  Image,
  Heading,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@chakra-ui/react";

const EventCard = ({ event, getCategoryNames }) => (
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
        <Text>Start Time: {new Date(event.startTime).toLocaleString()}</Text>
        <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
      </Link>
    </CardBody>
    <Divider color="#7FC7D9" />
    <CardFooter>
      <Text>Categories: {getCategoryNames(event.categoryIds)}</Text>
    </CardFooter>
  </Card>
);

export default EventCard;
