import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Alert from "../components/alert/Alert";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "../components/navbar/Navabar";

const Navigation: React.FC = () => {

    const location = useLocation().pathname;

    return (
        <>
            {(location !== "/auth/login" && location !== "/auth/signup") && <Navbar />}
            <Alert />
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
            </Routes>
        </>
    );
}

export default Navigation;