import React from 'react'
import { Center, Box, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../AuthComponents/AuthContext';
import { getUserQuestions } from "../../../slices/userSlice";
import { useDispatch } from 'react-redux';

function QuestionPaginated({data}) {
    const dispatch = useDispatch()
    const { user } = useAuth();
    const [page, setPage] = useState(1)
    const [disabledNext, setDisabledNext] = useState(false)
    const [disabledPrev, setDisabledPrev] = useState(true)

    useEffect(() => {
        let disabledPrev = false
        let disabledNext = false
        if(page <= 1) disabledPrev = true
        if(page >= data.maxPages) disabledNext = true
        setDisabledNext(disabledNext)
        setDisabledPrev(disabledPrev)
        dispatch(getUserQuestions(user.accessToken, user.uid, page));
    }, [page])

    const nextPage = () => {
        setPage(page + 1)
    }
    
    const prevPage = () => {
        setPage(page - 1)
    }
    

  return (
    <Center>
        {data.maxPages > 1 ? (
            <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            gap={3}
            mb='15px'
            position='absolute'
            bottom={'0px'}
            >
            <Button
                onClick={prevPage}
                fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                bg={"#FFFF01"}
                disabled={disabledPrev}
                _disabled={{bg: '#F2F2F2'}}
                paddingInlineStart={{base: '0.5rem', sm: '1rem'}}
                paddingInlineEnd={{base: '0.5rem', sm: '1rem'}}
            >
                ANTERIOR
            </Button>
            ,
            <Text
                fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                width={{base: '15%', sm: 'fit-content'}}
                color={"white"}
            >
                {page} de {data.maxPages}
            </Text>
            ,
            <Button
                onClick={nextPage}
                fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                bg={"#FFFF01"}
                disabled={disabledNext}
                _disabled={{bg: '#F2F2F2'}}
                paddingInlineStart={{base: '0.5rem', sm: '1rem'}}
                paddingInlineEnd={{base: '0.5rem', sm: '1rem'}}
            >
                SIGUIENTE
            </Button>
            </Box>
        ) : null}
    </Center>
  )
}

export default QuestionPaginated