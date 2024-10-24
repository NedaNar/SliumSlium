import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "./signUpPage.css";
import { UserContext } from "../context/UserContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<0 | 1>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
      type: role,
      jobOffers: [],
    };
    signUp(user);
  };

  return (
    <div className="container center-align">
      <div className="card" style={{ padding: "2rem", marginTop: "2rem" }}>
        <h4 className="center-align" style={{ margin: "1rem 0 3rem" }}>
          Sign in
        </h4>
        <div className="tab">
          <button
            className={`tab-link ${role === 1 ? "active" : ""}`}
            onClick={() => setRole(1)}
          >
            Job Seekers
          </button>
          <button
            className={`tab-link ${role === 0 ? "active" : ""}`}
            onClick={() => setRole(0)}
          >
            Employers
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="loginForm">
            <div className="input-field">
              <input
                id="name"
                type="text"
                className="validate"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">
                {role === 1 ? "Name & Surname" : "Company name"}
              </label>
            </div>
            <div className="input-field">
              <input
                id="email"
                type="email"
                className="validate"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">
                {role === 1 ? "Email" : "Company email"}
              </label>
            </div>
            <div className="input-field">
              <input
                id="password"
                type="password"
                className="validate"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <button
              className="btn-large indigo lighten-1 signUpButton"
              type="submit"
            >
              Sign in
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>

      <div
        className="indigo lighten-5"
        style={{
          margin: "1.8rem 0 0",
          padding: "0.8rem 0 1.6rem",
          borderRadius: "4px",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          <strong>Already have an account?</strong>
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="btn indigo lighten-2"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
