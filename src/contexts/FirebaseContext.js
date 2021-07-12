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

    const {pageLoading, user} = useAuthContext()
    const [ fbData, setFbData ] = useState([])
    const [userOne, setUserOne ] = useState([])
    const [userTwo, setUserTwO ] = useState([])
    const [userThree, setUserThree ] = useState([])
    const ref = firebase.firestore().collection("StravaData");


    useEffect(() => {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());

            });
            setFbData(items);
        });
    }, [user]);


    useEffect(() => {
        const userdata = fbData.map((profiles) => {
            return profiles.stravaUserProfile
        })
        // console.log("Every users profile userdata", userdata)
        setUserOne(userdata[0])
        setUserTwO(userdata[1])
        setUserThree(userdata[3])
    },[fbData])


    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{
            fbData:fbData,
            userOne:userOne,
            userTwo:userTwo,
            userThree:userThree
        }}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider