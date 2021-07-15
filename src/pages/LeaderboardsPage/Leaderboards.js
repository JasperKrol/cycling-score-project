import "../../components/Leaderboard/Leaderboards.css"
import LeaderboardTableClimbing from "../../components/Leaderboard/LeaderboardTableClimbing";
import LeaderboardTableDistance from "../../components/Leaderboard/LeaderboardTableDistance";
import LeaderboardTableSpeed from "../../components/Leaderboard/LeaderboardTableSpeed";
import Tile from "../../components/Tile/Tile";
import React, {useRef} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import Button from "../../components/Button/Button";

function Leaderboards() {

    const {pageLoading} = useAuthContext()
    const leaderboardRef = useRef()

    function handleBackClick(){
        leaderboardRef.current({ behavior: 'smooth' })
    }

    return (
        <>
            <div className="container climbing ">
                    <Tile>
                        <h1 ref={leaderboardRef}>Climbing leaderboard</h1>
                        {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                            <div className="table">
                                <LeaderboardTableClimbing/>
                            </div>
                        </>)}
                        <input
                            type="button"
                            onClick={handleBackClick}/>
                        <Button
                        text="Next"
                        />
                    </Tile>
            </div>

            <div className="container distance">
                    <Tile>
                        <h1 ref={leaderboardRef}>Distance leaderboard</h1>
                        <Button
                            text="Previous"
                        />
                        {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                            <div className="table">
                                <LeaderboardTableDistance/>
                            </div>
                        </>)}
                        <Button
                            text="Next"
                        />
                    </Tile>

            </div>

            <div className="container speed ">
                    <Tile>

                        <h1 ref={leaderboardRef}>Average Speed leaderboard</h1>
                        {pageLoading ? (<><h2>Loading, please wait</h2></>) : (<>
                            <div className="table">
                                <LeaderboardTableSpeed/>
                            </div>
                        </>)}
                        <Button
                            text="Previous"
                        />
                    </Tile>
            </div>
        </>
    )
}

export default Leaderboards