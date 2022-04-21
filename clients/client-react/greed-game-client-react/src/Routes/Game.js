import { Outlet } from "react-router-dom";


function Game(props) {

    return (
        <div className="game-field">
            <h1>Game</h1>
            <Outlet />
        </div>
    )
}

export default Game;