import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import AuthProvider from "./Components/AuthComponents/AuthContext";
import ProtectedRoute from "./Components/AuthComponents/ProtectedRoutes";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Posts from "./Components/Posts/Posts";
import HomeAdmin from "./Components/Admin/HomeAdmin";
import Accounts from "./Components/Admin/Accounts";
import Details from "./Components/Details/Details";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ReqAdmin from "./Components/Admin/ReqAdmin";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        // Rutas de admin
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/accounts" element={<Accounts />} />
          <Route path="/admin/requests" element={<ReqAdmin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/post/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
