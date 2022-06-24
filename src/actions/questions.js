import { _saveQuestion, _saveQuestionAnswer } from "../_DATA.js";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question).then(
      (question) => {
        dispatch(addQuestion(question));
      },
      (e) => {
        console.log(e);
      }
    );
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
