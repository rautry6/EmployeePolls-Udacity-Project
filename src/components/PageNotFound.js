import { connect } from "react-redux";
import { useState, useEffect } from "react";
import PleaseLogin from "./PleaseLogin";

const PageNotFound = (props) => {
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    setAuthedUser(props.authedUser);
  }, [props.authedUser]);

  return (
    <div>
      {authedUser ? (
        <div>
          <h1 className="page-not-found"> 404 Error</h1>
          <h1>Page Not Found</h1>
          <p>Sorry, this page does not exist.</p>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(PageNotFound);
