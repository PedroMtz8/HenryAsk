import {
  Grid,
  GridItem,
  Card,
  Flex,
  Image,
  Text,
  Box,
  Tooltip
} from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import moment from "moment"
import { localeData } from 'moment_spanish_locale';
import 'moment/locale/es';
import Admin from "../../assets/Rol Images/Administrador.png"
import Graduate from "../../assets/Rol Images/Graduate.png"
import Student from "../../assets/Rol Images/Students.png"
import HeroOrTA from "../../assets/Rol Images/Hero,TA.png"
import { useEffect, useState } from "react";

const CardHome = ({ cardData }) => {

  moment.updateLocale('es', localeData)
  let dif = moment(cardData.createdAt).startOf('minutes').fromNow()
  const [rolImg, setRolImg] = useState()
  useEffect(() => {
    if (cardData.user.rol === "Henry Hero") setRolImg(HeroOrTA)
    if (cardData.user.rol === "TA") setRolImg(HeroOrTA)
    if (cardData.user.rol === "Administrador") setRolImg(Admin)
    if (cardData.user.rol === "Estudiante") setRolImg(Student)
    if (cardData.user.rol === "Graduado") setRolImg(Graduate)
  }, [])

  return (
    <Card position="relative"
      bg="#F2F2F2"
      p=".8rem"
      w="100%"

      overflow="hidden"
      variant="outline"
      boxShadow="dark-lg"
    >
      <Grid templateRows={{ base: 'min-content min-content min-content' }}
        templateColumns='min-content repeat(2, 1fr)'
        boxSize="100%"
        columnGap={'1rem'}
        gap={'5px'}
      >
        <GridItem gridArea={'1 / 1 / 2 / 2'} justifySelf='center'>
          <Box
            w="48px"
            h="48px">

            <Image
              objectFit="cover"
              w="48px"
              h="48px"
              borderRadius="3rem"
              src={cardData.user?.avatar}
              alt="userImage"
            />
          </Box>
        </GridItem >
        <GridItem gridArea={'2 / 1 / 3 / 2'} justifySelf='center'>
          <Image w="2.2rem"
            src={rolImg} alt="rolImage" />
        </GridItem >
        <GridItem gridArea={'1 / 2 / 2 / 4'} justifySelf='flex-start'>
          <Flex display='flex' flexDirection='column' alignItems='flex-start' gap=".4rem" fontSize=".75rem" fontWeight="bold">
            <Text fontSize={{base: '11px', sm: '12px'}}>
              {`${cardData.user?.userSlack}`}
            </Text>
            <Flex display='flex' gap=".4rem">
              <Text cursor="pointer" fontSize={{base: '11px', sm: '12px'}}>
                <Tooltip label={new Date(cardData.createdAt).toLocaleString()}
                  placement='top'>
                  {`${dif} •`}
                </Tooltip>
              </Text>
              <Image w="1.4rem" alignSelf="flex-start"
                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
              <Text fontSize={{base: '11px', sm: '12px'}}>
                {cardData.score} • {cardData.module}
              </Text>
            </Flex>
          </Flex>
        </GridItem >
        <GridItem gridArea={'2 / 2 / 3 / 4'} justifySelf='flex-start' display={'flex'} flexWrap='wrap' >
          <Text
            style={{ 'WebkitBoxOrient': 'vertical', 'WebkitLineClamp': 4 }}
            fontSize={'17px'}
            fontWeight={700}
            wordBreak='break-word'
            display={'-webkit-box'}
            margin='0 auto'
            lineHeight={1.4}
            overflow='hidden'
            textOverflow={'ellipsis'}
          >
            <Link to={`/home/post/${cardData._id}`}>
              {cardData.title}
            </Link>
          </Text>
        </GridItem>

        <GridItem gridArea={'3 / 1 / 4 / 2'}>
          <Flex display='flex' gap={'5px'} justifyContent='center' alignItems='center' mt={'5px'}>
            <Text>{cardData.numberAnswers}</Text>
            <ChatIcon marginRight={"3px"} />
          </Flex>
        </GridItem>
        <GridItem gridArea={'3 / 2 / 4 / 4'}>
          <Flex
            justifyContent="flex-start"
            alignItems="flex-start"
            columnGap={'15px'}
            rowGap={'5px'}
            flexWrap={'wrap'}
          >
            {cardData.tags.map((elem, i) =>
              <Box key={i} fontSize={14}
                p=".5rem .5rem"
                variant="solid"
                bgColor="#ffff01">
                {elem}
              </Box>)
            }
          </Flex>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CardHome; 