import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../slices/userSlice";
import { Flex, Spinner } from "@chakra-ui/react";

export default function ProtectedRouteAdmin() {
    const { user, loadingUser } = useAuth()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.user)
    if (loadingUser) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh" w="100vw">
                <Spinner
                    thickness='0.8rem'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#FFFF01'
                    w="10rem"
                    h="10rem"
                />
            </Flex>)
    }
    if (!user) return <Navigate to={"/login"} />
    dispatch(getUserData(user.accessToken))
    if (userData.rol !== 'Administrador') return <Navigate to={"/home"} />

    return <><Outlet /></>
}