import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { getUserInfo } from "../login/store/actions";
import Web from "./web";

const stateSelector = (state) => {
  return {
    user: state.auth.user,
  };
};

const bindActions = (dispatch) => {
  return bindActionCreators({ getUserInfo }, dispatch);
};

export default connect(stateSelector, bindActions)(Web);
