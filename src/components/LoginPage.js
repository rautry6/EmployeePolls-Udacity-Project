import { connect } from "react-redux/es/exports";
import { useState} from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const nav = useNavigate();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");


  let users = props.users;

  const handleSubmit = (e) => {
    console.log(username, password);
    if (username in users) {
      if (users[username].password === password) {
        props.dispatch(setAuthedUser(users[username]));

        nav("/");
      } else {
        setUsername("");
        setPassword("");
        setError(true);
      }
    } else {
      setUsername("");
      setPassword("");
      setError(true);
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
      <h1>Employee Polls</h1>
      <h2>Login</h2>
      <div>
        {error ? (
          <div>
            <p itemID="invalid-login">Invalid username or password</p>{" "}
            <p>User</p>
            <input type="text" value={username} onChange={handleUsername} />
            <p>Password</p>
            <input type="password" value={password} onChange={handlePassword} />
            <p>
              <button onClick={handleSubmit}>Login</button>
            </p>
          </div>
        ) : (
          <div>
            <p>User</p>
            <input type="text" onChange={handleUsername} />
            <p>Password</p>
            <input type="password" onChange={handlePassword} />
            <p>
              <button onClick={handleSubmit}>Login</button>
            </p>{" "}
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
