import {useSelector} from 'react-redux';
import { Flex } from "@chakra-ui/react";
import React from "react";
import CardHome from "./CardHome";

const CardsHome = () => {

  const currentPosts = useSelector((state) => state.paginated.currentPosts)
  
  return (
    <Flex flexDir="column"
          alignItems="center"
          gap="1rem"
          w={{base: "100%", sm: "95%", md: "90%", lg: "85%"}} >
      
      {currentPosts.map((elem, i) => <CardHome key={i} cardData={elem}/>)}
      
    </Flex>
  );
};

export default CardsHome;
