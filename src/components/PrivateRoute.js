import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useAuthContext} from "../contexts/AuthContext"

function PrivateRoute({component, path}) {
    const {user} = useAuthContext()
    return (
        <Route path={path}>
            {user ? component : <Redirect to="/login"/>}
        </Route>
    )
}
export default PrivateRoute;