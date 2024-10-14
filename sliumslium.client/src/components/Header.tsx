import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    document.getElementById("loginBtn")!.onclick = function () {
      location.href = "/login";
    };
  }, []);

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
          <li>
            <a
              style={{
                height: "100px",
                color: "#333",
                alignContent: "center",
              }}
              href="#jobs"
            >
              Jobs
            </a>
          </li>
          <li>
            <a
              href="#about"
              style={{
                height: "100px",
                color: "#333",
                alignContent: "center",
              }}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#contact"
              style={{
                height: "100px",
                color: "#333",
                alignContent: "center",
              }}
            >
              Contact
            </a>
          </li>
          <li
            style={{
              height: "100px",
              alignContent: "center",
              padding: "0 1rem",
              color: "white",
            }}
          >
            <button id="loginBtn" className="btn indigo lighten-2">
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
