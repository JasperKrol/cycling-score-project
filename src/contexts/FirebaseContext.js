import React, {useState, createContext, useContext, useEffect} from "react";
// import app from './Firebase'
import Tile from "../components/Tile/Tile";
// import axios from "axios";
import firebase from "../../src/contexts/Firebase";
import app from '../../src/contexts/Firebase'
import {useAuthContext} from "./AuthContext";

export const firebaseContext = createContext({});

export function useFirebaseContext() {
    return useContext(firebaseContext)
}

function FirebaseContextProvider({children}) {

    const {pageLoading, user} = useAuthContext()
    const [fbData, setFbData] = useState([])
    const [userOne, setUserOne] = useState([])
    const [userTwo, setUserTwO] = useState([])
    const [userThree, setUserThree] = useState([])
    const [userOneStravaActivities, setUserOneStravaActivities] = useState([])
    const [userTwoStravaActivities, setUserTwoStravaActivities] = useState([])
    const [userThreeStravaActivities, setUserThreeStravaActivities] = useState([])
    const [stravaUserNames, setStravaUserNames] = useState([])
    const [userOneName, setUserOneName] = useState([])
    const [userTwoName, setUserTwoName] = useState([])
    const [userThreeName, setUserThreeName] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    const ref = firebase.firestore().collection("StravaData");

    useEffect(() => {
        function sendData() {
            try {
                return ref.onSnapshot((querySnapshot) => {
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    })
                    setFbData(items);
                })
                } catch(e) {
                    console.error('Firebase fail: ', e)
                    setError(true);
                    setLoading(true);
                }
            }
            sendData()
        }, [])



    useEffect(() => {

        if (!fbData) return

        const userdata = fbData.map((profiles) => {
            return profiles.stravaUserProfile
        })
        const userStravaActivities = fbData.map((activity) => {
            return activity.stravaData
        })
        const collectStravaNames = fbData.map((name) => {
            return name.stravaUserProfile.username
        })
        // console.log("Every users profile userdata", userdata)
        setUserOne(userdata[0])
        setUserTwO(userdata[1])
        setUserThree(userdata[3])
        setUserOneStravaActivities(userStravaActivities[0])
        setUserTwoStravaActivities(userStravaActivities[1])
        setUserThreeStravaActivities(userStravaActivities[3])
        setStravaUserNames(stravaUserNames)
        setUserOneName(collectStravaNames[0])
        setUserTwoName(collectStravaNames[1])
        setUserThreeName(collectStravaNames[3])
    }, [fbData])


    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{
            loading: loading,
            setLoading:setLoading,
            fbData: fbData,
            userOne: userOne,
            userTwo: userTwo,
            userThree: userThree,
            userOneStravaActivities: userOneStravaActivities,
            userTwoStravaActivities: userTwoStravaActivities,
            userThreeStravaActivities: userThreeStravaActivities,
            stravaUserNames:stravaUserNames,
            userOneName: userOneName,
            userTwoName: userTwoName,
            userThreeName: userThreeName

        }}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider