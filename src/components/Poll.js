//functional component for poll
import React from 'react';
import { connect } from 'react-redux';


const Poll = (props) => {
    console.log(props.question);
    return (
        <div>
            <ul>
               <h3>Poll by {props.question.author}</h3>

               <h3>Would You Rather</h3>
               <form>
                     <div>
                            <p>{props.question.optionOne.text}</p>
                            <input type="radio" name="option" value="optionOne" />
                        </div>
                        <div>
                            <p>{props.question.optionTwo.text}</p>
                            <input type="radio" name="option" value="optionTwo" />
                        </div>
               </form>
            </ul>
        </div>
    );
}

//method to map state to props
function mapStateToProps(state , {id}) {
    console.log(state.questions)
    return {
        question: state.questions[id],
    };
}

export default connect(mapStateToProps)(Poll);