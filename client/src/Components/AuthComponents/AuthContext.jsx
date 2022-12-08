import { useState, useEffect, useContext, createContext } from "react";
import { app, auth, firestore } from "./Credentials"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import axios from 'axios'
import API_URL from "../../config/environment";


const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth context');
  return context;
};

const AuthProvider = ({children}) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null)
  //console.log(user.uid, user.accessToken)
  console.log(user)
  const signup = async(email, password, userSlack, country) => {

    let infoUser = await createUserWithEmailAndPassword(auth, email, password).then((userFirebase) => userFirebase);

    const docRef = doc(firestore, `/users/${infoUser.user.uid}`)

    setDoc(docRef, {
      userSlack,
      avatar: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
      score: 0,
      questions: 0,
      answers: 0,
      status: false,
      country,
      student: false,
    })

  }


  const login = async(email, password) => {
    let user = await signInWithEmailAndPassword(auth, email, password)
    const token = await user.user.getIdToken() //devuelve el token de acceso, si existe uno pero vencio, lo refresca
    const result = await axios.get(`${API_URL}/auth/status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(result.data) //Estado actual del usuario: awaiting
    
  }

  const signout = async() => {
    await signOut(auth)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
  }, []);

  return (
    <authContext.Provider value={{signup, login, signout, loadingUser, user}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider