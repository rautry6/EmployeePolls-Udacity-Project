import { connect } from "react-redux/es/exports";

const Leaderboard = (props) => {
    let users = props.users;
    let usersArray = Object.keys(users).map(key => users[key]);
    let sortedUsers = usersArray.sort((a, b) => b.score - a.score);

    let questions = props.questions;
    let questionsArray = Object.keys(questions).map(key => questions[key]);
    
    return (
        <div className="leaderboard">
        <h1>Leaderboard</h1>
        <ul>
           {sortedUsers.map((user, index) => (
            <li key={index}>
                <p>{`${user.name} ${user.avatar} Questions: ${questionsArray.filter(question => question.author === user.id).length} Answers: ${Object.keys(user.answers).length}`}</p>
            </li>
              ))}
        </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        questions: state.questions
    }
}

export default connect(mapStateToProps)(Leaderboard);