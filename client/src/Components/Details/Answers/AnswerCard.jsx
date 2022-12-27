import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Grid,
    GridItem,
    Flex,
    Heading,
    Image,
    Text
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"

const AnswerCard = ({ answerCardData, setDataPost }) => {

    const { user } = useAuth();
    let token = user.accessToken
    const idPost = useParams().id;
    
    const [numberOfVotesAnswerd, setNumberOfVotesAnswerd] = useState(parseInt(answerCardData.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(answerCardData.user.score))
    const [currentVote, setCurrentVote] = useState(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)

    useEffect(() => {

        setNumberOfVotesAnswerd(parseInt(answerCardData.score))
        setNumberOfVotesUser(parseInt(answerCardData.user.score))
        setCurrentVote(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)

    }, [answerCardData])

    useEffect(() => {

        if(numberOfVotesUser !== parseInt(answerCardData.user.score)) {
            axios.get(API_URL + `/posts/${idPost}`, { headers: { Authorization: "Bearer " + token } })
                .then(res => { setDataPost(res.data) })
        }

    }, [numberOfVotesUser])

    const voteAnswer = async (type) => {

        const res = await
                axios.put(API_URL + `/answer/${type}`, { answer_id: answerCardData._id }, { headers: { Authorization: "Bearer " + token } })
                setNumberOfVotesAnswerd(res.data.voteAnswer)
                setNumberOfVotesUser(res.data.authorScore)
                setCurrentVote(type)
    }

    return (
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
                <Heading size="sm">
                    {answerCardData.title}
                </Heading>
                <Text>
                    {answerCardData.body}
                </Text>
            </GridItem>
            <GridItem rowSpan={2} colSpan={1} align="center"
                fontSize="2rem">
                <TriangleUpIcon
                            color={currentVote === 1 ? "green" : "gray"}
                            onClick={e => currentVote === 1 ? voteAnswer(0) : voteAnswer(1)} />
                <Text>{numberOfVotesAnswerd}</Text>
                <TriangleDownIcon
                            color={currentVote === -1 ? "red" : "gray"}
                            onClick={e => currentVote === -1 ? voteAnswer(0) : voteAnswer(-1)} />
            </GridItem>
        </Grid>
    )
}

export default AnswerCard;