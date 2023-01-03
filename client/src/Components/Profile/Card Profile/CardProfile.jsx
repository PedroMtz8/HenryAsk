import {
    Grid,
    GridItem,
    Card,
    Flex,
    Image,
    Text,
    Box
  } from "@chakra-ui/react";
  import { Link } from 'react-router-dom'
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
  
  const CardHome = ({ cardData, isQuestion }) => {
    moment.updateLocale('es', localeData)
    let dif = moment(cardData.createdAt).startOf('minutes').fromNow()
    
    return (
      <Card position="relative"
        bg="#F2F2F2"
        p=".8rem"
        w="100%"
        
        overflow="hidden"
        variant="outline"
        boxShadow="dark-lg"
      >
        <Grid templateRows={{base:'min-content min-content min-content'}}
          templateColumns='min-content repeat(2, 1fr)'
          boxSize="100%"
          columnGap={'1rem'}
          gap={'5px'}
        >
          <GridItem gridArea={'1 / 1 / 2 / 4'} justifySelf='flex-start'>
            <Flex display='flex' flexDirection='column' alignItems='flex-start' gap=".4rem" fontSize=".75rem" fontWeight="bold">
                <Flex display='flex' gap=".4rem">
                <Text>
                  {`${dif} •`}
                </Text>
                <Image w="1.4rem" alignSelf="flex-start"
                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                <Text >
                {cardData.score}
                </Text>
                </Flex>
            </Flex>
          </GridItem >
          <GridItem gridArea={'2 / 1 / 3 / 4'} justifySelf='flex-start' display={'flex'} flexWrap='wrap' >
          <Text 
          style={{'WebkitBoxOrient': 'vertical', 'WebkitLineClamp': 4}}
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
                { isQuestion ? cardData.title : cardData.post.title}
              </Link>
            </Text>
          </GridItem>
         {isQuestion ? 
          <GridItem gridArea={'3 / 1 / 4 / 2'}>
          <Flex display='flex' gap={'5px'} justifyContent='center' alignItems='center' mt={'5px'}>
            <Text>{cardData.numberAnswers}</Text>
            <ChatIcon marginRight={"3px"} /> 
          </Flex>
        </GridItem>
        : null}
          {isQuestion ?
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
          : null}
        </Grid>
      </Card>
  );
  };
  
  export default CardHome; 