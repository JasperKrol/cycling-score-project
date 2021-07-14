import React, {useEffect, useState} from 'react';
// @todo verwijder data imports
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import firebase from "../../contexts/Firebase";
import {createMeterString} from "../../helpers/createMeterString";

function LeaderboardTableClimbing() {
    const [loading, setLoading] = useState(true);
    const [userScores, setUserScores] = useState([]);

    const currentMonth = createCurrentMonthString()
    // console.log("leaderboard data", fbData)


    //@todo zet context in useEffect en daarna nieuwe state voor verversen?
    useEffect(() => {

        const fetchData = async () => {
            try {
                const db = firebase.firestore();
                const data = await db.collection("StravaData").get();
                // hier willen we de data gelijk al omzetten
                const banaan = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));

                const filteredUsers = banaan.map((userStravaData) => {

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
                setUserScores(filteredUsers);
                console.log('HALLO', userScores);
                setLoading(false);
            } catch (e) {
                console.error('Firebase fail: ', e)
                setLoading(true);
            }
        };
        fetchData();
    }, []);


    return (
        <>{loading && (<p>Loading...</p>)}
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

                        {userScores.map((userScore, index) => {
                            {
                                return <tr key={`key${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{userScore.username}</td>
                                    <td>{createMeterString(userScore.totalScore)}</td>
                                </tr>
                            }
                        })}

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default LeaderboardTableClimbing;