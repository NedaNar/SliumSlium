import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav
      className="white valign-wrapper"
      style={{
        height: "100px",
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          height: "100px",
          width: "100%",
          padding: "0 5%",
        }}
      >
        <a href="/" className="brand-logo left">
          <img
            src="/images/logo.png"
            alt="logo"
            style={{ height: "80px", marginTop: "10px" }}
          />
        </a>

        <ul className="right">
          {(!user || user.type === 1) && (
            <li>
              <a
                style={{
                  height: "100px",
                  color: "#333",
                  alignContent: "center",
                }}
                href="/"
              >
                Jobs
              </a>
            </li>
          )}
          {user?.type === 0 && (
            <li>
              <a
                href="/"
                style={{
                  height: "100px",
                  color: "#333",
                  alignContent: "center",
                }}
              >
                Created positions
              </a>
            </li>
          )}
          {user && (
            <li>
              <a
                href="/"
                style={{
                  height: "100px",
                  color: "#333",
                  alignContent: "center",
                }}
                className="valign-wrapper"
              >
                <i className="material-icons">account_circle</i>
                &nbsp;My Profile
              </a>
            </li>
          )}
          {!user && (
            <li
              style={{
                height: "100px",
                alignContent: "center",
                padding: "0 1rem",
                color: "white",
              }}
            >
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
            <li
              style={{
                height: "100px",
                alignContent: "center",
                padding: "0 1rem",
                color: "white",
              }}
            >
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
