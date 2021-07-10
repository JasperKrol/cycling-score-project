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


    // get all data from collections function firebase
    // db.collection("StravaData").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });
    // db.collection("StravaProfile").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });
    //
    // const [spells, setSpells] = React.useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const db = firebase.firestore();
    //         const data = await db.collection("StravaProfile").get();
    //         setFirebaseUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {

        async function fetchFBData(){
            try {
                const db = firebase.firestore();
                const fbUserProfileData = await db.collection("StravaProfile").get();
                setFirebaseUsers(fbUserProfileData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                const fbUserData = await db.collection("StravaData").get();
                setFirebaseStravaData(fbUserData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (e) {
                console.error(e)
            }
        }
        fetchFBData()
    }, []);


    // console.log("firebaseUsers", firebaseUsers)
    // console.log("firebaseStravaData", firebaseStravaData)

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