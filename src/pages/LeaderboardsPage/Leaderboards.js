import "../../components/Leaderboard/Leaderboards.css"
import LeaderboardTableClimbing from "../../components/Leaderboard/LeaderboardTableClimbing";
import LeaderboardTableDistance from "../../components/Leaderboard/LeaderboardTableDistance";
import LeaderboardTableSpeed from "../../components/Leaderboard/LeaderboardTableSpeed";
import Tile from "../../components/Tile/Tile";
import React, {useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";

function Leaderboards() {

    const {pageLoading} = useAuthContext()

    return (
        <>
            <div className="container climbing ">
                <Tile>
                    <h1>Leaderboard for Climbing</h1>
                    {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="dashboard">
                            <LeaderboardTableClimbing/>
                        </div>
                    </>)}

                </Tile>
            </div>


            <div className="container distance">
                <Tile>
                    <h1>Leaderboard for Distance</h1>
                    {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="dashboard">
                            <LeaderboardTableDistance/>
                        </div>
                    </>)}
                </Tile>
            </div>

            <div className="container speed ">
                <Tile>
                    <h1>Leaderboard for Average Speed</h1>
                    {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="dashboard">
                            <LeaderboardTableSpeed/>
                        </div>
                    </>)}
                </Tile>
            </div>


        </>
    )
}

export default Leaderboards