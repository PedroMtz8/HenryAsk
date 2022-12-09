import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import AuthProvider from "./Components/AuthComponents/AuthContext";
import ProtectedRoute from "./Components/AuthComponents/ProtectedRoutes";
import Home from "./Components/Home/Home";
import CardsHome from "./Components/Card/CardsHome";
import Posts from "./Components/Posts/Posts";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/card" element={<CardsHome />} />
        <Route path="/post" element={<Posts />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
