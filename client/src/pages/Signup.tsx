import React, { useEffect, useState } from "react";
import "../css/authPage.css";
import { useAlertContext } from "../context/alert/AlertContext";
import { useAuthContext } from "../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Interface : Defines Form Input Types
interface InputTypes {
    username: string;
    emailAddress: string;
    fullName: string;
    password: string;
    coPassword: string;
}

const Signup: React.FC = () => {

    const { setAlertMessageFN } = useAlertContext();
    const { token, user, handleSignupFN } = useAuthContext();
    const navigate = useNavigate();

    // State : Manage Input
    const [input, setInput] = useState<InputTypes>({
        username: "",
        password: "",
        fullName: "",
        emailAddress: "",
        coPassword: ""
    });

    // State : Manage Password Visibilit
    const [visiblitiy, setVisibilitiy] = useState<boolean>(false);

    // Function : Manage Change Event
    const handleChangeFN = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev, [name]: value
        }));
    }

    // Function : Handle Submit Event
    const handleSubmitFN = () => {

        if (!input.fullName || !input.password || !input.emailAddress || !input.coPassword || !input.username) {
            setAlertMessageFN("All fields are required !");
            return;
        }

        if(input.password !== input.coPassword){
            setAlertMessageFN("Password and confirm password doesn't match !");
            return;
        }

        handleSignupFN(input.username, input.fullName, input.password, input.emailAddress);

    }

    // Check The User Is Not Already Login
    useEffect(() => {
        if (token && user) {
            navigate("/home");
        }

        // Check For the Localstorage Data
        if (localStorage.getItem("token") && localStorage.getItem("user")) {
            navigate("/home");
        }

    }, [navigate, token, user])

    return (
        <div className="auth-main-container">
            <div className="auth-inner-container-element">
                <h2 className="auth-heading-element">Join ImageHub</h2>
                <div className="auth-input-container">
                    <label htmlFor="userInput">username :</label>
                    <input
                        type="text"
                        name="username"
                        value={input.username}
                        id="userInput"
                        autoComplete="off"
                        placeholder="select username for your profile"
                        onChange={(event) => handleChangeFN(event)}
                        className="auth-input-element"
                    />
                </div>
                <div className="auth-input-container">
                    <label htmlFor="emailAddress">Email Address :</label>
                    <input
                        type="text"
                        name="emailAddress"
                        value={input.emailAddress}
                        id="emailAddress"
                        autoComplete="off"
                        placeholder="Enter your email address here"
                        onChange={(event) => handleChangeFN(event)}
                        className="auth-input-element"
                    />
                </div>
                <div className="auth-input-container">
                    <label htmlFor="fullName">Full Name :</label>
                    <input
                        type="text"
                        name="fullName"
                        value={input.fullName}
                        id="fullName"
                        autoComplete="off"
                        placeholder="Enter your name here"
                        onChange={(event) => handleChangeFN(event)}
                        className="auth-input-element"
                    />
                </div>
                <div className="auth-input-container">
                    <label htmlFor="password">password :</label>
                    <input
                        type={visiblitiy ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="enter your password here"
                        value={input.password}
                        onChange={(event) => handleChangeFN(event)}
                        className="auth-input-element"
                    />
                    <button
                        type="button"
                        onClick={() => setVisibilitiy(!visiblitiy)}
                        className="pass-visibilty-btn"
                    >👁️</button>
                </div>
                <div className="auth-input-container">
                    <label htmlFor="coPassword">Confirm password :</label>
                    <input
                        type={visiblitiy ? "text" : "password"}
                        name="coPassword"
                        id="coPassword"
                        placeholder="Re-enter the password here"
                        value={input.coPassword}
                        onChange={(event) => handleChangeFN(event)}
                        className="auth-input-element"
                    />
                </div>
                <button
                    type="button"
                    className="auth-submit-btn"
                    onClick={handleSubmitFN}
                >
                    Create Your Account
                </button>
                <p className="redirection-link">
                   Already have an account?<Link className="redirection-link-element" to={"/auth/login"}> login.</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;