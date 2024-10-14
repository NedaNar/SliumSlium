import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container center-align">
      <div className="card" style={{ padding: "2rem", marginTop: "2rem" }}>
        <h4 className="center-align" style={{ margin: "1rem 0 3rem" }}>
          Log in
        </h4>
        <div>
          <form onSubmit={() => {}}>
            <div className="input-field" style={{ margin: "0 0 2rem" }}>
              <input
                id="email"
                type="email"
                className="validate"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field" style={{ margin: "0 0 3rem" }}>
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
            <button className="btn-large indigo lighten-1" type="submit">
              Login
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
          borderRadius: "4pz",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          <strong>Don't have an account yet?</strong>
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="btn indigo lighten-2"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
