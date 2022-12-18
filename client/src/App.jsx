import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import AuthProvider from "./Components/AuthComponents/AuthContext";
import ProtectedRoute from "./Components/AuthComponents/ProtectedRoutes";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import CardsHome from "./Components/Card/CardHome";
import Posts from "./Components/Posts/Posts";
import HomeAdmin from "./Components/Admin/HomeAdmin";
import Accounts from "./Components/Admin/Accounts";
import Reports from "./Components/Admin/Reports";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        // Rutas de admin
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/accounts" element={<Accounts />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/card" element={<CardsHome />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
