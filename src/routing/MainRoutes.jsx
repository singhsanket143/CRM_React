import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/home/Home";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default MainRoutes;