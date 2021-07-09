import React, {useState, createContext, useContext, useEffect} from "react";
// import app from './Firebase'
import Tile from "../components/Tile/Tile";
// import axios from "axios";
import firebase from "./Firebase";

export const firebaseContext = createContext({});

export function useFirebaseContext() {
    return useContext(firebaseContext)
}

function FirebaseContextProvider({children}) {

    // // const [firebaseUser, setFirebaseUser] = useState('')
    // // const [userD, setPassword] = useState('')
    // const [users, setUserS] = useState(null)
    // const [pageLoading, setPageLoading] = useState(true)
    //
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const db = firebase.firestore();
    //         const data = await db.collection("StravaProfile").get();
    //         console.log("data", data)
    //         setUserS(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //         console.log(users)
    //     };
    //     fetchData();
    // }, []);

    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{}}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider