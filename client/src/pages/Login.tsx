import React, { useEffect, useState } from "react";
import "../css/authPage.css";
import { useAlertContext } from "../context/alert/AlertContext";
import { useAuthContext } from "../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Interface : Defines Form Input Types
interface InputTypes {
    userInput: string;
    password: string;
}

const Login: React.FC = () => {

    const { setAlertMessageFN } = useAlertContext();
    const { token, user, handleLoginFN } = useAuthContext();
    const navigate = useNavigate();

    // State : Manage Input
    const [input, setInput] = useState<InputTypes>({
        userInput: "",
        password: ""
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
        setAlertMessageFN("HEllo")

        if (!input.password || !input.userInput) {
            setAlertMessageFN("All fields are required !");
            return;
        }

        handleLoginFN(input.userInput, input.password);

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
                <h2 className="auth-heading-element">Login To ImageHub</h2>
                <div className="auth-input-container">
                    <label htmlFor="userInput">username | email address :</label>
                    <input
                        type="text"
                        name="userInput"
                        value={input.userInput}
                        id="userInput"
                        autoCorrect="off"
                        placeholder="type your email or username here"
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
                <Link to={"/forget-password"} className="forget-pass-element">Forget Password?</Link>
                <button
                    type="button"
                    className="auth-submit-btn"
                    onClick={handleSubmitFN}
                >
                    Login To Your Account
                </button>
                <p className="redirection-link">
                    Don't have an account?<Link className="redirection-link-element" to={"/auth/signup"}> create a free account.</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;