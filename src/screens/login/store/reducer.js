import { composeResetReducer } from 'shared/store/reducers/reset-reducer';
import { LOGIN, SIGNUP, USER_INFO } from "shared/store/actions";

const initialState = {
    token: null,
    user: {}
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.DONE:
        case SIGNUP.DONE:
            const { token, user } = action.payload
            return {
                token,
                user
            }
        case USER_INFO.DONE:
            return {
                ...state,
                user: action.payload.user
            }
        case LOGIN.FAILED:
        case SIGNUP.FAILED:
        default:
            return state;
    }
};

export default composeResetReducer(auth, initialState);
