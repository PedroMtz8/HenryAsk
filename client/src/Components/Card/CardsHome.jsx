import { useSelector } from 'react-redux';
import { Flex } from "@chakra-ui/react";
import React from "react";
import CardHome from "./CardHome";
import { SimpleGrid } from '@chakra-ui/react';
import {
  useWindowWidth,
} from '@react-hook/window-size'

const CardsHome = () => {
  const widthScreen = useWindowWidth()
  const currentPosts = useSelector((state) => state.paginated.currentPosts)

  return (
    <Flex justifyContent={'center'}>
     {widthScreen > 1120
    ? <SimpleGrid columns={2} spacing={5} w={{ base: '90%', lg: '70%' }}>
        {currentPosts.map((elem, i) => <CardHome key={i} cardData={elem} />)}
      </SimpleGrid>
    : <Flex flexDir="column"
    alignItems="center"
    gap="1rem"
    w={{base: "100%", sm: "95%", md: "90%", lg: "85%"}} >
      {currentPosts.map((elem, i) => <CardHome key={i} cardData={elem} />)}

  </Flex>}
    </Flex>
  );
};

export default CardsHome;
