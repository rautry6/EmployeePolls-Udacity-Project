import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {
    const { authedUser } = props;
    const onLogout = () => {
        setAuthedUser(null);
        authedUser="";
    }

   

  return (
    <div className="nav">
      {authedUser ? <Link to= "/">Home </Link> : <Link to= "/login">Home </Link>}
      {authedUser ? <Link to="/leaderboard">Leaderboard </Link> : <Link to="/login">Leaderboard </Link>}
      {authedUser ? <Link to="/new">New </Link> : <Link to="/login">New </Link>}
      {authedUser ? <Link to="/add">Add Poll </Link> : <Link to="/login">Add Poll </Link>}
      <Link to="/login" onClick={onLogout}>{authedUser} Logout </Link>
    </div>
  );
};

function mapStateToProps(state) {
    return {
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(Nav);
