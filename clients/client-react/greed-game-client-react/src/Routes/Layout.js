import { Outlet } from "react-router-dom";

export { Layout };

function Layout() {
    return (
        <div className="layout">
            <div className="panel-hori">
            </div>
            <Outlet />
        </div>
    )
}