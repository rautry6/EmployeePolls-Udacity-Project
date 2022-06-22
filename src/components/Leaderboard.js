import { connect } from "react-redux/es/exports";

const Leaderboard = (props) => {
    let users = props.users;
    let usersArray = Object.keys(users).map(key => users[key]);
    let sortedUsers = usersArray.sort((a, b) => b.score - a.score);
    console.log(usersArray)
    return (
        <div className="leaderboard">
        <h1>Leaderboard</h1>
        <ul>
           {sortedUsers.map((user, index) => (

            <li key={index}>
                <p>{`${user.name} ${user.avatar} Questions: ${user.questions.length} Answers: ${Object.keys(user.answers).length}`}</p>
            </li>
              ))}
        </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Leaderboard);