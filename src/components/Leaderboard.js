import "./Leaderboard.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import PleaseLogin from "./PleaseLogin.js";

const Leaderboard = (props) => {
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    setAuthedUser(props.authedUser);
  }, [props.authedUser]);

  let users = props.users;
  let usersArray = Object.keys(users).map((key) => users[key]);

  let sortedUsers = usersArray.sort((a, b) => {
    return (
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      Object.keys(a.answers).length -
      Object.keys(a.questions).length
    );
  });

  let questions = props.questions;
  let questionsArray = Object.keys(questions).map((key) => questions[key]);

  return (
    <div className="leaderboard-page">
      {authedUser ? (
        <div className="leaderboard">
          <h1 className="header">Leaderboard</h1>
          <ul className="leaderboard-list">
            {sortedUsers.map((user, index) => (
              <ul key={index}>
                <img
                  src={user.avatarURL}
                  alt={user.name}
                  className="leaderboard-profile-picture"
                />
                <span>{`${user.name} Questions: ${
                  questionsArray.filter(
                    (question) => question.author === user.id
                  ).length
                } Answers: ${Object.keys(user.answers).length}`}</span>
              </ul>
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

export default connect(mapStateToProps)(Leaderboard);
