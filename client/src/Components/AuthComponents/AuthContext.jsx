import { useState, useEffect, useContext, createContext } from "react";
import { auth, storage } from "./Credentials"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import axios from 'axios'
import API_URL from "../../config/environment";


const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth context');
  return context;
};



const AuthProvider = ({ children }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null)
  console.log(user)

  const updateUsername = async (userUpdate, username) => {
    await updateProfile(userUpdate, { displayName: username })
  }

  const signup = async (email, password, userSlack, country) => {

    let infoUser = await createUserWithEmailAndPassword(auth, email, password).then((userFirebase) => userFirebase);

    await axios.post(API_URL + "/auth/register", { uid: infoUser.user.uid, mail: email, country, userSlack })

    return infoUser
  }


  const login = async (email, password) => {
    let user = await signInWithEmailAndPassword(auth, email, password)
  }

  function forgotPasswordFunction(email) {
    return sendPasswordResetEmail(auth, email)
  }

  const signout = async () => {
    await signOut(auth)
  }

  async function uploadFile(file, uid) {
    const storageRef = ref(storage, `${uid}/${file.name}`)
    await uploadBytes(storageRef, file)

    const url = getDownloadURL(storageRef)
    return url
  }

  async function deleteFile(url) {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef);
  }

  /* async function loadFIle(url, uid) {
    const fileRef = doc(firestore, `${uid}/${uid}`);
    await setDoc(fileRef, { link: url, time: Date.now() });
  } */

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
  }, []);


  return (
    <authContext.Provider value={{ signup, login, signout, loadingUser, user, forgotPasswordFunction, updateUsername, uploadFile, deleteFile }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider