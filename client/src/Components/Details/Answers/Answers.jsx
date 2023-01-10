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
    HStack,
    Heading,
    useMediaQuery,
    Skeleton
} from '@chakra-ui/react'
import AnswerCard from './AnswerCard'
import AnswerEditor from "./AnswerEditor";
import { useRef } from "react";

const Answers = ({ dataPost, setDataPost }) => {

    const [largerThan600px] = useMediaQuery('(min-width: 600px)')
    const [largerThan460px] = useMediaQuery('(min-width: 460px)')

    function id() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const { user } = useAuth();
    let token = user.accessToken
    const form = useRef(null)
    const button = useRef(null)

    const idPost = useParams().id
    const [loading, setLoading] = useState(true)

    const [responseData, setResponseData] = useState({ answersPage: 1, maxPages: 1, answersSort: "score", answersArr: undefined });

    useEffect(() => {
        setLoading(true)
        const getAnswers = async () => {
            const res = await
                axios.get(API_URL + `/answer/post?page=${responseData.answersPage}&sort=${responseData.answersSort}&post_id=${idPost}`, { headers: { Authorization: "Bearer " + token } })
            setResponseData({ ...responseData, answersArr: res.data.foundAnswers, maxPages: res.data.maxPages })
            setLoading(false)
        }

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

        let arr = arrRes.answersArr?.map((dataCard, i, arr) =>
            <AnswerCard key={id()}
                answerCardData={dataCard}
                setDataPost={setDataPost}
                finish={(i !== arr.length - 1)}
                loading={loading}
                setLoading={setLoading} />)
        return arr;
    }

    return (
        <>
            <Flex position="relative"
                justifyContent="space-between"
                alignItems={largerThan600px ? "center" : 'flex-end'}
                w="92%"
            >
                <Flex flexDirection={largerThan460px ? 'row' : 'column'}>
                <Text color="white" position={'relative'}>
                    Respuestas: {`(${dataPost.post.numberAnswers})`}
                </Text>
                {!largerThan460px ? <Button bg="#FFFF01"
                        fontSize={largerThan600px ? '16px' : '.8rem'}
                        p="1rem 2rem"
                        onClick={() => form.current.scrollIntoView({ block: 'end', behavior: 'smooth' })}
                        ref={button}>
                        Responder
                    </Button>
                    : null}
                </Flex>
                <Flex position="relative"
                    justifyContent="flex-end"
                    alignItems={largerThan600px ? "center" : 'flex-end'}
                    gap="1rem"
                    >
                    <Flex alignItems={largerThan600px ? "center" : 'flex-start'}
                        justifyContent="flex-end"
                        gap={largerThan600px ? "1rem" : '0'}
                        flexDirection={largerThan600px ? 'row' : 'column'}
                        >
                        <Text color="white">
                            ordenar por:
                        </Text>
                        <Select
                            bg="white"
                            borderRadius=".5rem"
                            w={'fit-content'}
                            onChange={e => setResponseData({ ...responseData, answersSort: e.target.value })}
                        >
                            <option value={"score"}>Puntuación</option>
                            <option value={"newest"}>Más recientes</option>
                        </Select>
                    </Flex>
                    {largerThan460px ? <Button bg="#FFFF01"
                        fontSize={largerThan600px ? '16px' : '.8rem'}
                        p="1rem 2rem"
                        onClick={() => form.current.scrollIntoView({ block: 'end', behavior: 'smooth' })}
                        ref={button}>
                        Responder
                    </Button>
                    : null}
                </Flex>
            </Flex>
                <Flex position="relative"
                    flexDir="column"
                    w="92%"
                    gap="1rem" hidden={loading}>
                    <Flex flexDir="column"
                        alignItems="center"
                        borderRadius="md"
                        fontWeight="semibold"
                        gap="1rem">
                        {mapCards(responseData)}
                    </Flex>
                </Flex>
                <Flex flexDirection={'column'} gap='1rem' w='100%' hidden={!loading} justify='center' align={'center'}>
                <Skeleton startColor='gray' endColor='#FFFFFF' w={'92%'} h='250px' borderRadius={'0.375rem'}/>
                <Skeleton startColor='gray' endColor='#FFFFFF' w={'92%'} h='250px' borderRadius={'0.375rem'}/>
                <Skeleton startColor='gray' endColor='#FFFFFF' w={'92%'} h='250px' borderRadius={'0.375rem'}/>
                <Skeleton startColor='gray' endColor='#FFFFFF' w={'92%'} h='250px' borderRadius={'0.375rem'}/>
                <Skeleton startColor='gray' endColor='#FFFFFF' w={'92%'} h='250px' borderRadius={'0.375rem'}/>
                </Flex>
                {responseData.answersArr?.length ? <HStack spacing={2} alignSelf="center">
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
                </HStack> : <Text fontWeight="bold"fontSize="2xl" textAlign="center" color='yellow' w='92%'>Todavía no se ha publicado ninguna respuesta</Text>}
            <Flex position="relative"
                justifyContent="space-between"
                alignItems="flex-end"
                w="92%">
                <Heading color="white" size={'md'} fontWeight='normal'>Tu respuesta</Heading>
            </Flex>
            <AnswerEditor post_id={idPost} responseData={responseData} setResponseData={setResponseData} token={token} scrollFrom={form} scrollTo={button} />

        </>
    )
}

export default Answers;