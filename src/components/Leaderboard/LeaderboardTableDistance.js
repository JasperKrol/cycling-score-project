import React, {useEffect, useState, useMemo} from 'react';
import {useTable, useSortBy} from 'react-table';
import {createCurrentMonthString} from "../../helpers/createDateStrings";
import metersToKM from "../../helpers/metersToKM";

function LeaderboardTableClimbing() {

    const [userOneDistanceScore, setUserOneDistanceScore] = useState("")
    const [userTwoDistanceScore, setUserTwoDistanceScore] = useState("")
    const [userThreeDistanceScore, setUserThreeDistanceScore] = useState("")
    const [loading, setLoading] = useState(true)
    const currentMonth = createCurrentMonthString()
    // console.log("leaderboard data", fbData, "current month => ", currentMonth )

    // useEffect(() => {
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
    //             const userOneMonthRides =  await ridesOnlyUserOne.filter((currentMonthRide) => {
    //                 return currentMonthRide.start_date.substring(0, 7) === currentMonth
    //             })
    //             const userTwoMonthRides =  await ridesOnlyUserTwo.filter((currentMonthRide) => {
    //                 return currentMonthRide.start_date.substring(0, 7) === currentMonth
    //             })
    //             const userThreeMonthRides = await ridesOnlyUserThree.filter((currentMonthRide) => {
    //                 return currentMonthRide.start_date.substring(0, 7) === currentMonth
    //             })
    //
    //             // calculate current monthly climbing scores and put them on the page
    //             const userOneMonthScore = Math.round(userOneMonthRides.reduce(function (accumulator, distance) {
    //                 return accumulator + distance.distance;
    //             }, 0))
    //             const userTwoMonthScore = Math.round(userTwoMonthRides.reduce(function (accumulator, distance) {
    //                 return accumulator + distance.distance;
    //             }, 0))
    //             const userThreeMonthScore = Math.round(userThreeMonthRides.reduce(function (accumulator, distance) {
    //                 return accumulator + distance.distance;
    //             }, 0))
    //
    //             setUserOneDistanceScore(metersToKM(userOneMonthScore))
    //             setUserTwoDistanceScore(metersToKM(userTwoMonthScore))
    //             setUserThreeDistanceScore(metersToKM(userThreeMonthScore))
    //             setLoading(false)
    //
    //         } catch (error) {
    //             console.error("OH NO, something went wrong");
    //             setLoading(true);
    //         }
    //     }
    //     calculateDataRides();
    // }, [fbData, userOneStravaActivities, userTwoStravaActivities, userThreeStravaActivities]);
    //
    // // console.log('scores distance user two=>', userOneDistanceScore)
    // // console.log('scores distance user two=>', userTwoDistanceScore)
    // // console.log('scores distance user three=>', userThreeDistanceScore)
    //
    // const data = React.useMemo(
    //     () => [
    //
    //         {
    //             col1: '1',
    //             col2: `${userOneName}`,
    //             col3: `${userOneDistanceScore}`,
    //         },
    //         {
    //             col1: '2',
    //             col2: `${userTwoName}`,
    //             col3: `${userTwoDistanceScore}`,
    //         },
    //         {
    //             col1: '3',
    //             col2: `${userThreeName}`,
    //             col3: `${userThreeDistanceScore}`,
    //         },
    //     ],
    //     []
    // )
    //
    // const columns = useMemo(
    //     () => [
    //         {
    //             Header: 'Position',
    //             accessor: 'col1', // accessor is the "key" in the data
    //         },
    //         {
    //             Header: 'Name',
    //             accessor: 'col2',
    //         },
    //         {
    //             Header: 'Score',
    //             accessor: 'col3', // accessor is the "key" in the data
    //         },
    //     ],
    //     []
    // )
    //
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    // } = useTable({columns, data}, useSortBy);

    return (
        <>{loading && (<p>Loading...</p>)}
        <div>
            {/*<table {...getTableProps()}>*/}
            {/*    <thead>*/}
            {/*    {headerGroups.map(headerGroup => (*/}
            {/*        <tr {...headerGroup.getHeaderGroupProps()}>*/}
            {/*            {headerGroup.headers.map(column => (*/}
            {/*                <th*/}
            {/*                    {...column.getHeaderProps(column.getSortByToggleProps())}*/}
            {/*                >*/}
            {/*                    {column.render('Header')}*/}
            {/*                    <span>*/}
            {/*           {column.isSorted*/}
            {/*               ? column.isSortedDesc*/}
            {/*                   ? '🔽'*/}
            {/*                   : '🔼'*/}
            {/*               : ''}*/}
            {/*        </span>*/}
            {/*                </th>*/}
            {/*            ))}*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </thead>*/}
            {/*    <tbody {...getTableBodyProps()}>*/}
            {/*    {rows.map(row => {*/}
            {/*        prepareRow(row)*/}
            {/*        return (*/}
            {/*            <tr {...row.getRowProps()}>*/}
            {/*                {row.cells.map(cell => {*/}
            {/*                    return (*/}
            {/*                        <td*/}
            {/*                            {...cell.getCellProps()}*/}
            {/*                        >*/}
            {/*                            {cell.render('Cell')}*/}
            {/*                        </td>*/}
            {/*                    )*/}
            {/*                })}*/}
            {/*            </tr>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
        </>
    );
}

export default LeaderboardTableClimbing;