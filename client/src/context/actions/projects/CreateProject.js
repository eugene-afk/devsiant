import axiosInstance from '../../../api/instance'
import { ADD_PWD_ERROR, ADD_PWD_LOAD, ADD_PWD_SUCCESS } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default ({name, desc}) => (dispatch) => {
    dispatch({
        type: ADD_PWD_LOAD
    })
    const date = new Date().toISOString().substring(0, 10)
    axiosInstance().post('/projects', {'date':date, 'name': name, 'desc': desc, 'favorite': false}).then((res => {
        dispatch({
            type: ADD_PWD_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        console.log(error)
        dispatch({
            type: ADD_PWD_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}