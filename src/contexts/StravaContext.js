import React, {useState, createContext, useContext, useEffect} from "react";
import firebase from "./Firebase";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {useAuthContext} from "./AuthContext";

export const StravaActivityContext = createContext({});


export function useStravaActivityContext() {
    return useContext(StravaActivityContext)
}

function StravaActivityContextProvider({children}) {



    const [stravaData, setStravaData] = useState([])
    const [stravaUserProfile, setStravaUserProfile] = useState([])
    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [clientId, setClientID] = useState();
    const [accessToken, setAccessToken] = useState('');
    const [ banaan, setLoading] = useState(true)





    // get mogen samen
    // useEffect(() => {
    //
    //    if (!user) return
    //
    //     async function fetchAllStravaData(accestoken) {
    //         try {
    //             const resultProfile = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accestoken}`)
    //             console.log("is dit resultProfile", resultProfile.data)
    //             setStravaUserProfile(resultProfile.data)
    //
    //             const resultActivities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${accestoken}&per_page=200`)
    //             console.log("is dit resultActivities", resultActivities.data)
    //             setStravaData(resultActivities.data)
    //             setLoading(false)
    //
    //
    //             //return data
    //             return resultProfile, resultActivities
    //             // variable const
    //
    //         } catch (e) {
    //             console.error(e)
    //             setLoading(false)
    //             setError(true);
    //             setLoading(true);
    //         }
    //         fetchAllStravaData()
    //     }
    //
    //     async function fetchData() {
    //         if (!user) return
    //
    //         try {
    //             // Haal eerst de accesstoken op
    //             // eslint-disable-next-line no-restricted-globals
    //             console.log("location???", location)
    //             const stravaAuthToken = cleanUpAuthToken(location.search)
    //             console.log("stravaAuthToken", stravaAuthToken)
    //             // setAutToken
    //             const responseTokens = await testAuthGetter(stravaAuthToken);
    //             console.log("responseTokens", responseTokens)
    //
    //             //@todo hier gaat het fout met opslaan
    //             const accesToken = responseTokens.access_token;
    //             console.log("accesToken", accesToken)
    //             await fetchAllStravaData(accesToken)
    //
    //
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     fetchData()
    //
    //
    // }, [user])


    return (
        <StravaActivityContext.Provider value={{
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
        </StravaActivityContext.Provider>
    )
}

export default StravaActivityContextProvider;