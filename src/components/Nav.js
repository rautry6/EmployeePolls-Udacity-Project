import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useState, useEffect } from "react";

const Nav = (props) => {
  const [authedUser, setAuthUser] = useState(props.authedUser);

  useEffect(() => {
    setAuthUser(props.authedUser);
  }, [props.authedUser]);

  const onLogout = (e) => {
    setAuthUser("");
    setAuthedUser(null);
  };

  return (
    <div className="nav">
      <Link to="/homepage">Home </Link>

      <Link to="/leaderboard">Leaderboard </Link>

      <Link to="/new">New </Link>

      <Link to="/answered">Answered </Link>

      <Link to="/add">Add Poll </Link>

      <Link to="/" onClick={onLogout}>
        {authedUser} Logout
      </Link>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
