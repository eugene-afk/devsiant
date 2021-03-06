import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_USER } from "../../constants/actionTypes"

const auth = (state, {payload, type}) => {
    switch(type){
        case LOGIN_LOADING:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    error: false,
                    loading: true
                }
            }
        case LOGIN_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: payload
                }
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    error: null,
                    loading: false,
                    data: payload
                }
            }
        case LOGOUT_USER:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    data: null
                }
            }
        default:
            return state
    }
}

export default auth