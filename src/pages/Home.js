import "../components/Home.css"

function Home (props) {
    console.log(props)
    return (
      <>
          <div className="container">
              <section className="tile">
                  <h3>Welcome "User"!</h3>
                  <div className="user-photo">
                      <i className="far fa-user"/>
                  </div>
                  <div className="home-text">
                      <p>View the leaderboards to plan you next trip or training!</p>
                  </div>
              </section>
          </div>
      </>
    )
}

export default Home