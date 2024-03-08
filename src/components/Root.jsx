import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Grid, GridItem } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Grid
      templateColumns="repeat(6,1fr)"
      bg="green.100"
      bgGradient="linear(to-t, #2564AE, #8CB9E2)"
    >
      <GridItem as="aside" colSpan="1" bg="#365486" minHeight="100vh" p="30px">
        <span>side</span>
      </GridItem>

      <GridItem as="main" colSpan="5" p="40px">
        <Navigation />
        <Outlet />
      </GridItem>
    </Grid>
  );
};
