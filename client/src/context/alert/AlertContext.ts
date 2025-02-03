import React, { createContext, useContext } from "react";

// Interface : Defines Context Types
interface AlertContextTypes {
    message: String;
    setAlertMessageFN: (message: string) => void;
}

const AlertContext = createContext<AlertContextTypes | undefined>(undefined);
const useAlertContext = () => {

    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("Can't use alert context coutside of the providers")
    }

    return context;
}

export {
    AlertContext,
    useAlertContext
}