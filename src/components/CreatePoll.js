import "./CreatePoll.css";
import { handleAddQuestion } from "../actions/questions";
import { addQuestion } from "../actions/users";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateUID } from "../_DATA.js";
import PleaseLogin from "./PleaseLogin.js";

const CreatePoll = (props) => {
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    setAuthedUser(props.authedUser);
  }, [props.authedUser]);

  const nav = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (optionOne.length > 0 && optionTwo.length > 0) {
      const questionId = generateUID();
      const question = {
        id: questionId,
        author: authedUser,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        timestamp: Date.now(),
      };

      props.dispatch(handleAddQuestion(question));
      props.dispatch(addQuestion(question));
      nav("/homepage");
    }
  };

  const handleOptionOne = (e) => {
    e.preventDefault();
    setOptionOne(e.target.value);
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    setOptionTwo(e.target.value);
  };

  return (
    <div className="create-poll">
      {authedUser ? (
        <div>
          <h1 className="create-poll-header">Create Poll</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="question">Would You Rather</label>
            </div>
            <div>
              <label className="optionOne">Option One:</label>
              <input
                type="text"
                value={optionOne}
                name="optionOne"
                onChange={handleOptionOne}
                className="optionOne-input"
              />
            </div>
            <div>
              <label className="optionTwo">Option Two:</label>
              <input
                type="text"
                value={optionTwo}
                name="optionTwo"
                onChange={handleOptionTwo}
                className="optionTwo-input"
              />
            </div>
            <div>
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    users: state.users,
  };
}

export default connect(mapStateToProps)(CreatePoll);
