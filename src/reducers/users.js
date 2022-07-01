import { RECEIVE_USERS, SAVE_ANSWER, ADD_QUESTION_TO_USER } from "../actions/users.js";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ADD_QUESTION_TO_USER:
      console.log( {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.id)
        }
      })
      
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.id)
        }
      };
    default:
      return state;
    }
}