import "./Dashboard.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentQuestion } from "../actions/currentQuestion.js";
import { useState, useEffect } from "react";
import PleaseLogin from "./PleaseLogin.js";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    setAuthedUser(props.authedUser);
  }, [props.authedUser]);

  let newQuestions;
  let doneQuestions;

  let questions = props.questions;
  let questionsArray = Object.keys(questions).map((key) => questions[key]);
  let user = props.users[props.authedUser];

  if (user) {
    newQuestions = questionsArray
      .filter((question) => user.answers[question.id] === undefined)
      .sort((a, b) => b.timestamp - a.timestamp);
    doneQuestions = questionsArray
      .filter((question) => user.answers[question.id] !== undefined)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  const handleSubmit = (key) => {
    navigate("../questions/:" + key[1].id);
    key[0] = key[1].id;
    props.dispatch(setCurrentQuestion(key));
  };

  return (
    <div className="dashboard">
      {authedUser ? (
        <div>
          <h1 className="header">Questions</h1>
          <h3 className="new-header">New Questions</h3>
          <div className="new-questions">
            <ul>
              {Object.entries(newQuestions).map((key, index) => (
                <div
                  key={index}
                  className="poll"
                  onClick={() => handleSubmit(key)}
                >
                  <p className="author">{key[1].author}</p>
                  <ul className="time">
                    {` ${new Date(key[1].timestamp).getHours()}:${
                      new Date(key[1].timestamp).getMinutes() < 10
                        ? `0${new Date(key[1].timestamp).getMinutes()}`
                        : new Date(key[1].timestamp).getMinutes()
                    }
                    ${new Date(key[1].timestamp).getDay()}/${new Date(
                      key[1].timestamp
                    ).getMonth()}/${new Date(key[1].timestamp).getFullYear()}`}
                    <p></p>
                  </ul>
                </div>
              ))}
            </ul>
          </div>
          <h3 className="done-header">Done</h3>
          <div className="done-questions">
            <ul>
              {Object.entries(doneQuestions).map((key, index) => (
                <div
                  key={index}
                  className="poll"
                  onClick={() => handleSubmit(key)}
                >
                  <p className="author">{key[1].author}</p>
                  <ul className="time">
                    {` ${new Date(key[1].timestamp).getHours()}:${
                      new Date(key[1].timestamp).getMinutes() < 10
                        ? `0${new Date(key[1].timestamp).getMinutes()}`
                        : new Date(key[1].timestamp).getMinutes()
                    }
                    ${new Date(key[1].timestamp).getDay()}/${new Date(
                      key[1].timestamp
                    ).getMonth()}/${new Date(key[1].timestamp).getFullYear()}`}
                    <p></p>
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

//method to map state to props
function mapStateToProps(state) {
  return {
    questions: state.questions,
    authedUser: state.authedUser,
    users: state.users,
  };
}

export default connect(mapStateToProps)(Dashboard);
