import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { getHistory } from "screens/Chat/store/actions";
import { resetStore } from "shared/store/actions";
import Homepage from "./homepage";

const stateSelector = (state) => {
  return {
    user: state.auth.user,
  };
};

const bindActions = (dispatch) => {
  return bindActionCreators({ resetStore, getHistory }, dispatch);
};

export default connect(stateSelector, bindActions)(Homepage);
