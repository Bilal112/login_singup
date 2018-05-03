import ActionType from './ActionType'

const storeAction = {
    login: (user) => {
        return {
            type: ActionType.LOGIN_SUCCESS,
            val: user
        }
    },
    signup: (user) => {
        return {
            type: ActionType.SIGNUP_SUCCESS,
            val: user
        }

    }
}
export default storeAction;