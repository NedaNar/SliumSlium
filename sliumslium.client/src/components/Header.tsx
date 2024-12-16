import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import "./header.css";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <a href="/" className="brand-logo">
          <img src="/images/logo.png" alt="logo" />
        </a>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {(!user || user.type === 1) && (
            <li>
              <a href="/">Jobs</a>
            </li>
          )}
          {user && (
            <li>
              <a
                href={user.type === 1 ? `/applicant/${user.id_User}` : "/"}
                className="valign-wrapper"
              >
                <i className="material-icons">account_circle</i>
                &nbsp;My Profile
              </a>
            </li>
          )}
          {!user && (
            <li>
              <button
                id="loginBtn"
                className="btn-small indigo lighten-1"
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
                className="btn-small indigo lighten-1"
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
