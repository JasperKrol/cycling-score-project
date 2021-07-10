import React, {useEffect} from 'react';
import {useTable, useSortBy} from 'react-table';
import dataWilleke from "../../data/DataWilleke.json"
import dataJasper from "../../data/DataJasper.json"
import dataPeter from "../../data/DataPeter.json"
import {useFirebaseContext} from "../../contexts/FirebaseContext";

function LeaderboardTableClimbing() {

    const {firebaseUsers , firebaseStravaData } = useFirebaseContext()

    let date = new Date()

    // voor scores en meer ritten zet ik de maand op 06 dit doe ik door de +1 te verwijderen
    //originele functie hieronder
    // let currentMonth = date.getFullYear()+'-'+(date.getMonth() + 1).toString().padStart(2, "0");
    let currentMonth = date.getFullYear() + '-' + (date.getMonth()).toString().padStart(2, "0");
    // console.log("currentmonth", currentMonth, "currentYear", currentYearNumber)

    //Get all ride activities from "strava"

    useEffect(()=> {
        if (!firebaseUsers) return
        // console.log("firebaseUsers:", firebaseUsers)
        console.log("firebaseStravaData:", firebaseStravaData)

        // concat arrays
        const allData = firebaseUsers.concat(firebaseStravaData)
        // console.log("gaat dit goed?", allData)

        // get user names
        const profielWilleke = firebaseUsers[2]
        // console.log("firebasewilleke?",profielWilleke)

    },[])


    const ridesOnlyWilleke = dataWilleke.filter((ride) => {
        return ride.type === "Ride"
    })
    const ridesOnlyJasper = dataJasper.filter((ride) => {
        return ride.type === "Ride"
    })
    const ridesOnlyPeter = dataPeter.filter((ride) => {
        return ride.type === "Ride"
    })

    // Filter ride activities to current month
    const willekeMonthScore = ridesOnlyWilleke.filter((currentMonthRide) => {
        return currentMonthRide.start_date.substring(0, 7) === currentMonth
    })
    const jasperMonthScore = ridesOnlyJasper.filter((currentMonthRide) => {
        return currentMonthRide.start_date.substring(0, 7) === currentMonth
    })
    const peterMonthScore = ridesOnlyPeter.filter((currentMonthRide) => {
        return currentMonthRide.start_date.substring(0, 7) === currentMonth
    })
    // console.log("willekesMonthScore", willekesMonthScore)

    // calculate current monthly climbing scores and put them on the page
    const willekeClimbingScore = Math.round(willekeMonthScore.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    const jasperClimbingScore = Math.round(jasperMonthScore.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    const peterClimbingScore = Math.round(peterMonthScore.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    // console.log("metersw?", willekeClimbingScore, "metersP?",peterClimbingScore, "metersj?", jasperClimbingScore)


    const data = React.useMemo(
        () => [
            {
                col1: '1',
                col2: `${dataWilleke[0].firstname}`,
                col3: `${willekeClimbingScore} meters`,
            },
            {
                col1: '2',
                col2: `${dataPeter[0].firstname}`,
                col3: `${peterClimbingScore} meters`,
            },
            {
                col1: '3',
                col2: `${dataJasper[0].firstname}`,
                col3: `${jasperClimbingScore} meters`,
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