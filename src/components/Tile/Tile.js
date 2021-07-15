import "./Tile.css"

function Tile({children}) {

    return (
        <div className="tile">
            <section>
                {children}
            </section>
        </div>
    )
}

export default Tile
