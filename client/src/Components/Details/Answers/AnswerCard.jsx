import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Grid,
    GridItem,
    Flex,
    Image,
    Text,
    useDisclosure,
    Tooltip,
    Spinner,
    Box,
    Button,
    useMediaQuery,
    Skeleton,
    useToast
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import Comments from '../Comments/Comments';
import DetailBody from '../../DetailBody/DetailBody';
import CreateComment from '../Comments/CreateComment'
import EditAnswerModal from '../../Modals/EditAnswerModal';
import moment from "moment"
import { localeData } from 'moment_spanish_locale';
import 'moment/locale/es';
import Admin from "../../../assets/Rol Images/Administrador.png";
import Graduate from "../../../assets/Rol Images/Graduate.png";
import Student from "../../../assets/Rol Images/Students.png";
import HeroOrTA from "../../../assets/Rol Images/Hero,TA.png";


const AnswerCard = ({ answerCardData, setDataPost}) => {

    const { user } = useAuth();
    let token = user.accessToken
    const idPost = useParams().id;
    moment.updateLocale('es', localeData)
    const [largerThan575px] = useMediaQuery('(min-width: 575px)')
    const [numberOfVotesAnswer, setnumberOfVotesAnswer] = useState(parseInt(answerCardData.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(answerCardData.user.score))
    const [currentVote, setCurrentVote] = useState(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)
    const [commentAnswers, setCommentAnswers] = useState([])
    const [commentPage, setCommentPage] = useState(0)
    const [remainingComments, setRemainingComments] = useState(answerCardData.numberComments)
    const [showComments, setShowComments] = useState(false)
    const [dif, setDif] = useState(moment(answerCardData.createdAt).startOf('seconds').fromNow())
    const [rolImg, setRolImg] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [commentsLoading, setCommentLoading] = useState(false)
    const [voteLoading, setVoteLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const toast = useToast()

    useEffect(() => {
        setnumberOfVotesAnswer(parseInt(answerCardData.score))
        setNumberOfVotesUser(parseInt(answerCardData.user.score))
        setCurrentVote(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)
    }, [answerCardData])

    useEffect(() => {
        (commentPage > 0) && setCommentLoading(true);
        (commentPage > 0) && getComment()
        console.log('3')

    }, [commentPage])

    useEffect(() => {
        if (answerCardData.user.rol === "Henry Hero") setRolImg(HeroOrTA);
        if (answerCardData.user.rol === "TA") setRolImg(HeroOrTA);
        if (answerCardData.user.rol === "Administrador") setRolImg(Admin);
        if (answerCardData.user.rol === "Estudiante") setRolImg(Student);
        if (answerCardData.user.rol === "Graduado") setRolImg(Graduate);
        setLoading(false)
        console.log('oliwis')
    }, [])
    
    const voteAnswer = async (type) => {
        if(!voteLoading && user.uid !== answerCardData.user._id){
            try {
                setVoteLoading(true)
                const res = await
                axios.put(API_URL + `/answer/${type}`, { answer_id: answerCardData._id }, { headers: { Authorization: "Bearer " + token } })
                setVoteLoading(false)
                setnumberOfVotesAnswer(res.data.voteAnswer)
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

    const getComment = async () => {

        const res = await axios.get(API_URL + `/comment/answer?answer_id=${answerCardData._id}&page=${commentPage}`, { headers: { Authorization: "Bearer " + token } })
        setCommentAnswers([...commentAnswers, ...res.data.comments]);
        setRemainingComments(res.data.numberOfCommentsLeft);
        (commentPage <= 1) && setShowComments(true);
        setCommentLoading(false)

    }

    return (
        <>
        <Skeleton startColor='gray' endColor='#FFFFFF' isLoaded={!loading} width='100%' h={loading ? '250px' : 'auto'} borderRadius={'0.375rem'}>
            <Grid position="relative"
                templateRows={'repeat(2, min-content)'}
                templateColumns={largerThan575px ? 'min-content 1fr 80px' : 'min-content 1fr'}
                boxSize="100%"
                gap="1rem"
                w="100%"
                p={'0.8rem'}
                bg="#F2F2F2"
                borderRadius={'0.375rem'}>
                <GridItem gridArea={'1 / 1 / 2 / 2'} display='flex' flexDirection={'column'} alignItems='center' >
                    <Image
                        objectFit="cover"
                        w={largerThan575px ? "80px" : "50px"}
                        borderRadius="3rem"
                        src={answerCardData.user.avatar}
                        alt="No encontrada"
                        maxWidth={'none'}
                    />
                    <Image w={largerThan575px ? "2.8rem" : '2.3rem'} mt=".5rem"
                        src={rolImg} alt="userImage" mb={'.5rem'} />
                    {
                        answerCardData.user._id === user.uid 
                        ? <EditAnswerModal answerData={answerCardData}/>
                        : null
                    }
                    {!largerThan575px ? 
                    <Flex flexDirection='column' alignItems={'center'} justifyContent='flex-start' fontSize="2rem">
                        <TriangleUpIcon
                            color={currentVote === 1 ? "green" : "gray"}
                            onClick={e => (currentVote === 1 ? voteAnswer(0) : voteAnswer(1))}
                            _hover={(user.uid !== answerCardData.user._id && !voteLoading) ? {cursor:'pointer'} : ''} />
                        {voteLoading 
                        ? <Spinner color='#3195DB'
                                    thickness='4px'
                                    speed='0.65s'
                                    w="48px"
                                    h="48px" /> 
                        : <Text w={'48px'} textAlign='center'>{numberOfVotesAnswer}</Text>}
                        <TriangleDownIcon
                            color={currentVote === -1 ? "red" : "gray"}
                            onClick={e => (currentVote === -1 ? voteAnswer(0) : voteAnswer(-1))}
                            _hover={(user.uid !== answerCardData.user._id && !voteLoading) ? {cursor:'pointer'} : ''} />
                    </Flex>
                    : null}
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
                            {largerThan575px ? `${answerCardData.user.userSlack} • ` : `${answerCardData.user.userSlack}`}
                        </Text>
                        <Flex gap={'0.4rem'} alignItems='center'>
                            <Text cursor="pointer" fontSize={{ base: '11px', sm: '12px' }}>
                                <Tooltip label={new Date(answerCardData.createdAt).toLocaleString()}
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
                    <DetailBody body={answerCardData.body} />
                </GridItem>
                {largerThan575px ? <GridItem gridArea={'1 / 3 / 2 / 4'} justifySelf='flex-start'
                    fontSize="2rem" display={'flex'} flexDirection='column' alignItems={'center'} justifyContent='flex-start'>
                    <TriangleUpIcon
                        color={currentVote === 1 ? "green" : "gray"}
                        onClick={e => (currentVote === 1 ? voteAnswer(0) : voteAnswer(1))}
                        _hover={(user.uid !== answerCardData.user._id && !voteLoading) ? {cursor:'pointer'} : ''} />
                    {voteLoading 
                        ? <Spinner color='#3195DB'
                                    thickness='4px'
                                    speed='0.65s'
                                    w="48px"
                                    h="48px" /> 
                        : <Text w={'48px'} textAlign='center'>{numberOfVotesAnswer}</Text>}
                    <TriangleDownIcon
                        color={currentVote === -1 ? "red" : "gray"}
                        onClick={e => (currentVote === -1 ? voteAnswer(0) : voteAnswer(-1))}
                        _hover={(user.uid !== answerCardData.user._id && !voteLoading) ? {cursor:'pointer'} : ''} />
                </GridItem>
                    : null}
                <GridItem gridArea={largerThan575px ? '2 / 1 / 3 / 4' : '2 / 1 / 3 / 4'}>
                    <Flex w="100%" justifyContent="space-between">
                        <Flex fontSize=".8rem"
                            color="gray.600">
                            {(!showComments) ?
                                <Text cursor="pointer"
                                    onClick={e => { commentPage === 0 && setCommentPage(1); commentPage > 0 && setShowComments(true) }}>
                                    Comentarios {` (${answerCardData.numberComments}) `} <TriangleDownIcon />
                                </Text>
                                :
                                <Text cursor="pointer"
                                    onClick={e => { setShowComments(false) }}>
                                    Comentarios {` (${answerCardData.numberComments}) `} <TriangleUpIcon />
                                </Text>}
                        </Flex>
                        <>
                            <Text color="blue.600"
                                cursor="pointer"
                                fontSize={{ base: '12px', sm: '16px' }}
                                onClick={onOpen}>
                                Comentar respuesta
                            </Text>
                            <CreateComment isOpen={isOpen} onClose={onClose} type={"answer"} id={answerCardData._id} />
                        </>
                    </Flex>
                    <Flex flexDirection='column'>
                        {
                            (showComments) && commentAnswers.map((elem, i, arr) =>
                                <Flex key={i} w="100%">
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
                                fontSize=".8rem"
                                w="100%"
                                pb=".5rem">
                                <Text cursor="pointer"
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

export default AnswerCard;