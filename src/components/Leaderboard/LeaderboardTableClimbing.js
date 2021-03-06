import React, {useEffect, useState} from 'react';
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import firebase from "../../firebase/Firebase";
import {createMeterString} from "../../helpers/createMeterString";

function LeaderboardTableClimbing() {
    const [loading, setLoading] = useState(true);
    const [userScores, setUserScores] = useState([]);
    const currentMonth = createCurrentMonthString()
    // console.log("leaderboard firebase", fbData)

    //@todo zet context in useEffect en daarna nieuwe state voor verversen?
    useEffect(() => {

        async function fetchData() {
            try {
                const db = firebase.firestore();
                const data = await db.collection("StravaData").get();
                // hier willen we de firebase gelijk al omzetten
                const usersData = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));

                // Haal de gegevens op uit firebase en map over de activiteiten. Filter op de type rit
                // Bereken de scores via reduce en maar een key met value aan van de score

                const filteredUsers = usersData.map((userStravaData) => {

                    const filteredRides = userStravaData.stravaData.filter((ride) => {
                        return ride.type === "Ride" && ride.start_date.substring(0, 7) === currentMonth;
                    })

                    const totalScore = Math.round(filteredRides.reduce(function (accumulator, meter) {
                        return accumulator + meter.total_elevation_gain;
                    }, 0));

                    return {
                        ...userStravaData.stravaUserProfile,
                        rides: filteredRides,
                        totalScore: totalScore,
                    }
                });
                // console.log('HALLO', filteredUsers);
                setUserScores(filteredUsers.sort((a, b) => {
                    return b.totalScore - a.totalScore
                }));
                // console.log('HALLO', userScores);
                setLoading(false);
            } catch (e) {
                console.error('Firebase fail: ', e)
                setLoading(true);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            {loading ? (<p>Loading...</p>) : <>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>

                        {userScores && userScores.map((userScore, index) => {
                            {
                                return <tr key={`key${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{userScore.firstname}</td>
                                    <td>{createMeterString(userScore.totalScore)}</td>
                                </tr>
                            }
                        })}

                        </tbody>
                    </table>
                </div>
            </>}
        </>
    );
}

export default LeaderboardTableClimbing;