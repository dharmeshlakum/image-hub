import React from "react";
import { Routes, Route } from "react-router-dom";
import Alert from "../components/alert/Alert";
import Login from "../pages/Login";

const Navigation: React.FC = () => {

    return (
        <>
            <Alert />
            <Routes>
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default Navigation;