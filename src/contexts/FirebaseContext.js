import React, {useState, createContext, useContext, useEffect} from "react";
import Tile from "../components/Tile/Tile";
// import axios from "axios";
import firebase from "../../src/contexts/Firebase";
// import app from '../../src/contexts/Firebase'
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
    const [allActivities, setAllActivities] = useState([])
    const [userOneStravaActivities, setUserOneStravaActivities] = useState([])
    const [userTwoStravaActivities, setUserTwoStravaActivities] = useState([])
    const [userThreeStravaActivities, setUserThreeStravaActivities] = useState([])
    const [stravaUserNames, setStravaUserNames] = useState([])
    const [userOneName, setUserOneName] = useState([])
    const [userTwoName, setUserTwoName] = useState([])
    const [userThreeName, setUserThreeName] = useState([])
    // const [userOneName, setUserOneName] = useState([])
    // const [userTwoName, setUserTwoName] = useState([])
    // const [userThreeScores, setUserThreeScores] = useState([])
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
            } catch (e) {
                console.error('Firebase fail: ', e)
                setError(true);
                setLoading(true);
            }
        }

        sendData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = firebase.firestore();
                const data = await db.collection("StravaData").get();
                setFbData(data.docs.map(doc => ({...doc.data(), id: doc.id})));

            } catch (e) {
                console.error('Firebase fail: ', e)
                setError(true);
                setLoading(true);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        function fetchUserNames() {

            if (!fbData) return

            const userdata = fbData.map((profiles) => {
                return profiles.stravaUserProfile
            })
            const collectStravaNames = fbData.map((name) => {
                return name.stravaUserProfile.username
            })
            setUserOne(userdata[0])
            setUserTwO(userdata[1])
            setUserThree(userdata[3])
            setStravaUserNames(stravaUserNames)
            setUserOneName(collectStravaNames[0])
            setUserTwoName(collectStravaNames[1])
            setUserThreeName(collectStravaNames[3])
        }

        fetchUserNames()
    }, [fbData])


    useEffect(() => {

        if (!fbData) return

        const userStravaActivities = fbData.map((activity) => {
            return activity.stravaData
        })
        console.log("Every users userStravaActivities", userStravaActivities)
        setUserOneStravaActivities(userStravaActivities[0])
        setUserTwoStravaActivities(userStravaActivities[1])
        setUserThreeStravaActivities(userStravaActivities[3])

    }, [fbData])

    // console.log("userThreeStravaActivities", userThreeStravaActivities)
    // console.log("userTwoStravaActivities", userTwoStravaActivities)
    // console.log("userOneStravaActivities", userOneStravaActivities)


    if (pageLoading) {
        return <>
            <div className="container"><Tile><h2>Loading</h2></Tile></div>
        </>
    }

    return (
        <firebaseContext.Provider value={{
            loading: loading,
            setLoading: setLoading,
            fbData: fbData,
            userOne: userOne,
            userTwo: userTwo,
            userThree: userThree,
            userOneStravaActivities: userOneStravaActivities,
            userTwoStravaActivities: userTwoStravaActivities,
            userThreeStravaActivities: userThreeStravaActivities,
            stravaUserNames: stravaUserNames,
            userOneName: userOneName,
            userTwoName: userTwoName,
            userThreeName: userThreeName,
            // userThreeScores: userThreeScores
        }}>
            {!pageLoading && children}
        </firebaseContext.Provider>
    )
}

export default FirebaseContextProvider