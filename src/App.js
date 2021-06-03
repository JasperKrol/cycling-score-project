import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import YourScores from "./pages/Yourscores";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route path="/contact">
                        <Contact/>
                    </Route>

                    <Route path="/your-scores">
                        <YourScores/>
                    </Route>

                    <Route path="/leaderboards">
                        <Leaderboards/>
                    </Route>

                    <Route path="/leaderboards">
                        <Profile/>
                    </Route>

                </Switch>
            </Router>
        </>
    );
}

export default App;
