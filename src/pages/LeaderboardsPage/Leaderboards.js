import "../../components/Leaderboard/Leaderboards.css"
import LeaderboardTableClimbing from "../../components/Leaderboard/LeaderboardTableClimbing";
import LeaderboardTableDistance from "../../components/Leaderboard/LeaderboardTableDistance";
import LeaderboardTableSpeed from "../../components/Leaderboard/LeaderboardTableSpeed";
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import Button from "../../components/Button/Button";
import {Link } from 'react-scroll'


function Leaderboards() {

    const {pageLoading} = useAuthContext()


    return (
        <>
            <div
                className="container climbing"
                id="climbing">
                <Tile>
                    <h1>Climbing leaderboard</h1>
                    {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="table">
                            <LeaderboardTableClimbing/>
                        </div>
                    </>)}
                    <Link
                        to="distance"
                        spy={true}
                        smooth={true}>
                        <Button
                            text="Next"
                        />
                    </Link>
                </Tile>
            </div>

            <div
                className="container distance"
                id="distance"
            >
                <Tile>
                    <h1>Distance leaderboard</h1>
                    <Link
                        to="climbing"
                        spy={true}
                        smooth={true}>
                        <Button
                            text="Previous"
                        />
                    </Link>
                    {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="table">
                            <LeaderboardTableDistance/>
                        </div>
                    </>)}
                    <Link
                        to="speed"
                        spy={true}
                        smooth={true}>
                        <Button
                            text="Next"
                        />
                    </Link>
                </Tile>

            </div>

            <div
                className="container speed"
                id="speed">
                <Tile>
                    <h1>Average Speed leaderboard</h1>
                    {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="table">
                            <LeaderboardTableSpeed/>
                        </div>
                    </>)}
                    <Link
                        to="distance"
                        spy={true}
                        smooth={true}>
                        <Button
                            text="Previous"
                        />
                    </Link>
                </Tile>
            </div>
        </>
    )
}

export default Leaderboards