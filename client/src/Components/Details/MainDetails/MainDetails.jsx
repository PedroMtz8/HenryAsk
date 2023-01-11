import { useState } from 'react'
import {
    Flex,
    Text,
    Image,
    Box,
    Spinner,
    useDisclosure,
    useMediaQuery,
    Grid,
    GridItem,
    Tooltip,
    Button,
    Modal,
    Skeleton,
    useToast
} from '@chakra-ui/react'
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import { useParams } from "react-router-dom";
import { useEffect } from 'react'
import Comments from '../Comments/Comments'
import CreateComment from '../Comments/CreateComment'
import DetailBody from '../../DetailBody/DetailBody'
import EditQuestionModal from '../../Modals/EditQuestionModal';
import moment from "moment"
import { localeData } from 'moment_spanish_locale';
import 'moment/locale/es';
import Admin from "../../../assets/Rol Images/Administrador.png";
import Graduate from "../../../assets/Rol Images/Graduate.png";
import Student from "../../../assets/Rol Images/Students.png";
import HeroOrTA from "../../../assets/Rol Images/Hero,TA.png";

const MainDetails = ({ dataPost }) => {

    const [largerThan575px] = useMediaQuery('(min-width: 575px)')
    moment.updateLocale('es', localeData)

    const { user } = useAuth();
    let token = user.accessToken;
    const idPost = useParams().id;
    const [dif, setDif] = useState(moment(dataPost.post.createdAt).startOf('seconds').fromNow())
    const [numberOfVotesPost, setNumberOfVotesPost] = useState(parseInt(dataPost.post.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(dataPost.post.user.score))
    const [currentVote, setCurrentVote] = useState(Object.keys(dataPost.post.voters).includes(user.uid) ? parseInt(dataPost.post.voters[user.uid]) : 0)
    const [postComments, setPostComments] = useState([])
    const [commentPage, setCommentPage] = useState(0)
    const [remainingComments, setRemainingComments] = useState(dataPost.post.numberComments)
    const [showComments, setShowComments] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rolImg, setRolImg] = useState();
    const [commentsLoading, setCommentLoading] = useState(false)
    const [voteLoading, setVoteLoading] = useState(false)
    const [postLoading, setPostLoading] = useState(true)
    const toast = useToast()

    useEffect(() => {
        (commentPage > 0) && setCommentLoading(true);
        (commentPage > 0) && getComment()
    }, [commentPage])

    useEffect(() => {
        if (dataPost.post.user.rol === "Henry Hero") setRolImg(HeroOrTA);
        if (dataPost.post.user.rol === "TA") setRolImg(HeroOrTA);
        if (dataPost.post.user.rol === "Administrador") setRolImg(Admin);
        if (dataPost.post.user.rol === "Estudiante") setRolImg(Student);
        if (dataPost.post.user.rol === "Graduado") setRolImg(Graduate);
        setPostLoading(false)
    }, [])

    const getComment = async () => {

        const res = await axios.get(API_URL + `/comment/post?post_id=${dataPost.post._id}&page=${commentPage}`,
            { headers: { Authorization: "Bearer " + token } })

        setPostComments([...postComments, ...res.data.comments])
        setRemainingComments(res.data.numberOfCommentsLeft);
        (commentPage <= 1) && setShowComments(true)
        setCommentLoading(false)

    }

    const votePost = async (type) => {
        if(!voteLoading && user.uid !== dataPost.post.user._id){
            try{
                setVoteLoading(true)
                const res = await
                axios.put(API_URL + `/posts/${type}`, { post_id: dataPost.post._id }, { headers: { Authorization: "Bearer " + token } })
                setVoteLoading(false)
                setNumberOfVotesPost(res.data.votePost)
                setNumberOfVotesUser(res.data.authorScore)
                setCurrentVote(type)
            } catch (error) {
                setVoteLoading(false)
                toast({
                    description: "Ocurrio un error, intentalo de nuevo",
                    duration: 3000,
                    position: "top",
                    status: "error",
                    isClosable: true
                }) 
            }
        }
    }

    return (
        <>
        <Skeleton isLoaded={!postLoading} width='92%' alignSelf={'center'} justifySelf='center' mt='3rem' borderRadius={'0.375rem'}>

            <Grid position="relative"
                templateRows={'repeat(3, min-content)'}
                templateColumns={'min-content 1fr'}
                boxSize="100%"
                gap="1rem"
                w="100%"
                p={'0.8rem'}
                bg="#F2F2F2"
                fontWeight={600}
                borderRadius={'0.375rem'}>
                <GridItem gridArea={'1 / 1 / 2 / 2'} display='flex' flexDirection={'column'} alignItems='center' >
                    <Image
                        objectFit="cover"
                        w={largerThan575px ? "80px" : "50px"}
                        borderRadius="3rem"
                        src={dataPost.post.user.avatar}
                        alt="No encontrada"
                        maxWidth={'none'}
                    />
                    <Image w={largerThan575px ? "2.8rem" : '2.3rem'} mt=".5rem"
                        src={rolImg} alt="userImage" />
                    <Flex flexDirection='column' alignItems={'center'} justifyContent='flex-start' fontSize="2rem">
                        <TriangleUpIcon
                            color={currentVote === 1 ? "green" : "gray"}
                            onClick={e => (currentVote === 1 ? votePost(0) : votePost(1))}
                            _hover={(user.uid !== dataPost.post.user._id && !voteLoading) ? {cursor:'pointer'} : ''} />
                        {voteLoading 
                        ? <Spinner color='#3195DB'
                                    thickness='4px'
                                    speed='0.65s'
                                    w="48px"
                                    h="48px" /> 
                        : <Text>{numberOfVotesPost}</Text>}
                        <TriangleDownIcon
                            color={currentVote === -1 ? "red" : "gray"}
                            onClick={e => (currentVote === -1 ? votePost(0) : votePost(-1))}
                            _hover={(user.uid !== dataPost.post.user._id && !voteLoading) ? {cursor:'pointer'} : ''}/>
                    </Flex>
                </GridItem >
                <GridItem gridArea={'1 / 2 / 2 / 3'} direction="column" minWidth={0}>
                    <Flex alignItems={largerThan575px ? `center` : `flex-start`}
                        gap=".4rem"
                        fontSize=".75rem"
                        fontWeight="bold"
                        flexDirection={largerThan575px ? `row` : `column`}
                        ml='10px'
                        mr='10px'>
                        <Text >
                            {largerThan575px ? `${dataPost.post.user.userSlack} • ` : `${dataPost.post.user.userSlack}`}
                        </Text>
                        <Flex gap={'0.4rem'} alignItems='center'>
                            <Text cursor="pointer" fontSize={{ base: '11px', sm: '12px' }}>
                                <Tooltip label={new Date(dataPost.post.createdAt).toLocaleString()}
                                    placement='top'>
                                    {largerThan575px ? `${dif}` : `${dif} •`}
                                </Tooltip>
                            </Text>
                            <Image w="1.4rem" alignSelf="flex-start"
                                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                            <Text >
                                {numberOfVotesUser}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex pl="10px">
                        <Text
                            fontSize={'1.2rem'}
                            as="h2"
                            wordBreak={'break-word'}>
                            {dataPost.post.title}
                        </Text>
                    </Flex>
                    <DetailBody body={dataPost.post.body} />
                </GridItem>
                <GridItem gridArea={'2 / 2 / 3 / 3'}>
                    <Flex justifyContent="flex-end" flexWrap={'wrap'}>
                        <Flex gap={{ base: '0.5rem', sm: '1rem' }}
                            justifyContent='flex-end'
                            flexWrap={'wrap'}
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
                </GridItem>
                {dataPost.post.user._id === user.uid 
                        ? <GridItem gridArea={'2 / 1 / 3 / 2'} textAlign='center' alignSelf={'center'} justifySelf='center'>
                                            <EditQuestionModal editPost={{post_id: dataPost.post._id, title: dataPost.post.title, body: dataPost.post.body, module: dataPost.post.module, tags: dataPost.post.tags }}/>
                        </GridItem>
                        : null
                }
                <GridItem gridArea={'3 / 1 / 4 / 3;'}>
                    <Flex w="100%" justifyContent="space-between">
                        <Flex fontSize=".8rem"
                            color="gray.600">
                            {(dataPost.post.numberComments !== 0) ? ((!showComments) ?
                                <Text cursor="pointer"
                                onClick={e => { commentPage === 0 && setCommentPage(1); commentPage > 0 && setShowComments(true) }}>
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
                        <>
                            <Text color="blue.600"
                                cursor="pointer"
                                fontSize={{ base: '12px', sm: '16px' }}
                                onClick={onOpen}>Comentar pregunta</Text>
                            <CreateComment isOpen={isOpen}
                                onClose={onClose}
                                type={"post"}
                                id={idPost}
                                />
                        </>
                    </Flex>
                    <Flex flexDirection='column'>
                        {(showComments) && postComments.map((elem, i) =>
                            <Flex key={i}
                                w="100%"
                                px="1rem">
                                <Comments dataComment={elem} />
                            </Flex>)
                        }
                        {
                            commentsLoading &&
                            <Box alignSelf="center">
                                <Spinner color='#3195DB'
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    w="1.15rem"
                                    h="1.15rem" />
                            </Box>
                        }
                        {
                            (showComments && remainingComments > 0 && !commentsLoading) &&
                            <Flex color="blue.500"
                                fontSize="1rem"
                                px="1rem">
                                <Text
                                    cursor="pointer"
                                    onClick={e => setCommentPage(commentPage + 1)}>
                                    Ver más
                                </Text>
                            </Flex>
                        }
                    </Flex>
                </GridItem>
            </Grid>
            </Skeleton>
        </>
    )
}

export default MainDetails;

