import React from "react";
import "../../css/alert.css";
import { useAlertContext } from "../../context/alert/AlertContext";

const Alert:React.FC = () =>{

    const {message} = useAlertContext();

    return(
        <div className={`alert-component-element ${message?"show-alert-message": ""}`}>
            {message}
        </div>
    )
}

export default Alert;