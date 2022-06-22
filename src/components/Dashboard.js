import { _getQuestions } from "../_DATA";
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom";
import { setCurrentQuestion } from "../actions/currentQuestion";

const Dashboard = (props) => {
  const navigate = useNavigate();
  console.log(props.questions);

  const handleSubmit = (key) => {
    navigate("questions/:" + key[0]);
    props.dispatch(setCurrentQuestion(key));
  }

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {Object.entries(props.questions).map((key, index) => (
          <div key={index}>
            <p>{key[1].author}</p>
            <li>{` ${new Date(key[1].timestamp).getHours()}:${
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

//method to map state to props
function mapStateToProps(state) {
  return {
    questions: state.questions,
  };
}

export default connect(mapStateToProps)(Dashboard);
