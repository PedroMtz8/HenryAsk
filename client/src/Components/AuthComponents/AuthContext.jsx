import { useState, useEffect, useContext, createContext } from "react";
import { app, auth, firestore } from "./Credentials"
import { createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"


const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth context');
    return context;
  };

const AuthProvider = ({children}) => {
    const [loadingUser, setLoadingUser] = useState(true);
    const [user, setUser] = useState(null)


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

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoadingUser(false);
        });
      }, []);

    return (
        <authContext.Provider value={{signup}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider