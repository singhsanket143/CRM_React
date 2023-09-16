import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/home/Home";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<AuthRoutes allowListedRoles={["engineer"]} />}>
                <Route path="/resolve" element={<div>Testing</div>} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default MainRoutes;