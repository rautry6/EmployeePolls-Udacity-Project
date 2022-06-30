import { _saveQuestionAnswer } from "../_DATA";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER = "SAVE_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveAnswer(authedUser, qid, answer) {
 return (dispatch) => {
    return _saveQuestionAnswer(authedUser, qid, answer).then(
      (question) => { 
        dispatch(receiveUsers(question));
      }
    );
 }
}
