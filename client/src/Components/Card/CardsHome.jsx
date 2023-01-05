import { useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
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
    <Flex justifyContent={'center'} width='100%'>
      {
        widthScreen > 1120
          ?
          <>
            {
              (currentPosts.length <= 0)
                ?
                <Flex position="relative" w="80%" minH="12rem" justifyContent="center" alignItems="center">
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: '.rem', md: "1rem", lg: "1.2rem", xl: '1.5rem' }}
                    textAlign="center"
                    bg="#F2F2F2"
                    p="1rem 2rem"
                    color="#1F1F1F"
                    borderRadius={6}>
                    Lo sentimos, no existe publicación que coincida con su búsqueda
                  </Text>
                </Flex>
                :
                <SimpleGrid columns={2} spacing={5} w={{ base: '90%', lg: '70%' }}>
                  {currentPosts.map((elem, i) => <CardHome key={i} cardData={elem} />)}
                </SimpleGrid>
            }
          </>
          :
          <>
            {(currentPosts.length <= 0)
              ?
              <Flex position="relative" w="80%" minH="12rem" justifyContent="center" alignItems="center">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: '.rem', md: "1rem", lg: "1.2rem", xl: '1.5rem' }}
                  textAlign="center"
                  bg="#F2F2F2"
                  p="1rem 2rem"
                  color="#1F1F1F"
                  borderRadius={6}>
                  Lo sentimos, no existe publicación que coincida con su búsqueda
                </Text>
              </Flex>
              :
              <Flex flexDir="column"
                alignItems="center"
                gap="1rem"
                w={{ base: "100%", sm: "95%", md: "90%", lg: "85%" }}
                bg={"red"}>
                {currentPosts.map((elem, i) => <CardHome key={i} cardData={elem} />)}
              </Flex>
            }
          </>

      }
    </Flex>
  );
};

export default CardsHome;
