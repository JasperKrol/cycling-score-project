import "./Home.css"
import Tile from "../../components/Tile/Tile";

function Home () {

    return (
      <>
          <div className="container">
              <Tile>
                  <h3>Welcome "User"!</h3>
                  <div className="user-photo">
                      <i className="far fa-user"/>
                  </div>
                  <div className="home-text">
                      <p>View the leaderboards to plan you next trip or training!</p>
                  </div>
              </Tile>
          </div>
      </>
    )
}

export default Home