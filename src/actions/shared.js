import { receiveQuestions } from "./questions.js";
import { receiveUsers } from "./users.js";
import { getInitialData } from "../api.js";

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then((data) => {
    dispatch(receiveQuestions(data.questions));
    dispatch(receiveUsers(data.users));
  });
};
