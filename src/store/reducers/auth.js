const INITIAL_STATE = {
    user: null,
    isAuth: false,
    isError: false,
}
import ActionType from '../actions/ActionType';

function Auth(state = INITIAL_STATE, action) {
    switch (action.type) {

        case ActionType.LOGIN_SUCCESS:
            return Object.assign({}, state, { user: action.val, isAuth: true, isError: false });

        case ActionType.LOGIN_FAIL:
            return Object.assign({}, state, { user: null, isAuth: false, isError: true })

        case ActionType.SIGNUP_SUCCESS:
            return Object.assign({}, state, { user: action.val, isAuth: true, isError: false });

        case ActionType.SIGNUP_FAIL:
            return Object.assign({}, state, { user: null, isAuth: false, isError: true })
            
        default: return state;
    }
}
export default Auth;