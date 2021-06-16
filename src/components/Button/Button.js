import "./Button.css"
import {Link, useHistory} from "react-router-dom";
export default function Button({text, toggleIsAuthenticated, isAuthenticated, redirect}) {
    const history = useHistory();

    function handleClick() {
        if(redirect === "home") {
            toggleIsAuthenticated(!isAuthenticated)
            history.push("/");
            console.log("klikt dit")
        } if (redirect === "message") {
            history.push("/form-submitted");
        }
    }

    return (
        <Link>
        <button className="button" onClick={handleClick}>
            <span>{text}</span>
        </button>
        </Link>
    )
}