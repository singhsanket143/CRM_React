import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import Signup from "../pages/auth/Signup";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default MainRoutes;