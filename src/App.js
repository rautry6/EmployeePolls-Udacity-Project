import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Poll from "./components/Poll";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import { handleInitialData } from "./actions/shared";
import Nav from "./components/Nav";
import { Route, Routes} from "react-router-dom";
import CreatePoll from "./components/CreatePoll";
import Leaderboard from "./components/Leaderboard";
import { useNavigate } from "react-router-dom";
import NewPolls from "./components/NewPolls";
import Answered from "./components/Answered";

function App(props) {
  const authedUser = props.authedUser;
  const currentQuestion = props.currentQuestion || "";
  const navigate = useNavigate();
  const notInitialRender = useRef(false);

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  // useEffect(() => {
  //   console.log(notInitialRender.current);
  //   props.dispatch(handleInitialData());
  //   if (authedUser === null) {
  //     if (notInitialRender.current) {
  //       window.alert("You must be logged in to view this page");
  //     } else {
  //       notInitialRender.current = true;
  //     }
  //     navigate("/");
  //   }
  // }, [authedUser]);

  return (
    <div className="App">
      <Nav />

      {props.loading ? (
        <div>Loading...</div>
      ) : ( 
      
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<Dashboard />} />
          <Route path="/new" element={<NewPolls />} />
          <Route path="/answered" element={<Answered />} />
          <Route path="/add" element={<CreatePoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="questions/:id"
            element={<Poll id={currentQuestion[0]} />}
          />
        </Routes>
      
      )}
    </div>
  );
}

//method to map state to props
function mapStateToProps(state) {
  return {
    questions: state.questions,
    loading: Object.keys(state.questions).length === 0,
    authedUser: state.authedUser,
    currentQuestion: state.currentQuestion,
  };
}

export default connect(mapStateToProps)(App);
