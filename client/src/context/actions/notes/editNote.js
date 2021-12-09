import axiosInstance from '../../../api/instance'
import { EDIT_NOTE_ERROR, EDIT_NOTE_LOAD, EDIT_NOTE_SUCCESS } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default (id, payload) => (dispatch) => {
    dispatch({
        type: EDIT_NOTE_LOAD
    })
    axiosInstance().put('/notes/' + id, payload).then((res => {
        dispatch({
            type: EDIT_NOTE_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        dispatch({
            type: EDIT_NOTE_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}