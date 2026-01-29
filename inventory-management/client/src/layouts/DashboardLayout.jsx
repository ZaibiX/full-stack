import MiniDrawer from "../components/MiniDrawer"
import {Outlet} from "react-router"

export default function DashboardLayout()
{

    return(<>
        <MiniDrawer>
            <Outlet />
        </MiniDrawer>
    </>)
}