import "../components/FormSubmitted.css"
import Gif from "../assets/giphy.gif"
import { useHistory} from "react-router-dom";

export default function FormSubmitted() {

    const history = useHistory();

    function handleClick() {
        history.push("/");
    }

    return (
        <>
            <div className="container">
                <section className="tile">
                    <div className="close-button">
                        <i
                            onClick={handleClick}
                            className='fas fa-times fa-2x'/>
                    </div>

                    <h1>Thank you for your message!</h1>
                    <img
                        className="gif"
                        src={Gif} alt="Cycling man"/>

                </section>
            </div>
        </>
    )
}