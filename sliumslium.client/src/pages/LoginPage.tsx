import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import "./loginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container center-align">
      <div className="card login__box">
        <h4 className="center-align">Log in</h4>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-field login__email">
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
            <div className="input-field login__password">
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
            <button className="btn-large indigo" type="submit">
              Login
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
      <div className="indigo lighten-5 login__signUp">
        <p className="login__noAccount">
          <strong>Don't have an account yet?</strong>
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="btn indigo lighten-1"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
