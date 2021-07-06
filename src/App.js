// import firebase from "./firebase"
import {Switch, Route} from 'react-router-dom';
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
import SignUp from "./pages/SignUpPage/SignUp";
import PrivateRoute from "./components/PrivateRoute";


function App() {

    return (
        <>
            <Navbar/>
            <Switch>
                <PrivateRoute exact path="/">
                    <Home/>
                </PrivateRoute>

                <Route path="/login">
                    <Login/>
                </Route>

                <Route path="/sign-up">
                    <SignUp/>
                </Route>

                <PrivateRoute exact path="/your-scores">
                    <YourScores/>
                </PrivateRoute>

                <PrivateRoute exact path="/leaderboards">
                   <Leaderboards/>
                </PrivateRoute>

                <PrivateRoute exact path="/profile">
                   <Profile/>
                </PrivateRoute>

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