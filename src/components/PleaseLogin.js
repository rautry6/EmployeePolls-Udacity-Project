import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser.js";

const PleaseLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let users = props.users;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username in users) {
      if (users[username].password === password) {
        props.dispatch(setAuthedUser(users[username]));
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
      <h3>Please Login to View Page</h3>
      <h1>Employee Polls</h1>
      <h2>Login</h2>
      <div>
        {error ? (
          <div>
            <h3 itemID="invalid-login" data-testid = "failed-login-text">Invalid username or password</h3>{" "}
            <p>User</p>
            <input type="text" value={username} onChange={handleUsername} data-testid = "failed-login-input"/>
            <p>Password</p>
            <input type="password" value={password} onChange={handlePassword} data-testid = "failed-password-input" />
            <p>
              <button onClick={handleSubmit} data-testid = "failed-submit-button">Login</button>
            </p>
          </div>
        ) : (
          <div>
            <p>User</p>
            <input type="text" value={username} onChange={handleUsername} data-testid = "login-input"/>
            <p>Password</p>
            <input type="password" value={password} onChange={handlePassword} data-testid = "password-input"/>
            <p>
              <button onClick={handleSubmit} data-testid = "submit-button">Login</button>
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

export default connect(mapStateToProps)(PleaseLogin);
