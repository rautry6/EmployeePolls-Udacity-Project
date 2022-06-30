import "./Poll.css";
import React from "react";
import { connect, useSelector } from "react-redux";
import { saveAnswer } from "../actions/users.js";
import { useState, useEffect } from "react";
import PleaseLogin from "./PleaseLogin.js";
import { useLocation } from "react-router";

const Poll = (props) => {
  const location = useLocation();
  const questions = useSelector((state) => state.questions);
  const users = useSelector(state => state.users);

  const [authedUser, setAuthedUser] = useState(null);
  const [answered, setAnswered] = useState(null);

  let question = questions[location.pathname.split("/")[2].split(":")[1]];
  let questionOneAnswers;
  let questionTwoAnswers;
  let questionOnePercentage = 0;
  let questionTwoPercentage = 0;

  if (props.authedUser) {
    questionOneAnswers = question.optionOne.votes.length;
    questionTwoAnswers = question.optionTwo.votes.length;

    questionOnePercentage =
      (questionOneAnswers /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
      100;
    questionTwoPercentage =
      (questionTwoAnswers /
        (question.optionTwo.votes.length + question.optionOne.votes.length)) *
      100;
  }

  //Checks if user has answered the question
  useEffect(() => {
    if (props.authedUser) {
      setAuthedUser(props.authedUser);

      if (users[props.authedUser].answers[question.id]) {
        if (
          users[props.authedUser].answers[question.id] === "optionOne"
        ) {
          if (question.optionOne.votes.includes(props.authedUser)) {
            setAnswered("optionOne");
            return;
          }
          question.optionOne.votes.push(props.authedUser);
        } else {
          if (question.optionTwo.votes.includes(props.authedUser)) {
            setAnswered("optionTwo");
            return;
          }
          question.optionTwo.votes.push(props.authedUser);
        }
      }
    }
  }, [
    props.authedUser,
    answered,
    users,
    question.id,
    question.optionOne.votes,
    question.optionTwo.votes,
  ]);

  const handleOptionOne = (e) => {
    e.preventDefault();
    props.dispatch(saveAnswer({ authedUser: authedUser, qid: question.id, answer: "optionOne"}));
    setAnswered("optionOne");
    console.log(question)
    console.log(users[authedUser])
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    props.dispatch(saveAnswer({ authedUser: authedUser, qid: question.id, answer: "optionTwo"}));
    setAnswered("optionTwo");
    console.log(question)
    console.log(users[authedUser])
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
                  type="submit"
                  name="option"
                  value="Choose"
                  onClick={handleOptionOne}
                />
                {answered ? (
                  <div
                    className={
                      question.optionOne.votes.includes(authedUser)
                        ? "poll-answer"
                        : ""
                    }
                  >
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
                  <div
                    className={
                      question.optionTwo.votes.includes(authedUser)
                        ? "poll-answer"
                        : ""
                    }
                  >
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

function mapStateToProps(state) {
  return {
    questions: state.questions,
    authedUser: state.authedUser,
   // users: state.users,
  };
}

export default connect(mapStateToProps)(Poll);
