import "../components/Leaderboard/Leaderboards.css"
import LeaderboardTableClimbing from "../components/Leaderboard/LeaderboardTableClimbing";
import LeaderboardTableDistance from "../components/Leaderboard/LeaderboardTableDistance";
import LeaderboardTableSpeed from "../components/Leaderboard/LeaderboardTableSpeed";


function Leaderboards () {

    return (
        <>
                <div className="container climbing ">
                    <section className="leaderboard-tile">
                        <h1>Leaderboard for Climbing</h1>
                        <div className="dashboard">
                            <LeaderboardTableClimbing/>
                        </div>
                    </section>
                </div>


                <div className="container distance">
                    <section className="leaderboard-tile">
                        <h1>Leaderboard for Distance</h1>
                        <div className="dashboard">
                            <LeaderboardTableDistance/>
                        </div>
                    </section>
                </div>

                <div className="container speed ">
                    <section className="leaderboard-tile">
                        <h1>Leaderboard for AVG Speed</h1>
                        <div className="dashboard">
                            <LeaderboardTableSpeed/>
                        </div>
                    </section>
                </div>


        </>
    )
}

export default Leaderboards