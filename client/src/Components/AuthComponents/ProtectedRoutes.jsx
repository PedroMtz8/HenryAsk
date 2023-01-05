import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";


export default function ProtectedRoute({ children }) {
    const { user, loadingUser } = useAuth()
    console.log(user)
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
    if (!user) return <Navigate to={"/login"} />

    return <><Outlet /></>
}