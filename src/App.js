import './App.css';
// import firebase from "./firebase"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import YourScores from "./pages/Yourscores";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import './components/Navbar.css';
import FormSubmitted from "./pages/FormSubmitted";
import {useState} from "react";


function App() {

    const [isAuthenticated, toggleIsAuthenticated] = useState(false)

    return (
        <>
            <Router>
                <Navbar
                    isAuthenticated={isAuthenticated}
                    toggleIsAuthenticated={toggleIsAuthenticated}/>
                <Switch>

                    <Route exact path="/">
                        {isAuthenticated ? <Home/> : <Redirect to="/login"/>}
                    </Route>

                    <Route path="/login">
                        <Login
                            isAuthenticated={isAuthenticated}
                            toggleIsAuthenticated={toggleIsAuthenticated}/>
                    </Route>

                    <Route path="/your-scores">
                        {isAuthenticated ? <YourScores/> : <Redirect to="/login"/>}
                    </Route>

                    <Route path="/leaderboards">
                        {isAuthenticated ? <Leaderboards/> : <Redirect to="/login"/>}
                    </Route>

                    <Route path="/profile">
                        {isAuthenticated ? <Profile
                                isAuthenticated={isAuthenticated}
                                toggleIsAuthenticated={toggleIsAuthenticated}
                            />
                            :
                            <Redirect to="/login"/>}
                    </Route>

                    <Route path="/contact">
                        <Contact/>
                    </Route>

                    <Route path="/form-submitted">
                        {isAuthenticated ? <FormSubmitted/> : <Redirect to="/login"/>}
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
