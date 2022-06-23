import { handleAddQuestion } from "../actions/questions";
import { connect } from "react-redux/es/exports";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {generateUID} from "../_DATA.js";

const CreatePoll = (props) => {
    const authedUser = props.authedUser;

    const nav = useNavigate();
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (optionOne.length > 0 && optionTwo.length > 0) {
            const questionId = generateUID();
            const question = 
            {
                id: questionId,
                author: authedUser,
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                timestamp: Date.now(),
            }
        
            props.dispatch(handleAddQuestion(question));
            nav("/homepage");
        }
    }

    const handleOptionOne = (e) => {
        e.preventDefault();
        setOptionOne(e.target.value);
    }

    const handleOptionTwo = (e) => {
        e.preventDefault();
        setOptionTwo(e.target.value);
    }

    return(
        <div>
            <h1>Create Poll</h1>
            <form  onSubmit={handleSubmit}>
                <div>
                    <label>Would You Rather</label>
                </div>
                <div>
                    <label>Option One:</label>
                    <input type="text" value = {optionOne} name="optionOne" onChange={handleOptionOne}/>
                </div>
                <div>
                    <label>Option Two:</label>
                    <input type="text" value={optionTwo} name="optionTwo" onChange={handleOptionTwo}/>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        authedUser: state.authedUser,
    };
}


export default connect(mapStateToProps)(CreatePoll);