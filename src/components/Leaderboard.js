import { connect } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import PleaseLogin from "./PleaseLogin";

const Leaderboard = (props) => {
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    setAuthedUser(props.authedUser);
  }, [props.authedUser]);

  let users = props.users;
  let usersArray = Object.keys(users).map((key) => users[key]);
  let sortedUsers = usersArray.sort((a, b) => b.score - a.score);

  let questions = props.questions;
  let questionsArray = Object.keys(questions).map((key) => questions[key]);

  return (
    <div>
      {authedUser ? (
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          <ul>
            {sortedUsers.map((user, index) => (
              <li key={index}>
                <p>{`${user.name} ${user.avatar} Questions: ${
                  questionsArray.filter(
                    (question) => question.author === user.id
                  ).length
                } Answers: ${Object.keys(user.answers).length}`}</p>
              </li>
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
