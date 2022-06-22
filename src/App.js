import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import Poll from './components/Poll';
import { connect } from "react-redux";
import {useEffect} from "react"
import {handleInitialData} from "./actions/shared"
import Nav from './components/Nav';


function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
    {
      props.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Nav />
          <Poll id={"8xf0y6ziyjabvozdd253nd"}/>
        </div>
      )
    }
    </div>
  );
}

//method to map state to props
function mapStateToProps(state) {
  console.log(state.questions)
  return {
    questions: state.questions,
    loading: Object.keys(state.questions).length === 0,
  };
}


export default connect(mapStateToProps)(App);
