import React, {useContext, useEffect, useState} from 'react';
import {useTable, useSortBy} from 'react-table';
// @todo verwijder data imports
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import firebase from "../../contexts/Firebase";
import {createMeterString} from "../../helpers/createMeterString";

function LeaderboardTableClimbing() {
    const [loading, setLoading] = useState(true);
    const [userScores, setUserScores] = useState([]);
    const [userOneName, setUserOneName] = useState("")
    const [userOneDistanceScore, setUserOneDistanceScore] = useState("")
    const [userTwoDistanceScore, setUserTwoDistanceScore] = useState("")
    const [userThreeDistanceScore, setUserThreeDistanceScore] = useState("")

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

    useEffect(() => {
        console.log('HALLO', userScores);


        // setUserOneClimbingScore(userOneMonthScore)
        // setUserTwoClimbingScore(userTwoMonthScore)
        // setUserThreeClimbingScores(userThreeMonthScore)


        // calculate current monthly climbing scores and put them on the page
        // const userOneMonthScore = Math.round(userOneMonthRides.reduce(function (accumulator, meter) {
        //     return accumulator + meter.total_elevation_gain;
        // }, 0))
        // const userTwoMonthScore = Math.round(userTwoMonthRides.reduce(function (accumulator, meter) {
        //     return accumulator + meter.total_elevation_gain;
        // }, 0))
        // const userThreeMonthScore = Math.round(userThreeMonthRides.reduce(function (accumulator, meter) {
        //     return accumulator + meter.total_elevation_gain;
        // }, 0))

    }, [userScores])

    //     async function calculateDataRides() {
    //         // console.log("FETCH DATA IN Leaderboards");
    //         if (!fbData) return
    //         try {
    //             //Get all ride activities from "FBDATABASE"
    //             const ridesOnlyUserOne = await userOneStravaActivities.filter((ride) => {
    //                 return ride.type === "Ride"
    //             })
    //             const ridesOnlyUserTwo = await userTwoStravaActivities.filter((ride) => {
    //                 return ride.type === "Ride"
    //             })
    //             const ridesOnlyUserThree = await userThreeStravaActivities.filter((ride) => {
    //                 return ride.type === "Ride"
    //             })
    //
    //             // Filter ride activities to current month
    //             const userOneMonthRides = await ridesOnlyUserOne.filter((currentMonthRide) => {
    //                 return currentMonthRide.start_date.substring(0, 7) === currentMonth
    //             })
    //             const userTwoMonthRides = await ridesOnlyUserTwo.filter((currentMonthRide) => {
    //                 return currentMonthRide.start_date.substring(0, 7) === currentMonth
    //             })
    //             const userThreeMonthRides = await ridesOnlyUserThree.filter((currentMonthRide) => {
    //                 return currentMonthRide.start_date.substring(0, 7) === currentMonth
    //             })
    //
    //
    //
    //             setUserOneClimbingScore(userOneMonthScore)
    //             setUserTwoClimbingScore(userTwoMonthScore)
    //             setUserThreeClimbingScores(userThreeMonthScore)
    //             setLoading(false)
    //
    //
    //             // console.log("rideswille", userThreeStravaActivities)
    //             // console.log("ridesOnlyUserThree:", ridesOnlyUserThree)
    //             // console.log("WillieMonth:", userThreeMonthRides)
    //             // console.log('rideswille', willekeClimbingScore, "=>", userThreeClimbingScore)
    //         } catch (error) {
    //             console.error("OH NO, something went wrong");
    //             setLoading(true);
    //         }
    //     }
    //     calculateDataRides();
    // }, []);

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