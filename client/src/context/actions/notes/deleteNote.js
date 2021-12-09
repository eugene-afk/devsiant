import axiosInstance from '../../../api/instance'
import { DELETE_NOTE_ERROR, DELETE_NOTE_LOAD, DELETE_NOTE_SUCCESS } from '../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export default (id) => (dispatch) => {
    dispatch({
        type: DELETE_NOTE_LOAD,
        payload: id
    })
    axiosInstance().delete('/notes/' + id).then((res => {
        dispatch({
            type: DELETE_NOTE_SUCCESS,
            payload: id
        })
    })).catch((error) => {
        dispatch({
            type: DELETE_NOTE_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}