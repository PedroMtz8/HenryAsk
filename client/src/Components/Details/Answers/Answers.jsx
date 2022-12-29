import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import showButtons from "../../Home/Paginated/PaginatedButtons/showButtons";
import {
    Flex,
    Text,
    Select,
    Button,
    HStack
} from '@chakra-ui/react'
import AnswerCard from './AnswerCard'

const Answers = ({ dataPost, setDataPost }) => {

    const { user } = useAuth();
    let token = user.accessToken

    const idPost = useParams().id

    const [responseData, setResponseData] = useState({ answersPage: 1, maxPages: 1, answersSort: "score", answersArr: undefined });

    useEffect(() => {

        const getAnswers = async () => {
            const res = await
                axios.get(API_URL + `/answer/post?page=${responseData.answersPage}&sort=${responseData.answersSort}&post_id=${idPost}`, { headers: { Authorization: "Bearer " + token } })

            setResponseData({ ...responseData, answersArr: res.data.foundAnswers, maxPages: res.data.maxPages })}

        getAnswers()

    }, [responseData.answersPage, responseData.answersSort, dataPost]);


    const clickButtonNumbers = (e) => {

        setResponseData({ ...responseData, answersPage: parseInt(e.target.name) })

    }

    const clickSideButtons = (e) => {
        if (responseData.answersPage > 1 && e.target.name === '<') {
            setResponseData({ ...responseData, answersPage: responseData.answersPage - 1 })
        } else if (responseData.answersPage < responseData.maxPages && e.target.name === '>') {
            setResponseData({ ...responseData, answersPage: responseData.answersPage + 1 })
        }
    }

    const mapCards = (arrRes) => {      

       let arr = arrRes.answersArr.map((dataCard, i, arr) => <AnswerCard key={i}
                                answerCardData={dataCard} setDataPost={setDataPost} finish={(i !== arr.length - 1)} />)
        return arr;
    }

    return (
        <>
            <Flex position="relative"
                justifyContent="space-between"
                alignItems="flex-end"
                w="80%"
            >
                <Text color="white">
                    Respuestas: {`(${dataPost.post.numberAnswers})`}
                </Text>
                <Flex position="relative"
                    w="50%"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="1rem">
                    <Flex alignItems="center"
                        justifyContent="flex-end"
                        gap="1rem"
                        w="60%">
                        <Text color="white">
                            ordenar por:
                        </Text>
                        <Select
                            bg="white"
                            borderRadius=".5rem"
                            w="50%"
                            onChange={e => setResponseData({ ...responseData, answersSort: e.target.value })}
                        >
                            <option value={"score"}>Puntuación</option>
                            <option value={"newest"}>Más recientes</option>
                        </Select>
                    </Flex>
                    <Button bg="#FFFF01"
                        p="1rem 2rem">
                        Responder
                    </Button>
                </Flex>
            </Flex>
            {responseData.answersArr !== undefined && responseData.answersArr.length !== 0 ?
                <Flex position="relative"
                    flexDir="column"
                    w="80%"
                    mb="1rem"
                    gap="1rem">
                    <Flex flexDir="column"
                        alignItems="center"
                        minH="10rem"
                        p="1%"
                        bg="#F2F2F2"
                        borderRadius="md"
                        fontWeight="semibold"
                        gap="2%">
                        {mapCards(responseData)}
                    </Flex>
                    <HStack spacing={2} alignSelf="center">
                        <Button name={'<'} onClick={clickSideButtons} > {'<'} </Button>
                        {showButtons(responseData.answersPage, responseData.maxPages).map(
                            (elem, i) => <Button key={i}
                                name={elem}
                                bg={responseData.answersPage !== elem ? "#E2E8F0" : "#FFFF01"}
                                onClick={clickButtonNumbers}
                            >
                                {elem}
                            </Button>
                        )}
                        <Button name={'>'} onClick={clickSideButtons}> {'>'} </Button>
                    </HStack>
                </Flex>
                :
                "loading"}
        </>
    )
}

export default Answers;