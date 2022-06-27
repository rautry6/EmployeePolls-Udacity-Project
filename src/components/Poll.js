import "./Poll.css";
import React from "react";
import { connect } from "react-redux";
import { saveAnswer } from "../actions/users.js";
import { useState, useEffect } from "react";
import PleaseLogin from "./PleaseLogin.js";

const Poll = (props) => {
  let question = props.question;
  const [authedUser, setAuthedUser] = useState(null);
  const [answered, setAnswered] = useState(
    props.users[props.authedUser].answers[question.id]
  );

  let questionOneAnswers = question.optionOne.votes.length;
  let questionTwoAnswers = question.optionTwo.votes.length;

  let questionOnePercentage =
    (questionOneAnswers /
      (question.optionOne.votes.length + question.optionTwo.votes.length)) *
    100;
  let questionTwoPercentage =
    (questionTwoAnswers /
      (question.optionTwo.votes.length + question.optionOne.votes.length)) *
    100;

    let currentUserAnswer = props.users[props.authedUser].answers[question.id];

  useEffect(() => {
    setAuthedUser(props.authedUser);
    if (authedUser) {
      if (props.users[props.authedUser].answers[question.id]) {
        setAnswered(true);
        if (
          props.users[props.authedUser].answers[question.id] === "optionOne"
        ) {
          if (question.optionOne.votes.includes(props.authedUser)) {
            return;
          }
          question.optionOne.votes.push(props.authedUser);
        } else {
          if (question.optionTwo.votes.includes(props.authedUser)) {
            return;
          }
          question.optionTwo.votes.push(props.authedUser);
        }
      }
    }
  }, [props.authedUser, props.users[props.authedUser].answers]);

  const handleOptionOne = (e) => {
    e.preventDefault();
    props.dispatch(saveAnswer(authedUser, question.id, "optionOne"));
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    props.dispatch(saveAnswer(authedUser, question.id, "optionTwo"));
  };
  return (
    <div className="poll-item">
      {authedUser ? (
        <div>
          <ul>
            <h3 className="by">Poll by {question.author}</h3>

            <h3 className="poll-question">Would You Rather</h3>
            <form>
              <div className="poll-option">
                <p>{question.optionOne.text}</p>
                <input
                  type="button"
                  name="option"
                  value="Choose"
                  onClick={handleOptionOne}
                />
                {answered ? (
                  <div className= {currentUserAnswer === "optionOne" ? "poll-answer" : ""}>
                    <p>{`Answers: ${questionOneAnswers}`}</p>
                    <p>{`Percentage: ${questionOnePercentage.toFixed(2)}%`}</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="poll-option">
                <p>{question.optionTwo.text}</p>
                <input
                  type="button"
                  name="option"
                  value="Choose"
                  onClick={handleOptionTwo}
                />
                {answered ? (
                  <div className={currentUserAnswer === "optionTwo" ? "poll-answer" : ""}>
                    <p>{`Answers: ${questionTwoAnswers}`}</p>
                    <p>{`Percentage: ${questionTwoPercentage.toFixed(2)}%`}</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </form>
          </ul>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    authedUser: state.authedUser,
    users: state.users,
  };
}

export default connect(mapStateToProps)(Poll);
