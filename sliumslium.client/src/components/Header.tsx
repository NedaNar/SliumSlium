import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import "./header.css";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 900);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        {isSmallScreen && (
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <a href="/" className="brand-logo">
          <img src="/images/logo.png" alt="logo" />
        </a>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {(!user || user.type === 1) && (
            <li>
              <a href="/">Jobs</a>
            </li>
          )}
          {user?.type === 0 && (
            <li>
              <a href="/">Created positions</a>
            </li>
          )}
          {user && (
            <li>
              <a href="/" className="valign-wrapper">
                <i className="material-icons">account_circle</i>
                &nbsp;My Profile
              </a>
            </li>
          )}
          {!user && (
            <li>
              <button
                id="loginBtn"
                className="btn-small indigo lighten-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
          )}
          {user && (
            <li>
              <button
                id="logoutBtn"
                className="btn-small indigo lighten-2"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
