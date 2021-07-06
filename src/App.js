// import firebase from "./firebase"
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginPage/Login";
import Home from "./pages/HomePage/Home";
import Contact from "./pages/ContactPage/Contact";
import YourScores from "./pages/YourScoresPage/Yourscores";
import Leaderboards from "./pages/LeaderboardsPage/Leaderboards";
import Profile from "./pages/ProfilePage/Profile";
import WhyStrava from "./pages/WhyStravaPage/WhyStrava";
import './components/Navbar/Navbar.css';
import FormSubmitted from "./pages/FormSubmittedPage/FormSubmitted";
import {useState} from "react";
import SignUp from "./pages/SignUpPage/SignUp";


function App() {
// voor develop purpose even op true moet !isAuthenticated true zijn
    const [isAuthenticated, toggleIsAuthenticated] = useState(true)


    return (
        <>
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
                        toggleIsAuthenticated={toggleIsAuthenticated}
                    />
                </Route>

                <Route path="/sign-up">
                    <SignUp
                        isAuthenticated={isAuthenticated}
                        toggleIsAuthenticated={toggleIsAuthenticated}
                    />
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
                    <WhyStrava/>
                </Route>
            </Switch>
        </>
    );
}

export default App;