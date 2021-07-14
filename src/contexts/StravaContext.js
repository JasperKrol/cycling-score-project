import React, {useState, createContext, useContext, useEffect} from "react";
import axios from "axios";
import firebase from "./Firebase";
// import {useAuthContext} from "./AuthContext";

export const stravaActivityContext = createContext({});

export function useStravaActivityContext() {
    return useContext(stravaActivityContext)
}

function StravaActivityContextProvider({children}) {

    // @todo: zet hier ok de strava tokenbij zodat we die overal kunnen gebruiken

    const [stravaData, setStravaData] = useState([])
    const [stravaUserProfile, setStravaUserProfile] = useState([])
    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [clientId, setClientID] = useState();
    const [accessToken, setAccessToken] = useState('');

    // // @todo opruimen niet gebruikte setters/getters
    // const db = firebase.firestore();
    //
    // useEffect(() => {
    //     // @todo: eerst even checken of we wel gebruikersdata hebben en of we nog geen token hebben
    //     // als wel data maar geen token, dan deze functie aanroepen:
    //
    //     async function fetchToken() {
    //         // @todo: de hardcoded data vervangen met data uit de context-state
    //         try {
    //             const response = await axios.post('https://www.strava.com/oauth/token', {
    //                 client_id: '68178',
    //                 client_secret: '25b0dcca0b71b0e6430d2c91a91f9c604644e3f7',
    //                 refresh_token: '436733875c77e77d8f547b2e2cf7e6d028e93f4c',
    //                 grant_type: 'refresh_token'
    //             });
    //             setAccessToken(response.data.access_token);
    //             console.log('TOKEN', response.data, "data", response);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     fetchToken();
    // }, []);
    //
    // useEffect(() => {
    //     console.log('DE TOKEN IS', accessToken);
    //
    //     const activityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=200`
    //
    //     async function fetchStravaData() {
    //         toggleLoading(true);
    //         try {
    //             const resultActivities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=bf9c0141655bfb5c9712c57b9ca7d2bfc9f67244&per_page=200`)
    //             console.log("Strava results", resultActivities.data)
    //             setStravaData(resultActivities.data);
    //
    //
    //             // push de userInfo naar stravaUserProfile -> peet willeke en ik
    //
    //             const resultProfile = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=bf9c0141655bfb5c9712c57b9ca7d2bfc9f67244`)
    //             console.log("is dit result", resultProfile.data)
    //             setStravaUserProfile(resultProfile.data)
    //
    //             await db.collection('StravaData').doc(user.email).set({
    //                 stravaData: stravaData,
    //                 stravaUserProfile: stravaUserProfile
    //             })
    //
    //
    //         } catch (e) {
    //             console.error(e)
    //             setError(true);
    //
    //         }
    //         toggleLoading(false);
    //     }
    //
    //     if (accessToken) {
    //         fetchStravaData();
    //     }
    //
    // }, [accessToken])




    return (
        <stravaActivityContext.Provider value={{
            stravaData: stravaData,
            setStravaData: setStravaData,
            loading: loading,
            toggleLoading: toggleLoading,
            error: error,
            setError: setError,
            stravaUserProfile: stravaUserProfile,
            setStravaUserProfile: setStravaUserProfile,
            clientSecret: clientSecret,
            setClientSecret: setClientSecret,
            clientId: clientId,
            setClientID: setClientID,
            accessToken: accessToken,
        }}
        >
            {children}
        </stravaActivityContext.Provider>
    )
}

export default StravaActivityContextProvider;