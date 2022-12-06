import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"



export const app = initializeApp(process.env.firebaseConfig)
export const auth = getAuth(app)


