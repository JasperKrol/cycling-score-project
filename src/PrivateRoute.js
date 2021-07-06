import React  from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {user} = useAuthContext;
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!user ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};


export default PrivateRoute