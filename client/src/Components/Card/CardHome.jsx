import {
  Grid,
  GridItem,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
  Box
} from "@chakra-ui/react";
import {Link} from 'react-router-dom'
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import moment from "moment"
import { localeData } from 'moment_spanish_locale';
import 'moment/locale/es';

export const formatDate = (date) => {

  const arrDate = date.split('-')

  const arrTime = arrDate[2].split('T')

  return arrTime[1].slice(0, 8) + ' ' + arrTime[0] + '-' + arrDate[1] + '-' + arrDate[0] 

}

const CardHome = ({ cardData }) => {

    moment.updateLocale('es', localeData)
    let dif = moment(cardData.createdAt).startOf('minutes').fromNow()

  return (
    <Card position="relative"
      bg="#F2F2F2"
      p=".8rem"
      w="100%"
      h={"180px"}
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
          <Box  
            w="48px"
            h="48px">

          <Image
            objectFit="cover"
            mt=".8rem"
            w="48px"
            h="48px"
            borderRadius="3rem"
            src={cardData.user?.avatar}
            alt="Caffe Latte"
            />
            </Box>
          <Image w="2.1rem" mt=".5rem"
            src="https://i.postimg.cc/rw0MgSxN/medalla-6.png" alt="userImage" />
        </GridItem >
        <GridItem rowSpan={1} colSpan={7} direction="column">
          <Flex alignItems={"center"} gap=".4rem" fontSize=".75rem" fontWeight="bold">
            <Flex flexDirection={{base: "column", sm: "row", md: "row", lg: "row"}}>

            <Text >
              {`${cardData.user?.userSlack}`}
            </Text>
            <Text>
              {`• ${dif}`}
            </Text>
            </Flex>
            <Image w="1.4rem" alignSelf="flex-start"
              src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
            <Text >
              {cardData.user?.score}
            </Text>
          </Flex>
          <Heading size="sm" h={{base:"20px", sm: "60px", md: "max-content", lg: "max-content"}} overflow="hidden">
            <Link to={`/details/${cardData._id}`}>
              {cardData.title.slice(0, 180)}
              {cardData.title.length > 180? "..." : ""}
            </Link>
          </Heading>
        </GridItem>

        <GridItem rowSpan={1} colSpan={7} display={"flex"} justifyContent="space-between"
          fontSize=".8rem" position={"relative"}  >
            <Flex flexDirection={{base: "column", sm: "row", md: "row", lg: "row"}}
              /* position={"relative"} */
            >
          <Flex justifyContent="center"
            alignItems="center"
            position={"absolute"}
            left={0}
            bottom={{base: 10, sm: 0, md: 0, lg: 0}}
            gap=".5rem">
            {cardData.tags.map((elem, i) =>
              <Box key={i} fontSize={14}
              p=".5rem .5rem"
                variant="solid"
                bgColor="#ffff01">
                {elem}
              </Box>)
            }
          </Flex>
          <Flex justifyContent="center"
            alignItems="center"
            position={"absolute"}
            right={0}
            bottom={-1}
            gap=".5rem">
            <Button variant="outline">
              <ChatIcon marginRight={"3px"} /> Comentarios
            </Button>
            {/* <Button variant="ghost"
              color="white"
              _hover={{
                color: "black",
                bg: "#FFFF01"
              }}
              bg="#272930">
              Responder
            </Button> */}
          </Flex>
                </Flex>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CardHome;