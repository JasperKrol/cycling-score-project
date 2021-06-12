import './App.css';
// import firebase from "./firebase"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import YourScores from "./pages/Yourscores";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import WhyStrava from "./pages/WhyStrava";
import './components/Navbar/Navbar.css';
import FormSubmitted from "./pages/FormSubmitted";
import {useState} from "react";



function App() {
// voor develop purpose even op true moet !isAuthenticated true zijn
    const [isAuthenticated, toggleIsAuthenticated] = useState(true)


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
                        <FormSubmitted/>
                    </Route>

                    <Route path="/why-strava">
                        <WhyStrava
                            isAuthenticated={isAuthenticated}
                            toggleIsAuthenticated={toggleIsAuthenticated}
                        />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
