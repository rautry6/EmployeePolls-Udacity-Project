import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { getInitialData } from "../api";

//Method that handles getting the initial data from the API and dispatching the actions to update the state
export const handleInitialData = () => (dispatch) => {
  return getInitialData().then((data) => {
    console.log(data);
    dispatch(receiveQuestions(data.questions));
    dispatch(receiveUsers(data.users));
  });
};
