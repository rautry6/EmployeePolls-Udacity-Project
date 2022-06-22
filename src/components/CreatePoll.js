
const CreatePoll = (props) => {
    return(
        <div>
            <h1>Create Poll</h1>
            <form>
                <div>
                    <label>Question:</label>
                    <input type="text" name="question" />
                </div>
                <div>
                    <label>Option One:</label>
                    <input type="text" name="optionOne" />
                </div>
                <div>
                    <label>Option Two:</label>
                    <input type="text" name="optionTwo" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePoll;