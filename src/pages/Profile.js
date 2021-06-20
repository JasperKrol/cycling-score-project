import "../components/Profile.css"
import Button from "../components/Button/Button";

function Profile({toggleIsAuthenticated, isAuthenticated}) {




    return (
        <div className="container">
            <section className="contact-tile">
                <h3>Hi #user#!</h3>
                <h3>Want to ride your bike? Log out on the button below</h3>

                    <Button
                        text="Bye Bye!"
                        redirect="home"
                        toggleIsAuthenticated={toggleIsAuthenticated}
                        isAuthenticated={isAuthenticated}
                    />


            </section>
        </div>
    )
}

export default Profile