import axiosInstance from '../../../api/instance'
import { ADD_REMOVE_STAR_ERROR, ADD_REMOVE_STAR_LOAD, ADD_REMOVE_STAR_SUCCESS } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default (id) => (dispatch) => {
    dispatch({
        type: ADD_REMOVE_STAR_LOAD,
        payload: id
    })
    axiosInstance().put('/projects/favorite/' + id).then((res => {
        dispatch({
            type: ADD_REMOVE_STAR_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        dispatch({
            type: ADD_REMOVE_STAR_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}