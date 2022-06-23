import {combineReducers} from 'redux';
import users from './users';
import questions from './questions';
import authedUser from './authedUser';
import currentQuestion from './currentQuestion';

export default combineReducers({
    users,
    questions,
    authedUser,
    currentQuestion,
});