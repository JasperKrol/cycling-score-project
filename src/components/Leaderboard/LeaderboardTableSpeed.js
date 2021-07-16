import React, {useEffect, useState} from 'react';
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import secondsPerMeterToKMPH from "../../helpers/secondsPerMeterToKMPH";
import firebase from "../../contexts/Firebase";

function LeaderboardTableSpeed() {

    const [userScores, setUserScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentMonth = createCurrentMonthString()

    //@todo zet context in useEffect en daarna nieuwe state voor verversen?
    useEffect(() => {

        const fetchData = async () => {

            try {
                const db = firebase.firestore();
                const data = await db.collection("StravaData").get();
                // hier willen we de data gelijk al omzetten
                const usersData = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));

                const filteredUsers = usersData.map((userStravaData) => {

                    const filteredRides = userStravaData.stravaData.filter((ride) => {
                        return ride.type === "Ride" && ride.start_date.substring(0, 7) === currentMonth;
                    })

                    const speedScore = filteredRides.reduce(function (accumulator, speed) {
                        // console.log(filteredRides.length)
                        return accumulator + speed.average_speed
                    }, 0)

                    const totalScore = (speedScore / filteredRides.length)

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

    // console.log('HALLO', userScores);

    return (
        <>{loading ? (<p>Loading...</p>) : <>
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
                                <td>{secondsPerMeterToKMPH(userScore.totalScore)}</td>
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

export default LeaderboardTableSpeed;