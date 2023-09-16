import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthRoutes({ allowListedRoles }) {
    const {role} = useSelector((state) => state.auth); // get the role of the current user from state
    return (
        <>
        {allowListedRoles.find((givenRole) => givenRole == role) ? <Outlet/> : <div>denied</div>}
        </>
    );
}

export default AuthRoutes;