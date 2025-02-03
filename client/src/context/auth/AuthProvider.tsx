import React, { useEffect, useState } from "react";
import { AuthContext, IUser } from "./AuthContext";
import { useAlertContext } from "../alert/AlertContext";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const IP = process.env.REACT_APP_IP_ADDRESS || "";
    const port = process.env.REACT_APP_SERVER_PORT || "";
    const ipAddress = IP + ":" + port;
    const { setAlertMessageFN } = useAlertContext();

    // State : Manage User Details
    const [user, setUser] = useState<IUser | null>(null);

    // State : Manage Token Details
    const [token, setToken] = useState<string>("");

    // Function : Handle Login
    const handleLoginFN = async (userInput: string, password: string) => {
        try {

        } catch (error: any) {
            console.log("Handl login function error :", error);
        }
    }

    // Function : Handle Signup
    const handleSignupFN = async (username: string, fullName: string, password: string, emailAddress: string) => {
        try {

        } catch (error: any) {
            console.log("Handl signup function error :", error);
        }
    }

    // Extract User Details From The Localstorage
    useEffect(() => {
        const LocalstorageData = {
            token: localStorage.getItem("token"),
            user: localStorage.getItem("user")
        }

        // If Localstorage Data Is Awailable Set The Value
        if (LocalstorageData.token && LocalstorageData.user) {
            const userParsedData = JSON.parse(LocalstorageData.user);

            setToken(token);
            setUser(userParsedData);
        }
    })

    return (
        <AuthContext.Provider value={{ ipAddress, handleLoginFN, handleSignupFN, user, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;