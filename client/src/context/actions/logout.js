import { LOGOUT_USER } from "../../constants/actionTypes"


export default (history) => (dispatch) => (authDispatch) => {
    localStorage.removeItem('token')

    dispatch({
        type: LOGOUT_USER
    })
    authDispatch({
        type: LOGOUT_USER
    })

    history.push('/login')
}