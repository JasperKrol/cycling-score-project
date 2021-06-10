import "../components/Yourscores.css"

function YourScores () {
    return (
        <>
            <div className="container">
                <section className="tile">
                    <h2>You have climbed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-mountain fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#</h4>
                    </div>
                </section>

                <section className="tile">
                    <h2>Distance gained:</h2>
                    <div className="score-logo">
                        <i className="fas fa-route fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#</h4>
                    </div>
                </section>

                <section className="tile">
                    <h2>Your average speed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-tachometer-alt fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#</h4>
                    </div>
                </section>

            </div>
        </>
    )
}

export default YourScores