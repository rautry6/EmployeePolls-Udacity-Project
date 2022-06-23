import { connect } from "react-redux/es/exports";
import { setCurrentQuestion } from "../actions/currentQuestion";
import { useNavigate } from "react-router-dom";

const NewPolls = (props) => {
  const navigate = useNavigate();
  let users = props.users;
  let questions = props.questions;
  let authedUser = props.authedUser;

  const user = users[authedUser];
  const questionsArray = Object.keys(questions).map((key) => questions[key]);
  const newQuestions = questionsArray.filter(
    (question) => user.answers[question.id] === undefined
  );

  const handleSubmit = (key) => {
    navigate("../questions/:" + key[1].id, { replace: true });
    key[0] = key[1].id;
    props.dispatch(setCurrentQuestion(key));
  };

  return (
    <div>
      <h1>New Polls</h1>
      <ul>
        {Object.entries(newQuestions).map((key, index) => (
          <div key={index}>
            <p>{key[1].author}</p>
            <li>
              {` ${new Date(key[1].timestamp).getHours()}:${
                new Date(key[1].timestamp).getMinutes() < 10
                  ? `0${new Date(key[1].timestamp).getMinutes()}`
                  : new Date(key[1].timestamp).getMinutes()
              }
                    ${new Date(key[1].timestamp).getDay()}/${new Date(
                key[1].timestamp
              ).getMonth()}/${new Date(key[1].timestamp).getFullYear()}`}
              <p></p>
              <button onClick={() => handleSubmit(key)}>Show</button>
            </li>
          </div>
        ))}
      </ul>
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

export default connect(mapStateToProps)(NewPolls);
