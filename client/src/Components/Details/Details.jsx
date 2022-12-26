import NavBar from "../NavBar/NavBar";
import Footer from "../Home/Footer/Footer";
import { useParams } from "react-router-dom";
import {
    Flex
} from '@chakra-ui/react'
import MainDetails from "./MainDetails/MainDetails";
import Answers from './Answers/Answers'
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Components/AuthComponents/AuthContext"
import API_URL from "../../config/environment"

const Details = () => {

    const { user } = useAuth();
    let token = user.accessToken

    const idPost = useParams().id

    const [dataPost, setDataPost] = useState(undefined);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getPost = async () => {

            const res = await
                axios.get(API_URL + `/posts/${idPost}`, { headers: {Authorization: "Bearer " + token }})

            setDataPost(res.data)
            setLoading(false)
            
        }

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
                loading? "cargando" : <><MainDetails dataPost={dataPost}/> <Answers /></>
                }
            </Flex>
            <Footer />
        </>
    )
}

export default Details; 