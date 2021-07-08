import "../../components/Leaderboard/Leaderboards.css"
import LeaderboardTableClimbing from "../../components/Leaderboard/LeaderboardTableClimbing";
import LeaderboardTableDistance from "../../components/Leaderboard/LeaderboardTableDistance";
import LeaderboardTableSpeed from "../../components/Leaderboard/LeaderboardTableSpeed";
import Tile from "../../components/Tile/Tile";


function Leaderboards () {



    return (
        <>
                <div className="container climbing ">
                    <Tile >
                        <h1>Leaderboard for Climbing</h1>
                        <div className="dashboard">
                            <LeaderboardTableClimbing/>
                        </div>
                    </Tile>
                </div>


                <div className="container distance">
                    <Tile>
                        <h1>Leaderboard for Distance</h1>
                        <div className="dashboard">
                            <LeaderboardTableDistance/>
                        </div>
                    </Tile>
                </div>

                <div className="container speed ">
                    <Tile>
                        <h1>Leaderboard for AVG Speed</h1>
                        <div className="dashboard">
                            <LeaderboardTableSpeed/>
                        </div>
                    </Tile>
                </div>


        </>
    )
}

export default Leaderboards