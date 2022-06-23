import { connect } from "react-redux/es/exports";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

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
    <h3 >Please Login to View Page</h3>
      <h1>Employee Polls</h1>
      <h2>Login</h2>
      <div>
        {error ? (
          <div>
            <h3 itemID="invalid-login">Invalid username or password</h3>{" "}
            <p>User</p>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
            />
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
            />
            <p>
              <button onClick={handleSubmit}>Login</button>
            </p>
          </div>
        ) : (
          <div>
            <p>User</p>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
            />
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
            />
            <p>
              <button onClick={handleSubmit}>Login</button>
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
