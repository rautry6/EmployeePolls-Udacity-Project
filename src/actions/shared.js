import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { getInitialData } from "../api";
import { setAuthedUser } from "./authedUser";
import { setCurrentQuestion } from "./currentQuestion";

const AUTHED_ID = ''

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then((data) => {
    dispatch(receiveQuestions(data.questions));
    dispatch(receiveUsers(data.users));
    
  });
};
