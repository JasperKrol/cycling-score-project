import "./Button.css"
import {Link, useHistory} from "react-router-dom";
export default function Button({text, toggleIsAuthenticated, isAuthenticated }) {
    const history = useHistory();

    function handleClick() {
            toggleIsAuthenticated(!isAuthenticated)
            history.push("/");
            console.log("klikt dit")
    }

    return (
        <Link>
        <button className="button" onClick={handleClick}>
            <span>{text}</span>
        </button>
        </Link>
    )
}