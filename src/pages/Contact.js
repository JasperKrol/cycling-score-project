import "../components/Contacts.css"

function Contact() {
    return (
        <div className="container">
            <section className="tile1">

                <h3>About us:</h3>
                <div className="user-photo">
                    <i className="far fa-user"/>
                </div>
                <div className="home-text">
                    <p>View the leaderboards to plan you next trip or training!</p>
                </div>

            </section>
            <section className="tile2">
                <h3>Contact us:</h3>
                <div className="user-photo">
                    <i className="far fa-user"/>
                </div>
                <div className="home-text">
                    <p>View the leaderboards to plan you next trip or training!</p>
                </div>
            </section>
        </div>
    )
}

export default Contact