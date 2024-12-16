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
      <div className="card signUp__box">
        <h4 className="center-align signUp__title">Sign in</h4>
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

            <button className="btn-large indigo signUpButton" type="submit">
              Sign in
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>

      <div className="indigo lighten-5 signUp__login">
        <p className="signUp_text">
          <strong>Already have an account?</strong>
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="btn indigo lighten-1"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
