import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  Heading,
  Spacer,
} from "@chakra-ui/react";
export const Navigation = () => {
  return (
    <Flex display="flex" alignItems="flex-end">
      <Heading as="h2">Winc's Events</Heading>
      <Spacer />
      <HStack spacing="15px">
        <Breadcrumb fontWeight="medium" fontSize="m" color="white">
          <BreadcrumbItem>
            <BreadcrumbLink borderBottom="1px solid blue" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
    </Flex>
  );
};
