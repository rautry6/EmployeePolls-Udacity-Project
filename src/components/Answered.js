import "./Answered.css";
import { connect } from "react-redux";
import { setCurrentQuestion } from "../actions/currentQuestion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PleaseLogin from "./PleaseLogin.js";

const AnsweredPolls = (props) => {
  const navigate = useNavigate();
  let users = props.users;
  let questions = props.questions;
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    setAuthedUser(props.authedUser);
  }, [props.authedUser]);

  let questionsArray;
  let answeredQuestions;

  const user = users[authedUser];
  if (user) {
    questionsArray = Object.keys(questions).map((key) => questions[key]);
    answeredQuestions = questionsArray
      .filter((question) => user.answers[question.id] !== undefined)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  const handleSubmit = (key) => {
    navigate("../questions/:" + key[1].id, { replace: true });
    key[0] = key[1].id;
    props.dispatch(setCurrentQuestion(key));
  };

  return (
    <div className="answered-polls">
      {authedUser ? (
        <div>
          <h1>Answered Polls</h1>
          <ul>
            {Object.entries(answeredQuestions).map((key, index) => (
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
                  ${new Date(key[1].timestamp).getMonth() + 1}/${new Date(
                    key[1].timestamp
                  ).getDate()}/${new Date(key[1].timestamp).getFullYear()}`}
                  <p></p>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    questions: state.questions,
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(AnsweredPolls);
