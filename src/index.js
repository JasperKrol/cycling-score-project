import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import StravaRideContextProvider from "./contexts/StravaContext";
import AuthContextProvider from "./contexts/AuthContext";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
            <StravaRideContextProvider>
                <App/>
            </StravaRideContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

