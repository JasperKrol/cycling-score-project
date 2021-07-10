import React, {useState, createContext, useContext, useEffect} from "react";
// import app from './Firebase'
import Tile from "../components/Tile/Tile";
// import axios from "axios";
import firebase from "./Firebase";
import {useAuthContext} from "./AuthContext";

export const firebaseContext = createContext({});

export function useFirebaseContext() {
    return useContext(firebaseContext)
}

function FirebaseContextProvider({children}) {

    const {pageLoading} = useAuthContext()

    // const [userD, setPassword] = useState('')
    const [firebaseUsers, setFirebaseUsers] = useState([])
    const [firebaseStravaData, setFirebaseStravaData] = useState([])


    useEffect(() => {

        async function fetchFBData(){
            try {
                const db = firebase.firestore();
                const fbUserProfileData = await db.collection("StravaProfile").get();
                setFirebaseUsers(fbUserProfileData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                const fbUserData = await db.collection("StravaData").get();
                setFirebaseStravaData(fbUserData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (e) {
                console.error('Firebase fail: ', e)
            }
        }
        fetchFBData()
    }, []);

// // als ik deze uit zet komen ze niet door, waarom?
//     console.log("firebaseUsers", firebaseUsers)
//     console.log("firebaseStravaData", firebaseStravaData)

    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{
            firebaseUsers: firebaseUsers,
            firebaseStravaData: firebaseStravaData
        }}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider