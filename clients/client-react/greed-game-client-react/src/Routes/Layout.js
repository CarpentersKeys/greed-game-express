import { Link } from "react-router-dom";

export { Layout };

function Layout() {
    return (
        <div className="layout">
            <div className="panel-hori">
                <nav className="nav-bar">
                    <ul>
                        <li><Link to="/game">Game</Link></li>
                        <li><Link to="/home">Home</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}