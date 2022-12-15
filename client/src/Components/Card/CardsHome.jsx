import {useSelector} from 'react-redux';
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import CardHome from "./CardHome";

const CardsHome = () => {

  const currentPosts = useSelector((state) => state.paginated.currentPosts)
  console.log(currentPosts)
  return (
    <SimpleGrid columns={{lg: 1, xl: 2}} spacing={{lg: 10, xl: 5}} gap={3} >
      
      {currentPosts.map((elem, i) => <CardHome key={i} cardData={elem}/>)}
      
    </SimpleGrid>
  );
};

export default CardsHome;
