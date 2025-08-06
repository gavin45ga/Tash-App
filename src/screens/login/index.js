import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { handleLogin, handleSignup } from "./store/actions";
import Login from "./login";

const stateSelector = (state) => {
  return {
    isLoading: state.status.isLoading,
  };
};

const bindActions = (dispatch) => {
  return bindActionCreators(
    {
      handleLogin,
      handleSignup,
    },
    dispatch
  );
};

export default connect(stateSelector, bindActions)(Login);
