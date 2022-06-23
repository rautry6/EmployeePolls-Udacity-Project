import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { getInitialData } from "../api";

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then((data) => {
    dispatch(receiveQuestions(data.questions));
    dispatch(receiveUsers(data.users));
  });
};
