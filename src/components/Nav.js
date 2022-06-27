import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser.js";
import { useState, useEffect } from "react";
import "./Nav.css";

const Nav = (props) => {
  const [authedUser, setAuthUser] = useState(props.authedUser);
  let users = props.users;

  useEffect(() => {
    setAuthUser(props.authedUser);
  }, [props.authedUser]);

  const onLogout = (e) => {
    setAuthUser("");
    props.dispatch(setAuthedUser(null));
  };

  return (
    <div className="nav">
      <Link to="/homepage" className="link">
        Home{" "}
      </Link>

      <Link to="/leaderboard" className="link">
        Leaderboard{" "}
      </Link>

      <Link to="/new" className="link">
        New{" "}
      </Link>

      <Link to="/answered" className="link">
        Answered{" "}
      </Link>

      <Link to="/add" className="link">
        Add Poll{" "}
      </Link>

      {authedUser !== null ? (
        <span>
          <span className="authed-user">{authedUser}</span>
          <img
            src={users[authedUser].avatarURL}
            alt="avatar"
            className="nav-avatar"
          />
          <Link to="/" onClick={onLogout} className="link">
            Logout
          </Link>
        </span>
      ) : (
        <Link to="/" onClick={onLogout} className="link">
          Logout
        </Link>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    users: state.users,
  };
}

export default connect(mapStateToProps)(Nav);
