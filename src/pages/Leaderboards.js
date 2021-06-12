import "../components/Leaderboards.css"
import LeaderBoardTable from "../components/LeaderboardTable";


function Leaderboards () {

    return (
        <>
                <div className="container">
                    <section className="leaderboard-tile">
                        <h1>Leaderboard for Climbing</h1>
                        <div className="dashboard">
                            <LeaderBoardTable/>
                        </div>
                    </section>
                </div>


                <div className="container">
                    <section className="leaderboard-tile">
                        <h1>Leaderboard for Distance</h1>
                        <div className="dashboard">
                            <LeaderBoardTable/>
                        </div>
                    </section>
                </div>

                <div className="container">
                    <section className="leaderboard-tile">
                        <h1>Leaderboard for AVG Speed</h1>
                        <div className="dashboard">
                            <LeaderBoardTable/>
                        </div>
                    </section>
                </div>


        </>
    )
}

export default Leaderboards