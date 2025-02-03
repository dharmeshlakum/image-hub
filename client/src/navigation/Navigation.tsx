import React from "react";
import { Routes, Route } from "react-router-dom";
import Alert from "../components/alert/Alert";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Navigation: React.FC = () => {

    return (
        <>
            <Alert />
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
            </Routes>
        </>
    );
}

export default Navigation;