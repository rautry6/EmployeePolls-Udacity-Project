
export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser(id, author) {
  return {
    type: ADD_QUESTION_TO_USER,
    id: id,
    author: author,
  };
}

export function saveAnswer(authedUser, qid, answer) {
    return{
        type: SAVE_ANSWER,
        authedUser: authedUser,
        qid: qid,
        answer: answer
    }
}