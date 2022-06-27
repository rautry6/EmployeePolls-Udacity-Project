import "./Login.css";
import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser.js";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let users = props.users;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username in users) {
      if (users[username].password === password) {
        props.dispatch(setAuthedUser(users[username]));
        nav("/homepage");
      } else {
        setError(true);
        setUsername("");
        setPassword("");
      }
    } else {
      setError(true);
      setUsername("");
      setPassword("");
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Employee Polls</h1>
      <h2 className="login-header">Login</h2>
      <div className="login-field">
        {error ? (
          <div>
            <h3 className="invalid-login" data-testid="failed-login-text">
              Invalid username or password
            </h3>{" "}
            <p className="username">Username</p>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              data-testid="failed-login-input"
              className="login-input"
            />
            <p className="password">Password</p>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              data-testid="failed-password-input"
              className="password-input"
            />
            <p>
              <button
                onClick={handleSubmit}
                data-testid="failed-submit-button"
                className="submit-button"
              >
                Login
              </button>
            </p>
          </div>
        ) : (
          <div>
            <p className="username">Username</p>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              data-testid="login-input"
              className="login-input"
            />
            <p className="password">Password</p>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              data-testid="password-input"
              className="password-input"
            />
            <p>
              <button
                onClick={handleSubmit}
                data-testid="submit-button"
                className="submit-button"
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(LoginPage);
