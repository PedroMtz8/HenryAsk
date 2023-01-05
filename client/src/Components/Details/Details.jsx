import NavBar from "../NavBar/NavBar";
import Footer from "../Home/Footer/Footer";
import { redirect, useNavigate, useParams } from "react-router-dom";
import {
    Flex, Skeleton, useToast
} from '@chakra-ui/react'
import MainDetails from "./MainDetails/MainDetails";
import Answers from './Answers/Answers'
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Components/AuthComponents/AuthContext"
import API_URL from "../../config/environment"
import LoaderDetail from "./LoaderDetail";


const Details = () => {
    
    const { user } = useAuth();
    let token = user.accessToken

    const idPost = useParams().id
    const navigate = useNavigate()

    const [dataPost, setDataPost] = useState(undefined);
    const [votingData, setVotingData] = useState(0);
    const [loading, setLoading] = useState(true)
    const toast = useToast()
    
    useEffect(() => {
    
        const getPost = async () => {
            try {
                const res = await axios.get(API_URL + `/posts/${idPost}`, { headers: {Authorization: "Bearer " + token }})
                
                setDataPost(res.data)
                
                Object.keys(res.data.post?.voters).includes(user.email) && setVotingData(parseInt(res.data.post.voters[user.email]))
    
                setLoading(false)

            } catch (error) {
                toast({
                    title: `Post no encontrado, regresando a /home`,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
                setTimeout(navigate('/home'), 3000)
            }

            
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getPost()

    }, [])

    return (
        <>
            <NavBar />
            <Flex position="relative"
                bg="#1F1F1F"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                minH="70vh"
                gap="1rem">
                {
                loading ? <LoaderDetail/>
                          : 
                          <>
                            <MainDetails dataPost={dataPost} 
                                        setDataPost={setDataPost} 
                                        votingData={votingData} 
                                        setVotingData={setVotingData} 
                                        userScore={dataPost.post.user.score}/> 
                            <Answers dataPost={dataPost} setDataPost={setDataPost} />
                           </>
                }
            </Flex>
            <Footer />
        </>
    )
}

export default Details; 