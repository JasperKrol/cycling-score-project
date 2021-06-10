import './App.css';
import firebase from "./firebase"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import YourScores from "./pages/Yourscores";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import './components/Navbar.css';
import FormSubmitted from "./pages/FormSubmitted";



function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route path="/login">
                        <Login/>
                    </Route>

                    <Route path="/your-scores">
                        <YourScores/>
                    </Route>

                    <Route path="/leaderboards">
                        <Leaderboards/>
                    </Route>

                    <Route path="/profile">
                        <Profile/>
                    </Route>

                    <Route path="/contact">
                        <Contact/>
                    </Route>

                    <Route path="/form-submitted">
                        <FormSubmitted/>
                    </Route>

                </Switch>
            </Router>
        </>
    );
}

export default App;
