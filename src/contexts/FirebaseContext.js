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
    const [ fbData, setfbData ] = useState([])
    const ref = firebase.firestore().collection("StravaData");

    function getSchools() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setfbData(items);
        });
    }

    useEffect(() => {
        getSchools();
        // eslint-disable-next-line
    }, []);

    console.log("data>", fbData)


    useEffect(() => {
        getSchools();
        // eslint-disable-next-line
    }, []);

    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{
            fbData:fbData
        }}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider