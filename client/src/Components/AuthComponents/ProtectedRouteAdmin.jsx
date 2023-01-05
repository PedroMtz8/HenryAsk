import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import API_URL from '../../config/environment'

export default function ProtectedRouteAdmin() {
    const { user, loadingUser } = useAuth()
    const [notAdmin, setNotAdmin] = useState(false)

    if (loadingUser) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh" w="100vw" bg='black'>
                <Spinner
                    thickness='0.8rem'
                    speed='0.65s'
                    color='#FFFF01'
                    w="10rem"
                    h="10rem"
                />
            </Flex>)
    }

    if(user){
        axios.get(`${API_URL}/auth`, {
            headers: { Authorization: "Bearer " + user.accessToken },
        }).then(res => {
            if(res.data.user.rol !== 'Administrador'){
                setNotAdmin(true)
            } 
        })
    }

    if(notAdmin){
        return <Navigate to={"/not-admin"} />
    }
    
    if(!user) return <Navigate to={"/login"} />
    
    return <><Outlet /></>
}