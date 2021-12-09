import axiosInstance from '../../api/instance'
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR 
} from '../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../constants/api'

const login = (payload) => (dispatch) => (history) => {
    dispatch({
        type: LOGIN_LOADING
    })
    return axiosInstance().post('/auth/sign-in', `username=${payload.username}&password=${payload.password}`)
    .then((res) => {
        localStorage.token = res.data.access_token
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        history.push('/')
    })
    .catch((error) => {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response ? error.response.data : CONNECTION_ERROR 
        })
    })
}

export default login
