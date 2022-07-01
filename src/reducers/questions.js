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
      return {
        //check what users answer is and add it to the right votes array
        ...state,
        [action.question.id]: {
          ...state[action.question.id],
          [action.answer]: {
            ...state[action.question.id][action.answer],
            votes: state[action.question.id][action.answer].votes.concat(
              action.author
            ),
          },
        },
      }
    default:
      return state;
  }
}
