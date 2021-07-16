import "./FormSubmitted.css"
import Gif from "../../assets/giphy.gif"
import { useHistory } from "react-router-dom";
import Tile from "../../components/Tile/Tile";

export default function FormSubmitted() {

    const history = useHistory();

    function handleClick() {
        history.push("/home");
    }

    return (
        <>
            <div className="container">
                <Tile>
                    <div className="close-button">
                        <i
                            onClick={handleClick}
                            className='fas fa-times fa-2x'/>
                    </div>

                    <h1>Thank you for your message!</h1>
                    <img
                        className="gif"
                        src={Gif} alt="Cycling man"/>
                </Tile>
            </div>
        </>
    )
}