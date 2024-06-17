import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"

const Layout = () => {
    return (
        <div className="min-h-screen m-0 bg-black w-full relative">
            <SideBar />
            <div className="pl-64">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout