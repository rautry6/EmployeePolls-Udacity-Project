import "./App.css";
import Dashboard from "./components/Dashboard.js";
import LoginPage from "./components/LoginPage.js";
import Poll from "./components/Poll.js";
import { connect } from "react-redux";
import { useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import Nav from "./components/Nav.js";
import { Route, Routes } from "react-router-dom";
import CreatePoll from "./components/CreatePoll.js";
import Leaderboard from "./components/Leaderboard.js";
import NewPolls from "./components/NewPolls.js";
import Answered from "./components/Answered.js";
import PageNotFound from "./components/PageNotFound.js";

function App(props) {
  const currentQuestion = props.currentQuestion || "";

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
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/homepage" element={<Dashboard />} />
          <Route exact path="/new" element={<NewPolls />} />
          <Route exact path="/answered" element={<Answered />} />
          <Route exact path="/add" element={<CreatePoll />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route
            exact
            path="questions/:id"
            element={<Poll id={currentQuestion[0]} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    loading: Object.keys(state.questions).length === 0,
    authedUser: state.authedUser,
    currentQuestion: state.currentQuestion,
  };
}

export default connect(mapStateToProps)(App);
