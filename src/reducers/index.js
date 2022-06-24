import { combineReducers } from "redux";
import users from "./users.js";
import questions from "./questions.js";
import authedUser from "./authedUser.js";
import currentQuestion from "./currentQuestion.js";

export default combineReducers({
  users,
  questions,
  authedUser,
  currentQuestion,
});
