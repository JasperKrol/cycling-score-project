import React, {useState, createContext, useEffect, useContext} from "react";

export const stravaActivityContext = createContext({});

export function useStravaActivityContext() {
    return useContext(stravaActivityContext)
}

// laat intital state nu staan als map() geen function krijg, zet hem op []


function StravaActivityContextProvider ({children}) {

    const clientID = '64170'
    const clientSecret = '3ff187481c800d50cab4c77eaf228aeffa0d7d10'
    const refreshToken = '436733875c77e77d8f547b2e2cf7e6d028e93f4c'
    const token = "f14a0c90ea582382961c80b6dfec45c5809c70e3"
    const activityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=100`

    const [strava, setStravaData] = useState({})


    return (
        <stravaActivityContext.Provider value={{
            strava,
            setStravaData
        }}
        >
            {children}
        </stravaActivityContext.Provider>
    )
}

export default StravaActivityContextProvider;