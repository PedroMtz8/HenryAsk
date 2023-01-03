import { useState } from 'react'
import {
    Flex,
    Text,
    Image,
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
    const [showComments, setShowComments] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {

        if (numberOfVotesUser !== dataPost.post.user.score) {

            axios.get(API_URL + `/posts/${idPost}`, { headers: { Authorization: "Bearer " + token } })
                .then(res => { setDataPost(res.data) })

        }

    }, [numberOfVotesUser])

    useEffect(() => {
        (commentPage > 0) && getComment()
    }, [commentPage])

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
            w="92%"
            minH="10rem"
            mt="3rem"
            borderRadius="md"
            fontWeight="semibold">
            <Flex position="relative"
                alignItems="flex-start"
                w="100%">
                <Flex w={{ base: '20%', sm: '16%', md: '13%' }}
                    flexDir="column"
                    alignItems="center"
                    pt={{ base: '1.5rem', sm: '1.1rem', md: '.9rem' }}
                    gap="1rem">
                    <Image src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                        w={{ base: '2rem', sm: '3rem', md: '5rem' }}
                        h={{ base: '2rem', sm: '3rem', md: '5rem' }}
                        borderRadius={{ base: '2rem', sm: '3rem', md: '5rem' }}
                    />
                    <Stack fontSize={{ base: '1.2rem', sm: '1.5rem', md: '2rem' }} align="center">
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
                    w={{ base: '80%', sm: '84%', md: '87%' }}
                    minH="14rem"
                    pr="1rem"
                    gap="2rem">
                    <Stack spacing={4}>
                        <Flex gap=".5rem"
                            fontSize={{ base: '.7rem', sm: '.8rem' }}
                            ml="10px"
                            mt="1rem">
                            <Flex gap={{ base: '.1rem', sm: '.3rem' }}
                                flexDir={{ base: 'column', sm: 'row' }}>
                                <Text display={{ base: 'block', sm: 'inline' }}>
                                    {dataPost.post.user.userSlack}
                                </Text>
                                <Text display={{ base: 'none', sm: 'inline' }} >
                                    •
                                </Text>
                                <Text display={{ base: 'block', sm: 'inline' }}>
                                    {formatDate(dataPost.post.createdAt)}
                                </Text>
                            </Flex>
                            <Image w="1.4rem"
                                alignSelf={{ base: 'center', sm: 'flex-start' }}
                                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                            <Text alignSelf={{ base: 'center', sm: 'flex-start' }}>
                                {userScore}
                            </Text>
                        </Flex>
                        <Flex pl="10px">
                            <Text maxH={"10rem"}
                                fontSize={{ base: '1rem', sm: '1.2rem' }}
                                as="h2">
                                {dataPost.post.title}
                            </Text>
                        </Flex>
                        <Editor body={dataPost.post.body} />
                    </Stack>
                    <Flex justifyContent="flex-end">
                        <Flex gap={{ base: '0.5rem', sm: '1rem' }}
                            mr={{ base: '0.2rem', sm: '0rem' }}>
                            {
                                dataPost.post.tags.map((e, i) =>
                                    <Box key={i}
                                        textAlign="center"
                                        bg="#FFFF01"
                                        fontSize={{ base: ".7rem", sm: ".8rem", md: "1rem" }}
                                        borderRadius={".5rem"}
                                        p={{ base: ".2rem .5rem", sm: ".4rem .7rem" }}
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
                justifyContent={"center"}
                w="100%"
                mt=".5rem">
                <Flex justifyContent="space-between"
                    borderTop="solid gray 1px"
                    w={{ base: '94%', md: '98%' }}
                    px="1rem"
                    pt={{ base: '.3rem', sm: '.5rem' }}
                    fontSize={{ base: '.7rem', sm: '1rem' }}>
                    <Flex >
                        {(dataPost.post.numberComments !== 0) ? ((!showComments) ?
                            <Text cursor="pointer"
                                onClick={e => { commentPage === 0 && setCommentPage(1); setShowComments(true) }}>
                                Comentarios: {`(${dataPost.post.numberComments})`} <TriangleDownIcon />
                            </Text>
                            :
                            <Text cursor="pointer"
                                onClick={e => { setShowComments(false) }}>
                                Comentarios: {`(${dataPost.post.numberComments})`} <TriangleUpIcon />
                            </Text>)
                            :
                            null}
                    </Flex>
                    <Flex>
                        <Text color="blue.600"
                            cursor="pointer"
                            onClick={onOpen}>Comentar respuesta</Text>
                        <CreateComment isOpen={isOpen}
                            onClose={onClose}
                            type={"post"}
                            id={idPost}
                        />
                    </Flex>
                </Flex>
            </Flex>
            <Flex position="relative"
                px="0.5rem"
                flexDir="column"
                mt={{ base: '.3rem', sm: '1rem' }}
                lineHeight="1.2rem">
                {(showComments) && postComments.map((elem, i) =>
                    <Flex key={i}
                        w="100%"
                        px="1rem">
                        <Comments dataComment={elem} />
                    </Flex>)
                }
                {
                    (showComments && remainingComments > 0) &&
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

