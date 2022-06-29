import "./App.css";
import Dashboard from "./components/Dashboard.js";
import LoginPage from "./components/LoginPage.js";
import Poll from "./components/Poll.js";
import { connect } from "react-redux";
import { useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import Nav from "./components/Nav.js";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePoll from "./components/CreatePoll.js";
import Leaderboard from "./components/Leaderboard.js";
import NewPolls from "./components/NewPolls.js";
import Answered from "./components/Answered.js";
import PageNotFound from "./components/PageNotFound.js";
import { setCurrentQuestion } from "./actions/currentQuestion.js";

function App(props) {
  let id;
  if (props.currentQuestion) {
    id = props.currentQuestion[0];
  }

  const location = useLocation();

  if (!props.currentQuestion) {
    if (location.pathname.split("/")[2]) {
      let questionId = location.pathname.split("/")[2];
      questionId = questionId.split(":")[1];
      id = questionId;
      props.dispatch(
        setCurrentQuestion([questionId, props.questions[questionId]])
      );
    }
  }

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
            path="questions/:id"
            element={props.questions[id] ? <Poll /> : <PageNotFound />}
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
