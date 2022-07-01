import { receiveQuestions, addQuestion, saveQuestionAnswer } from "./questions.js";
import { receiveUsers, addQuestionToUser, saveAnswer } from "./users.js";
import { getInitialData } from "../api.js";
import { _saveQuestion } from "../_DATA.js";



export const handleInitialData = () => (dispatch) => {
  console.log("handleInitialData")
  return getInitialData().then((data) => {
    dispatch(receiveQuestions(data.questions));
    dispatch(receiveUsers(data.users));
  });
};

export function handleAddQuestion(question) {
  console.log(question)
  return (dispatch) => {
    return _saveQuestion(question).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question.id, question.author));
      }
    );
  };
}

export function handleSaveAnswer(authedUser, qid, answer){
  return (dispatch) => {
    dispatch(saveQuestionAnswer(authedUser, qid, answer));
    dispatch(saveAnswer(authedUser, qid, answer));
  }
}

