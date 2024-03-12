import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export const Root = () => {
  return (
    <Grid
      templateColumns="repeat(6,1fr)"
      bg="green.100"
      bgGradient="linear(to-t, #2564AE, #8CB9E2)"
      height="100vh"
    >
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        bg="#365486"
        minHeight={{ lg: "100vh" }}
        p={{ base: "20px", lg: "30px" }}
      >
        <Sidebar />
      </GridItem>

      <GridItem
        as="main"
        colSpan={{ base: 6, lg: 4, xl: 5 }}
        p={{ base: "20px", lg: "30px" }}
      >
        <Navigation />
        <Outlet />
      </GridItem>
    </Grid>
  );
};
