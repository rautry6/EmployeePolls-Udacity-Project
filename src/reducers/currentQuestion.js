import { CURRENT_QUESTION } from "../actions/currentQuestion";

export default function currentQuestion(state = null, action) {
  switch (action.type) {
    case CURRENT_QUESTION:
      return action.question;
    default:
      return state;
  }
}
