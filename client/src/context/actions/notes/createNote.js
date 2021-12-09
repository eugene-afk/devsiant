import axiosInstance from '../../../api/instance'
import { ADD_NOTE_ERROR, ADD_NOTE_LOAD, ADD_NOTE_SUCCESS } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default (payload) => (dispatch) => {
    dispatch({
        type: ADD_NOTE_LOAD
    })
    axiosInstance().post('/notes', payload).then((res => {
        dispatch({
            type: ADD_NOTE_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        console.log(error)
        dispatch({
            type: ADD_NOTE_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}