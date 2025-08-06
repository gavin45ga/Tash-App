import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Settings from "./settings";
import { resetStore } from "shared/store/actions";

const stateSelector = (state) => {
  return {
    user: state.auth.user,
  };
};

const bindActions = (dispatch) => {
  return bindActionCreators({ resetStore }, dispatch);
};

export default connect(stateSelector, bindActions)(Settings);
