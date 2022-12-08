import { Grid, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import CardHome from "./CardHome";

const CardsHome = () => {
  return (
    <SimpleGrid columns={2} spacing={5}>
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
      <CardHome />
    </SimpleGrid>
  );
};

export default CardsHome;
