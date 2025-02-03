import React, { useState } from "react";
import { AlertContext } from "./AlertContext";

const AlertProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // State : Manage Alert Message
    const [message, setMessage] = useState<string>("");

    // Function : Set Alert Message For 3 Seconds
    const setAlertMessageFN = (message: string) => {

        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000)
    }

    return (
        <AlertContext.Provider value={{ message, setAlertMessageFN }}>
            {children}
        </AlertContext.Provider>
    );
}

export default AlertProviders;