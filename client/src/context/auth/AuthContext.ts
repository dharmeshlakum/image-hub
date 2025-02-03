import React, { createContext, useContext } from "react";

// Interface : Defines User Types
export interface IUser {
    id: string;
    username: string;
    profilePicture: string;
    fullName: string;
}

// Interface : Defines Context Types
interface AuthContextTypes {
    user: IUser | null;
    token: string;
    ipAddress: string;
    handleLoginFN: (userInput: string, password: string) => void;
    handleSignupFN: (username: string, fullName: string, password: string, emailAddress: string) => void;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);
const useAuthContext = () => {

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Can't use auth context outside of the auth providers !");
    }

    return context;
}

export {
    AuthContext,
    useAuthContext
}