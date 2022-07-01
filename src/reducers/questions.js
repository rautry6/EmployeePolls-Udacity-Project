import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from "../actions/questions.js";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case SAVE_QUESTION_ANSWER:
      console.log(action.qid)
      console.log(state)
      console.log({ ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            
          },
        },})
      return {
        //check what users answer is and add it to the right votes array
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat(
              action.authedUser
            ),
          },
        },
      }
    default:
      return state;
  }
}