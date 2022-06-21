import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import {handleInitialData} from "./api";

//Method that handles getting the initial data from the API and dispatching the actions to update the state
export const handleInitialData = () => (dispatch) => {
    return handleInitialData()
        .then((data) => {
        dispatch(receiveQuestions(data.questions));
        dispatch(receiveUsers(data.users));
        }
        , (e) => {
            console.log(e);
        }
        );
}

