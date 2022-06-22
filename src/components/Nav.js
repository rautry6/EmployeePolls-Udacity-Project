import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">Home </Link>
      <Link to="/leaderboard">Leaderboard </Link>
      <Link to="/new">New </Link>
      <Link to="/add">Add Poll </Link>
      <Link to="/login">Logout </Link>
    </div>
  );
};

export default Nav;
