import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/navbar.css";
import { useAuthContext } from "../../context/auth/AuthContext";

const Navbar: React.FC = () => {

    const { user, ipAddress } = useAuthContext();
    const navigate = useNavigate();

    // State : Manage Hower Effect
    const [profileHower, setProfileHower] = useState<boolean>(false);
    const [helpHower, setHelpHower] = useState<boolean>(false);
    const [galleryHower, setGalleryHower] = useState<boolean>(false);
    const [notificationHower, setNotificationHower] = useState<boolean>(false);
    const [aboutHower, setAboutHower] = useState<boolean>(false);
    const [userHower, setUserHower] = useState<boolean>(false);

    const authBtnClickFN = () =>{
        if(user && user.username){
            navigate(`/user/${user.username}`);

        }else{
            navigate(`/auth/login`);
        }
    }

    return (
        <div className="navbar-component-element">
            <div className="profile-container">
                <img
                    onMouseEnter={() => setUserHower(true)}
                    onMouseOut={() => setUserHower(false)}
                    src={user?`${ipAddress}/user/image/${user.profilePicture}`:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw1uf9RrVgeORLhJ13bIaa34&ust=1738919259106000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCF2ZfZrosDFQAAAAAdAAAAABAJ"}
                    className="navbar-btn-element" />
                <div className={`nav-item-label-element user-hower ${userHower ? "hower-visible" : ""}`}>{user?user.username:"guest"}</div>
            </div>
            <Link to={"/about"} className="navbar-link-element">
                <button
                    onMouseEnter={() => setAboutHower(true)}
                    onMouseOut={() => setAboutHower(false)}
                    className="navbar-btn-element" style={{ fontWeight: "bolder" }}>A</button>
                <div className={`nav-item-label-element about-hower ${aboutHower ? "hower-visible" : ""}`}>About us</div>
            </Link>
            <Link to={"/notification"} className="navbar-link-element">
                <button
                    onMouseEnter={() => setNotificationHower(true)}
                    onMouseOut={() => setNotificationHower(false)}
                    className="navbar-btn-element">🔔</button>
                <div className={`nav-item-label-element notification-hower ${notificationHower ? "hower-visible" : ""}`}>Notification</div>
            </Link>
            <Link to={"/help"} className="navbar-link-element">
                <button
                    onMouseEnter={() => setHelpHower(true)}
                    onMouseOut={() => setHelpHower(false)}
                    className="navbar-btn-element" style={{ fontWeight: "bolder" }}>H</button>
                <div className={`nav-item-label-element help-hower ${helpHower ? "hower-visible" : ""}`}>Help</div>
            </Link>
            <Link to={"/img-gallery"} className="navbar-link-element">
                <button
                    onMouseEnter={() => setGalleryHower(true)}
                    onMouseOut={() => setGalleryHower(false)}
                    className="navbar-btn-element">💻</button>
                <div className={`nav-item-label-element ${galleryHower ? "hower-visible" : ""}`}> Gallery</div>
            </Link>
            <div className="profile-container">
                <button
                    onMouseEnter={() => setProfileHower(true)}
                    onMouseOut={() => setProfileHower(false)}
                    onClick={authBtnClickFN}
                    className="navbar-btn-element">🧑🏻‍💼</button>
                <div className={`nav-item-label-element ${profileHower ? "hower-visible" : ""}`}>Profile</div>
            </div>
        </div>
    );
}

export default Navbar;