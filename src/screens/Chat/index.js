import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Chat from "./chat";
import { sendMessage, getHistory, deleteMessages } from "./store/actions";

const stateSelector = (state) => {
  return {
    user: state.auth.user,
    history: state.chat.history,
  };
};

const bindActions = (dispatch) => {
  return bindActionCreators(
    { sendMessage, getHistory, deleteMessagesReq: deleteMessages },
    dispatch
  );
};

export default connect(stateSelector, bindActions)(Chat);
