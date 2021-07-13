import React, {useEffect, useState} from 'react';
import {useTable, useSortBy} from 'react-table';
import {useFirebaseContext} from "../../contexts/FirebaseContext";
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import secondsPerMeterToKMPH from "../../helpers/secondsPerMeterToKMPH";

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
    const [userOneSpeedScore, setUserOneSpeedScore] = useState("")
    const [userTwoSpeedScore, setUserTwoSpeedScore] = useState("")
    const [userThreeSpeedScore, setUserThreeSpeedScore] = useState("")

    const currentMonth = createCurrentMonthString()
    // console.log("leaderboard data", fbData, "current month => ", currentMonth )


    //@todo zet context in useEffect en daarna nieuwe state voor verversen?
    useEffect(() => {
        async function calculateDataRides() {
            // console.log("FETCH DATA IN Leaderboards");
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
                const userOneMonthRides =  ridesOnlyUserOne.filter((currentMonthRide) => {
                    return currentMonthRide.start_date.substring(0, 7) === currentMonth
                })
                const userTwoMonthRides =  ridesOnlyUserTwo.filter((currentMonthRide) => {
                    return currentMonthRide.start_date.substring(0, 7) === currentMonth
                })
                const userThreeMonthRides =  ridesOnlyUserThree.filter((currentMonthRide) => {
                    return currentMonthRide.start_date.substring(0, 7) === currentMonth
                })

                // calculate current monthly climbing scores and put them on the page
                const userOneMonthScore =  Math.round(userOneMonthRides.reduce(function (accumulator, speed) {
                    return accumulator + (speed.average_speed / userThreeMonthRides.length);
                }, 0))
                const userTwoMonthScore =  Math.round(userTwoMonthRides.reduce(function (accumulator, speed) {
                    return accumulator + (speed.average_speed / userThreeMonthRides.length);
                }, 0))
                const userThreeMonthScore = Math.round(userThreeMonthRides.reduce(function (accumulator, speed) {
                    return accumulator + (speed.average_speed / userThreeMonthRides.length);
                }, 0))

                setUserOneSpeedScore(secondsPerMeterToKMPH(userOneMonthScore))
                setUserTwoSpeedScore(secondsPerMeterToKMPH(userTwoMonthScore))
                setUserThreeSpeedScore(secondsPerMeterToKMPH(userThreeMonthScore))

            } catch (error) {
                console.error("OH NO, something went wrong");
            }
        }
        calculateDataRides();
    }, [fbData, userOneStravaActivities, userTwoStravaActivities, userThreeStravaActivities]);

    // console.log('scores speed user one=>', userOneSpeedScore)
    // console.log('scores speed user two=>', userTwoSpeedScore)
    // console.log('scores speed user three=>', userThreeSpeedScore)

    const data = React.useMemo(
        () => [
            {
                col1: '1',
                col2: `${userOneName}`,
                col3: `${userOneSpeedScore}`,
            },
            {
                col1: '2',
                col2: `${userTwoName}`,
                col3: `${userTwoSpeedScore}`,
            },
            {
                col1: '3',
                col2: `${userThreeName}`,
                col3: `${userThreeSpeedScore}`,
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
    );
}

export default LeaderboardTableClimbing;