import axiosInstance from '../../../api/instance'
import { DELETE_PWD_ERROR, DELETE_PWD_LOAD, DELETE_PWD_SUCCESS } from '../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export default (id) => (dispatch) => {
    dispatch({
        type: DELETE_PWD_LOAD,
        payload: id
    })
    axiosInstance().delete('/projects/' + id).then((res => {
        dispatch({
            type: DELETE_PWD_SUCCESS,
            payload: id
        })
    })).catch((error) => {
        dispatch({
            type: DELETE_PWD_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}