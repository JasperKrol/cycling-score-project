import "../components/Contacts.css"

function Contact() {
    return (
        <div className="container">
            <section className="tile1">

                <div className="about-us">
                <h3>About us:</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, cum enim eveniet fuga iusto
                        odio optio voluptas. At atque iste perferendis quaerat. Aliquid asperiores culpa, eius excepturi
                        explicabo iste voluptas.</p>
                </div>
                <div className="company-details">
                    <i className="fas fa-map-marked-alt"/>
                    <i className="fas fa-phone-alt"/>
                    <i className="far fa-comment"/>
                </div>
                <a href="https://www.strava.com/"><p className='go-to-strava'>Go to strava<i
    className="fas fa-arrow-circle-right"/></p></a>


            </section>
            <section className="tile2">
                <div className="about-us">
                    <h3>Contact us:</h3>
                    <label htmlFor="contact-information">Name:
                        <input type="text"/>
                    </label>
                </div>

            </section>
        </div>
    )
}

export default Contact