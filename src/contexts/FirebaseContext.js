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
    const [firebaseUsers, setFirebaseUsers] = useState([])
    const [firebaseStravaData, setFirebaseStravaData] = useState([])
    const [ userOneProfileData, setUserOneProfileData] = useState([])
    const [userTwoData, setUserTwoData] = useState([])
    const [userThreeData, setUserThreeData] = useState([])

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

    useEffect(()=> {
        // setUserOneProfileData(firebaseStravaData[0])
        // setUserTwoData(firebaseStravaData[1])
        // setUserThreeData(firebaseStravaData[3])
        async function putDataOnPage () {
            try {
                setUserOneProfileData(firebaseStravaData[0].stravaUserProfile)
                    console.log("userOneProfileDa", userOneProfileData)
                const userTwo = firebaseStravaData[1]
                const userThree = firebaseStravaData[3]            }
            catch (e) {
                console.error(e)
            }
        }

        // concat arrays pro user

        // console.log("gaat dit goed?", userOneProfileData )
        // console.log("gaat dit goed?",  userTwo)
        // console.log("gaat dit goed?", userThree )

        // get user names
        // info per user in Context gooien en dan useEffect per functie/naam/afstand
        // const nameUserOne = firebaseStravaData[0].stravaUserProfile.firstname
        // const nameUserTwo = firebaseStravaData[1].stravaUserProfile.firstname
        // const nameUserThree = firebaseStravaData[3].stravaUserProfile.firstname
        // console.log("User names:?",nameUserOne, nameUserTwo, nameUserThree)

    },[])
    //
    // console.log("userOne",userOneProfileData)
    // console.log("userTwoData",userTwoData)
    // console.log("userThreeData",userThreeData)


    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{
            firebaseUsers: firebaseUsers,
            firebaseStravaData: firebaseStravaData,
            userOneProfileData
        }}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider