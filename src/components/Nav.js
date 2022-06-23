import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useState, useEffect } from "react";

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
      <Link to="/homepage">Home </Link>

      <Link to="/leaderboard">Leaderboard </Link>

      <Link to="/new">New </Link>

      <Link to="/answered">Answered </Link>

      <Link to="/add">Add Poll </Link>

      {authedUser !== null ? (
        <span>
          <span>{authedUser}</span>
          <img
            src={users[authedUser].avatarURL}
            alt="avatar"
            className="nav-avatar"
          />
        </span>
      ) : (
        <span></span>
      )}
      <Link to="/" onClick={onLogout}>
        Logout
      </Link>
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
