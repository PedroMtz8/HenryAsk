import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../slices/userSlice";

export default function ProtectedRouteAdmin() {
    const {user, loadingUser} = useAuth()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.user)
    if(loadingUser) return null
    if(!user) return <Navigate  to={"/login"} />
    dispatch(getUserData(user.accessToken))
    if(userData.rol !== 'Administrador') return <Navigate to={"/home"}/>

    return <><Outlet /></>
}