import { LOGIN, SIGNUP, USER_INFO } from 'shared/store/actions';


export const handleLogin = (payload) => ({
    type: LOGIN.REQUEST,
    payload
});

export const handleSignup = (payload) => ({
    type: SIGNUP.REQUEST,
    payload
});

export const getUserInfo = () => ({
    type: USER_INFO.REQUEST,
});
