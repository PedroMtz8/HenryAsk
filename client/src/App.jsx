import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import {Route, Routes} from 'react-router-dom'
import Register from "./Components/Register/Register"
import AuthProvider from "./Components/AuthComponents/AuthContext"

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Register/>} />
    </Routes>
    </AuthProvider>
  )
}

export default App
