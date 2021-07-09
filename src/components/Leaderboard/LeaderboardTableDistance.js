import React, {useEffect, useState} from 'react';
import {useTable, useSortBy} from 'react-table';
// import {useFirebaseContext} from "../../contexts/FirebaseContext";
import firebase from "../../contexts/Firebase";

function LeaderboardTableClimbing() {

    // const [firebaseUser, setFirebaseUser] = useState('')
    // const [userD, setPassword] = useState('')
    const [users, setUserS] = useState([])

    const db = firebase.firestore()

    useEffect(() => {
        db.collection("stravaUserProfile").doc().onSnapshot((snapshot => {
            console.log(snapshot)
        } ))

        }, []);


    const data = React.useMemo(
        () => [
            {
                col1: '1',
                col2: 'Jasper',
                col3: '2000m',
            },
            {
                col1: '2',
                col2: 'Pieter',
                col3: '200m',
            },
            {
                col1: '3',
                col2: 'Henk',
                col3: '20m',
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