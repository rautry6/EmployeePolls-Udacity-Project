import React from 'react';
import { connect } from 'react-redux';
import { saveAnswer } from '../actions/users';


const Poll = (props) => {
    let question = props.question;
    let authedUser = props.authedUser;

    const handleOptionOne = (e) => {
        e.preventDefault();
        props.dispatch(saveAnswer(authedUser, question.id, 'optionOne'));
    }
    
    const handleOptionTwo = (e) => {
        e.preventDefault();
        props.dispatch(saveAnswer(authedUser, question.id, 'optionTwo'));
    }
    return (
        <div>
            <ul>
               <h3>Poll by {question.author}</h3>

               <h3>Would You Rather</h3>
               <form>
                     <div>
                            <p>{question.optionOne.text}</p>
                            <input type="button" name="option" value="Choose" onClick={handleOptionOne} />
                        </div>
                        <div>
                            <p>{question.optionTwo.text}</p>
                            <input type="button" name="option" value="Choose" onClick={handleOptionTwo}/>
                        </div>
               </form>
            </ul>
        </div>
    );
}

function mapStateToProps(state , {id}) {
    return {
        question: state.questions[id],
        authedUser: state.authedUser,
    };
}

export default connect(mapStateToProps)(Poll);