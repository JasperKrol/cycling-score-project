import React from 'react';
import {useTable, useSortBy} from 'react-table';
import {useFirebaseContext} from "../../contexts/FirebaseContext";

function LeaderboardTableClimbing() {

    const {
        fbData,
        userOne,
        userTwo,
        userThree,
        userOneStravaActivities,
        userTwoStravaActivities,
        userThreeStravaActivities,
        userOneName,
        userTwoName,
        userThreeName
    } = useFirebaseContext()

    const data = React.useMemo(
        () => [

            {
                col1: '1',
                col2: `${userOneName}`,
                col3: `$ meters`,
            },
            {
                col1: '2',
                col2: `${userTwoName}`,
                col3: `$ meters`,
            },
            {
                col1: '2',
                col2: `${userThreeName}`,
                col3: `$ meters`,
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