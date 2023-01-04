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
    useMediaQuery
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import Comments from '../Comments/Comments';
import DetailBody from '../../DetailBody/DetailBody';
import CreateComment from '../Comments/CreateComment'
import moment from "moment"
import { localeData } from 'moment_spanish_locale';
import 'moment/locale/es';
import Admin from "../../../assets/Rol Images/Administrador.png";
import Graduate from "../../../assets/Rol Images/Graduate.png";
import Student from "../../../assets/Rol Images/Students.png";
import HeroOrTA from "../../../assets/Rol Images/Hero,TA.png";


const AnswerCard = ({ answerCardData, setDataPost, finish }) => {

    const { user } = useAuth();
    let token = user.accessToken
    const idPost = useParams().id;
    moment.updateLocale('es', localeData)
    const [largerThan575px] = useMediaQuery('(min-width: 575px)')
    const [numberOfVotesAnswerd, setNumberOfVotesAnswerd] = useState(parseInt(answerCardData.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(answerCardData.user.score))
    const [currentVote, setCurrentVote] = useState(Object.keys(answerCardData.voters).includes(user.uid) ? parseInt(answerCardData.voters[user.uid]) : 0)
    const [commentAnswers, setCommentAnswers] = useState([])
    const [commentPage, setCommentPage] = useState(0)
    const [remainingComments, setRemainingComments] = useState(answerCardData.numberComments)
    const [showComments, setShowComments] = useState(false)
    const [dif, setDif] = useState(moment(answerCardData.createdAt).startOf('seconds').fromNow())
    const [rolImg, setRolImg] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    useEffect(() => {
        if (answerCardData.user.rol === "Henry Hero") setRolImg(HeroOrTA);
        if (answerCardData.user.rol === "TA") setRolImg(HeroOrTA);
        if (answerCardData.user.rol === "Administrador") setRolImg(Admin);
        if (answerCardData.user.rol === "Estudiante") setRolImg(Student);
        if (answerCardData.user.rol === "Graduado") setRolImg(Graduate);
    }, [])

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
        setRemainingComments(res.data.numberOfCommentsLeft)

    }

    return (
        <>
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
                        src={rolImg} alt="userImage" />
                    {!largerThan575px ? 
                    <Flex flexDirection='column' alignItems={'center'} justifyContent='flex-start' fontSize="2rem">
                        <TriangleUpIcon
                            color={currentVote === 1 ? "green" : "gray"}
                            onClick={e => (user.uid !== answerCardData.user._id) ? (currentVote === 1 ? voteAnswer(0) : voteAnswer(1)) : null} />
                        <Text>{numberOfVotesAnswerd}</Text>
                        <TriangleDownIcon
                            color={currentVote === -1 ? "red" : "gray"}
                            onClick={e => (user.uid !== answerCardData.user._id) ? (currentVote === -1 ? voteAnswer(0) : voteAnswer(-1)) : null} />
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
                            <Text cursor="pointer" fontSize={{base: '11px', sm: '12px'}}>
                                <Tooltip label={new Date(answerCardData.createdAt).toLocaleString()}
                                    placement='top'>
                                    {largerThan575px ?  `${dif}` : `${dif} •`}
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
                        onClick={e => (user.uid !== answerCardData.user._id) ? (currentVote === 1 ? voteAnswer(0) : voteAnswer(1)) : null} />
                    <Text>{numberOfVotesAnswerd}</Text>
                    <TriangleDownIcon
                        color={currentVote === -1 ? "red" : "gray"}
                        onClick={e => (user.uid !== answerCardData.user._id) ? (currentVote === -1 ? voteAnswer(0) : voteAnswer(-1)) : null} />
                </GridItem>
                : null}
                <GridItem gridArea={largerThan575px ? '2 / 1 / 3 / 4' : '2 / 1 / 3 / 4' }>
                <Flex w="100%" justifyContent="space-between">
                    <Flex fontSize=".8rem"
                        color="gray.600">
                        {(!showComments) ?
                            <Text cursor="pointer"
                                onClick={e => { commentPage === 0 && setCommentPage(1); setShowComments(true) }}>
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
                            fontSize={{base: '12px', sm: '16px'}}
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
                    (showComments && remainingComments > 0 && commentAnswers.length > 0) &&
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
        </>
    )
}

export default AnswerCard;