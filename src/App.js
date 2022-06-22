import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Poll from "./components/Poll";
import { connect } from "react-redux";
import { useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import CreatePoll from "./components/CreatePoll";
import Leaderboard from "./components/Leaderboard";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
      <Nav />
      {props.loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new" element={<Poll id={"8xf0y6ziyjabvozdd253nd"}/>} />
          <Route path="/add" element={<CreatePoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      )}
    </div>
  );
}

//method to map state to props
function mapStateToProps(state) {
  console.log(state.questions);
  return {
    questions: state.questions,
    loading: Object.keys(state.questions).length === 0,
  };
}

export default connect(mapStateToProps)(App);
