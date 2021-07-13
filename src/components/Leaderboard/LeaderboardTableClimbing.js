import React, {useEffect, useState} from 'react';
import {useTable, useSortBy} from 'react-table';

// @todo verwijder data imports

import dataJasper from "../../data/DataJasper.json"
import dataPeter from "../../data/DataPeter.json"


import {useFirebaseContext} from "../../contexts/FirebaseContext";
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import {number} from "react-table/src/sortTypes";

function LeaderboardTableClimbing() {

    const {
        fbData,
        userOneName,
        userTwoName,
        userThreeName,
        userOneStravaActivities,
        userTwoStravaActivities,
        userThreeStravaActivities
    } = useFirebaseContext()
    const [userOneScore, setUserOneScores] = useState("")
    const [userTwoScores, setUserTwoScores] = useState("")
    const [userThreeScores, setUserThreeScores] = useState("")
    const [loading, setLoading] = useState(true)

    const currentMonth = createCurrentMonthString()
    console.log("leaderboard data", fbData)


    //@todo zet context in useEffect en daarna nieuwe state voor verversen?
    useEffect(() => {
        async function calculateDataRides() {
            console.log("FETCH DATA IN Leaderboards");
            if (!fbData) return
            try {
                //Get all ride activities from "FBDATABASE"
                const ridesOnlyUserOne = await userOneStravaActivities.filter((ride) => {
                    return ride.type === "Ride"
                })
                const ridesOnlyUserTwo = await userTwoStravaActivities.filter((ride) => {
                    return ride.type === "Ride"
                })
                const ridesOnlyUserThree = await userThreeStravaActivities.filter((ride) => {
                    return ride.type === "Ride"
                })

                // Filter ride activities to current month
                const userOneMonthRides = await ridesOnlyUserOne.filter((currentMonthRide) => {
                    return currentMonthRide.start_date.substring(0, 7) === currentMonth
                })
                const userTwoMonthRides = await ridesOnlyUserTwo.filter((currentMonthRide) => {
                    return currentMonthRide.start_date.substring(0, 7) === currentMonth
                })
                const userThreeMonthRides = await ridesOnlyUserThree.filter((currentMonthRide) => {
                    return currentMonthRide.start_date.substring(0, 7) === currentMonth
                })

                // calculate current monthly climbing scores and put them on the page
                const userOneMonthScore = Math.round(userOneMonthRides.reduce(function (accumulator, meter) {
                    return accumulator + meter.total_elevation_gain;
                }, 0))
                const userTwoMonthScore = Math.round(userTwoMonthRides.reduce(function (accumulator, meter) {
                    return accumulator + meter.total_elevation_gain;
                }, 0))
                const userThreeMonthScore = Math.round(userThreeMonthRides.reduce(function (accumulator, meter) {
                    return accumulator + meter.total_elevation_gain;
                }, 0))

                setUserOneScores(userOneMonthScore)
                setUserTwoScores(userTwoMonthScore)
                setUserThreeScores(userThreeMonthScore)
                setLoading(false)


                // console.log("rideswille", userThreeStravaActivities)
                // console.log("ridesOnlyUserThree:", ridesOnlyUserThree)
                // console.log("WillieMonth:", userThreeMonthRides)
                // console.log('rideswille', willekeClimbingScore, "=>", userThreeScores)
            } catch (error) {
                console.error("OH NO, something went wrong");
                setLoading(true);
            }
        }
        calculateDataRides();
    }, []);

    console.log('scores user two=>', userOneScore)
    console.log('scores user two=>', userTwoScores)
    console.log('scores user three=>', userThreeScores)


    // //Get all ride activities from "strava"
    // const ridesOnlyWilleke = dataWilleke.filter((ride) => {
    //     return ride.type === "Ride"
    // })
    const ridesOnlyJasper = dataJasper.filter((ride) => {
        return ride.type === "Ride"
    })

    const ridesOnlyPeter = dataPeter.filter((ride) => {
        return ride.type === "Ride"
    })

    const jasperMonthScore = ridesOnlyJasper.filter((currentMonthRide) => {
        return currentMonthRide.start_date.substring(0, 7) === currentMonth
    })
    const peterMonthScore = ridesOnlyPeter.filter((currentMonthRide) => {
        return currentMonthRide.start_date.substring(0, 7) === currentMonth
    })
    // console.log("willekesMonthScore", willekesMonthScore)

    // calculate current monthly climbing scores and put them on the page
    // const willekeClimbingScore = Math.round(willekeMonthScore.reduce(function (accumulator, meter) {
    //     return accumulator + meter.total_elevation_gain;
    // }, 0))
    const jasperClimbingScore = Math.round(jasperMonthScore.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    const peterClimbingScore = Math.round(peterMonthScore.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    // console.log("metersw?", willekeClimbingScore, "metersP?",peterClimbingScore, "metersj?", jasperClimbingScore)


//@todo dit werkt

    const data = React.useMemo(
        () => [
            {
                col1: '1',
                col2: `${userOneName}`,
                col3: `${userOneScore} meters`,
            },
            {
                col1: '2',
                col2: `${userTwoName}`,
                col3: `${userTwoScores} meters`,
            },
            {
                col1: '3',
                col2: `${userThreeName}`,
                col3: `${userThreeScores} meters`,
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Position',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Name',
                accessor: 'col2',
            },
            {
                Header: 'Score',
                accessor: 'col3', // accessor is the "key" in the data
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, useSortBy);

    return (
        <>{loading && (<p>Loading...</p>)}
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                                {column.render('Header')}
                                <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default LeaderboardTableClimbing;