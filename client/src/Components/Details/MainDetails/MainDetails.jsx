import { useState } from 'react'
import {
    Flex,
    Text,
    Image,
    Heading,
    Box,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import Editor from '../../DetailBody/DetailBody'
import { formatDate } from '../../Card/CardHome'
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import { useParams } from "react-router-dom";
import { useEffect } from 'react'
import Comments from '../Comments/Comments'
import CreateComment from '../Comments/CreateComment'

const MainDetails = ({ dataPost, setDataPost, votingData, setVotingData, userScore }) => {

    const { user } = useAuth();
    let token = user.accessToken;
    const idPost = useParams().id;

    const [numberOfVotesPost, setNumberOfVotes] = useState(parseInt(dataPost.post.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(dataPost.post.user.score))
    const [postComments, setPostComments] = useState([])
    const [commentPage, setCommentPage] = useState(0)
    const [remainingComments, setRemainingComments] = useState(dataPost.post.numberComments)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {

        if (numberOfVotesUser !== dataPost.post.user.score) {

            axios.get(API_URL + `/posts/${idPost}`, { headers: { Authorization: "Bearer " + token } })
                .then(res => { setDataPost(res.data) })

        }

    }, [numberOfVotesUser])

    useEffect(() => { (commentPage > 0) && getComment() }, [commentPage])

    const getComment = async () => {

        const res = await axios.get(API_URL + `/comment/post?post_id=${dataPost.post._id}&page=${commentPage}`,
            { headers: { Authorization: "Bearer " + token } })

        setPostComments([...postComments, ...res.data.comments])
        setRemainingComments(res.data.numberOfCommentsLeft)

    }

    const votePost = async (type) => {

        if (votingData !== type) {
            const res = await
                axios.put(API_URL + `/posts/${type}`, { post_id: idPost }, { headers: { Authorization: "Bearer " + token } })
            setVotingData(type)
            setNumberOfVotes(numberOfVotesPost + type + (votingData !== 0 ? type : 0))
            setNumberOfVotesUser(numberOfVotesUser + type + (votingData !== 0 ? type : 0))

        } else {
            const res = await
                axios.put(API_URL + `/posts/0`, { post_id: idPost }, { headers: { Authorization: "Bearer " + token } })
            setVotingData(0)
            setNumberOfVotes(numberOfVotesPost - type)
            setNumberOfVotesUser(numberOfVotesUser - type)
        }

    }

    return (
        <Flex position="relative"
            flexDir="column"
            bg="#F2F2F2"
            w="80%"
            minH="10rem"
            mt="3rem"
            pt="1%"
            px="1%"
            gap="2%"
            borderRadius="md"
            fontWeight="semibold">
            <Flex position="relative"
                alignItems="flex-start">
                <Flex w="7rem"
                    flexDir="column"
                    alignItems="center"
                    gap="1rem">
                    <Image src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                        w="5rem"
                        h="5rem"
                        borderRadius="5rem"
                    />
                    <Stack fontSize="2rem" align="center">
                        {user.email !== dataPost.post.user.email &&
                            <TriangleUpIcon
                                color={votingData === 1 ? "green" : "gray"}
                                onClick={e => votePost(1)} />
                        }
                        <Text>
                            {numberOfVotesPost}
                        </Text>
                        {user.email !== dataPost.post.user.email &&
                            <TriangleDownIcon
                                color={votingData === -1 ? "red" : "gray"}
                                onClick={e => votePost(-1)} />
                        }
                    </Stack>
                </Flex>
                <Flex flexDir="column"
                    justifyContent="space-between"
                    w="full"
                    minH="14rem"
                    gap="2rem">
                    <Stack spacing={4}>
                        <Flex gap=".5rem" fontSize=".8rem">
                            <Text >
                                {dataPost.post.user.userSlack} • {formatDate(dataPost.post.createdAt)}
                            </Text>
                            <Image w="1.4rem" alignSelf="flex-start"
                                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                            {userScore}
                        </Flex>
                        <Heading fontSize="1.2rem" as="h2">
                            {dataPost.post.title}
                        </Heading>
                        <Editor body={dataPost.post.body} />
                    </Stack>
                    <Flex justifyContent="flex-end">
                        <Flex gap="1rem" mr="2%">
                            {
                                dataPost.post.tags.map((e, i) =>
                                    <Box key={i}
                                        bg="#FFFF01"
                                        p=".4rem .7rem"
                                    >
                                        {e}
                                    </Box>
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex position="relative"
                justifyContent="space-between"
                w="100%"
                borderTop="solid gray 1px"
                mt={".5rem"}
                pt=".5rem"
                px="1rem">
                <Flex>
                    {(remainingComments === dataPost.post.numberComments) ?
                        <Text cursor="pointer"
                            onClick={e => setCommentPage(commentPage + 1)}>
                            Comentarios: {`(${remainingComments})`} <TriangleDownIcon />
                        </Text>
                        :
                        <Text cursor="pointer"
                            onClick={e => { setCommentPage(0); setPostComments([]); setRemainingComments(dataPost.post.numberComments) }}>
                            Comentarios: {`(${dataPost.post.numberComments})`} <TriangleUpIcon />
                        </Text>}
                </Flex>
                <>
                    <Text color="blue.600"
                        cursor="pointer"
                        onClick={onOpen}>Comentar respuesta</Text>
                    <CreateComment isOpen={isOpen}
                        onClose={onClose}
                        type={"post"}
                        id={idPost}
                    />
                </>
            </Flex>
            <Flex position="relative"
                px="0.5rem"
                flexDir="column"
                mt="1rem">
                {postComments.map((elem, i) =>
                    <Flex key={i}
                        w="100%"
                        px="1rem">
                        <Comments dataComment={elem} />
                    </Flex>)
                }
                {
                    (remainingComments !== dataPost.post.numberComments && remainingComments > 0) &&
                    <Flex color="blue.500"
                         px="1rem"
                          pb="1rem">
                        <Text 
                        cursor="pointer"
                         onClick={e => setCommentPage(commentPage + 1)}>
                            Ver más
                        </Text>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}

export default MainDetails;

