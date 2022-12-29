import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Grid,
    GridItem,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import Comments from '../Comments/Comments';
import DetailBody from '../../DetailBody/DetailBody';

const AnswerCard = ({ answerCardData, setDataPost, finish }) => {

    const { user } = useAuth();
    let token = user.accessToken
    const idPost = useParams().id;

    console.log(answerCardData)
    console.log(user)

    const [numberOfVotesAnswerd, setNumberOfVotesAnswerd] = useState(parseInt(answerCardData.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(answerCardData.user.score))
    const [currentVote, setCurrentVote] = useState(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)
    const [commentAnswers, setCommentAnswers] = useState([])
    const [commentPage, setCommentPage] = useState(0)

    useEffect(() => {

        setNumberOfVotesAnswerd(parseInt(answerCardData.score))
        setNumberOfVotesUser(parseInt(answerCardData.user.score))
        setCurrentVote(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)

    }, [answerCardData])

    useEffect(() => {

        if (numberOfVotesUser !== parseInt(answerCardData.user.score)) {
            axios.get(API_URL + `/posts/${idPost}`, { headers: { Authorization: "Bearer " + token } })
                .then(res => { setDataPost(res.data) })
        }

    }, [numberOfVotesUser])

    useEffect(() => { (commentPage > 0) && getComment() }, [commentPage])

    const voteAnswer = async (type) => {

        const res = await
            axios.put(API_URL + `/answer/${type}`, { answer_id: answerCardData._id }, { headers: { Authorization: "Bearer " + token } })
        setNumberOfVotesAnswerd(res.data.voteAnswer)
        setNumberOfVotesUser(res.data.authorScore)
        setCurrentVote(type)
    }

    const getComment = async () => {

        const res = await axios.get(API_URL + `/comment/answer?answer_id=${answerCardData._id}&page=${commentPage}`, { headers: { Authorization: "Bearer " + token } })
        setCommentAnswers([...commentAnswers, ...res.data.comments])

    }

    return (
        <>
            <Grid position="relative"
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(8, 1fr)'
                p=".8rem"
                boxSize="100%"
                gap="1rem">
                <GridItem rowSpan={2} colSpan={1} align="center" >
                    <Image
                        objectFit="cover"
                        mt=".8rem"
                        w="5rem"
                        h="5rem"
                        borderRadius="5rem"
                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                    />
                    <Image w="2.1rem" mt=".5rem"
                        src="https://i.postimg.cc/rw0MgSxN/medalla-6.png" alt="userImage" />
                </GridItem >
                <GridItem rowSpan={2} colSpan={6} direction="column">
                    <Flex alignItems="center"
                        gap=".4rem"
                        fontSize=".75rem"
                        fontWeight="bold">
                        <Text >
                            {`${answerCardData.user.userSlack} • ${answerCardData.createdAt}`}
                        </Text>
                        <Image w="1.4rem" alignSelf="flex-start"
                            src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                        <Text >
                            {numberOfVotesUser}
                        </Text>
                    </Flex>
                    <DetailBody body={answerCardData.body} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} align="center"
                    fontSize="2rem">
                    {/* {user.email !== dataPost.post.user.email &&
                        <TriangleUpIcon
                            color={votingData === 1 ? "green" : "gray"}
                            onClick={e => currentVote === 1 ? voteAnswer(0) : voteAnswer(1)} />

                    } */}
                    <TriangleUpIcon
                        color={currentVote === 1 ? "green" : "gray"}
                        onClick={e => currentVote === 1 ? voteAnswer(0) : voteAnswer(1)} />
                    <Text>{numberOfVotesAnswerd}</Text>
                    <TriangleDownIcon
                        color={currentVote === -1 ? "red" : "gray"}
                        onClick={e => currentVote === -1 ? voteAnswer(0) : voteAnswer(-1)} />
                </GridItem>
            </Grid>
            <Flex position="relative"
                flexDir="column"
                alignItems="center"
                w="93%"
                gap=".3rem"
                borderBottom={finish ? "solid 1px" : ""}
                borderBottomColor="gray.800">
                {
                    commentAnswers.map((elem, i, arr) =>
                        <Flex key={i} w="100%">
                            <Comments dataComment={elem} />
                        </Flex>)
                }
                <Flex w="100%" justifyContent="space-between">
                    <Flex>
                        {((answerCardData.numberComments - commentPage * 5) > 0) &&
                            <Text fontSize=".8rem"
                                color="gray.600"
                                onClick={e => setCommentPage(commentPage + 1)}>
                                + comentarios {` (${answerCardData.numberComments - commentPage * 5})`}
                            </Text>}
                    </Flex>
                    <Text color="blue.600">
                        Comentar respuesta
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default AnswerCard;