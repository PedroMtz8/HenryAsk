import {
    Flex, Button
} from '@chakra-ui/react'
import CardsHome from '../../Card/CardsHome';
import PaginatedButtons from './PaginatedButtons/PaginatedButtons.jsx';
import SearchBar from './SearchBar/SearchBar';
import API_URL from "../../../config/environment"
import { useAuth } from "../../AuthComponents/AuthContext"
import axios from 'axios'
import { useEffect,useState } from 'react';

const Paginated = () => {

    const { user } = useAuth();
    let token = user.accessToken
    console.log(token)

    const [currentPosts, setCurrentPosts] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(true)


    useEffect(() => {

        const aFun = async () => {
            const res = await axios.get(API_URL + "/posts?page=1", { headers: { Authorization: "Bearer " + token } })
            setCurrentPosts(res.data);
            setLoadingPosts(false);
        } 

        aFun(); 

    }, [])


    return (
        <Flex position="relative"
            bg="#1F1F1F"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            minH="90vh"
            p="1rem"
            gap="1rem">
            <SearchBar />
            {loadingPosts?
            <Flex h="100vh" color={"white"}>Loading</Flex> 
            :
            <CardsHome />
            }
            <PaginatedButtons />
        </Flex>
    )
}

export default Paginated;