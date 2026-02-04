import MiniDrawer from "../components/MiniDrawer"
import {Outlet} from "react-router"
import useAuth from '../store/authStore.js';
import {Navigate} from 'react-router';

export default function DashboardLayout()
{
    const {user, authLoading} = useAuth();

    if(authLoading)
    {
        return(<div>Loading...</div>)
    }

    if(!user)
    {
        return <Navigate to="/" replace />;
    }

    return(<>
        <MiniDrawer>
            <Outlet />
        </MiniDrawer>
    </>)
}