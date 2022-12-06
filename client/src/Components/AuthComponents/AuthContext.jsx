import { useState, useEffect, useContext, createContext } from "react";
import { app, auth } from "./Credentials"


const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth context');
    return context;
  };

const AuthProvider = ({children}) => {
    const [loadingUser, setLoadingUser] = useState(true);




    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoadingUser(false);
        });
      }, []);

    return (
        <authContext.Provider>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider