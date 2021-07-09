import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import StravaRideContextProvider from "./contexts/StravaContext";
import AuthContextProvider from "./contexts/AuthContext";
import FirebaseContextProvider from "./contexts/FirebaseContext";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <FirebaseContextProvider>
            <AuthContextProvider>
                <StravaRideContextProvider>
                    <App/>
                </StravaRideContextProvider>
            </AuthContextProvider>
            </FirebaseContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

