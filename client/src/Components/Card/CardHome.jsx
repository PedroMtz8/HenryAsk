import {
  Grid,
  GridItem,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text
} from "@chakra-ui/react";
import {Link} from 'react-router-dom'
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";

export const formatDate = (date) => {

  const arrDate = date.split('-')

  const arrTime = arrDate[2].split('T')

  return arrTime[1].slice(0, 8) + ' ' + arrTime[0] + '-' + arrDate[1] + '-' + arrDate[0] 

}

const CardHome = ({ cardData }) => {

  return (
    <Card position="relative"
      bg="#F2F2F2"
      p=".8rem"
      w="100%"
      h={["14rem", "13rem", "12rem", "11rem", "10rem"]}
      overflow="hidden"
      variant="outline"
      boxShadow="dark-lg"
    >
      <Grid templateRows='repeat(2, 1fr)'
        templateColumns='repeat(8, 1fr)'
        boxSize="100%"
        gap="1rem"
      >
        <GridItem rowSpan={2} colSpan={1} align={"center"} >
          <Image
            objectFit="cover"
            mt=".8rem"
            w="3rem"
            h="3rem"
            borderRadius="3rem"
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
          <Image w="2.1rem" mt=".5rem"
            src="https://i.postimg.cc/rw0MgSxN/medalla-6.png" alt="userImage" />
        </GridItem >
        <GridItem rowSpan={1} colSpan={7} direction="column">
          <Flex alignItems={"center"} gap=".4rem" fontSize=".75rem" fontWeight="bold">
            <Text >
              {`${cardData.user?.userSlack} • ${formatDate(cardData.createdAt)}`}
            </Text>
            <Image w="1.4rem" alignSelf="flex-start"
              src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
            <Text >
              {cardData.user?.score}
            </Text>
          </Flex>
          <Heading size="sm">
            <Link to={`/details/${cardData._id}`}>
              {cardData.title.slice(0, 180)}
              {cardData.title.length > 180? "..." : ""}
            </Link>
          </Heading>
        </GridItem>

        <GridItem rowSpan={1} colSpan={7} display={"flex"} justifyContent="space-between"
          fontSize=".8rem">
          <Flex justifyContent="center"
            alignItems="center"
            gap=".5rem">
            {cardData.tags.map((elem, i) =>
              <Button key={i}
                p=".5rem .5rem"
                variant="solid"
                bgColor="#ffff01">
                {elem}
              </Button>)
            }
          </Flex>
          <Flex justifyContent="center"
            alignItems="center"
            gap=".5rem">
            <Button variant="outline">
              <ChatIcon marginRight={"3px"} /> Comentarios
            </Button>
            <Button variant="ghost"
              color="white"
              _hover={{
                color: "black",
                bg: "#FFFF01"
              }}
              bg="#272930">
              Responder
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CardHome;