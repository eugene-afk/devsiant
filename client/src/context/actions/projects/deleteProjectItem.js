import axiosInstance from '../../../api/instance'
import { DELETE_PWD_ITEM_ERROR, DELETE_PWD_ITEM_LOAD, DELETE_PWD_ITEM_SUCCESS } from '../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export default (id) => (dispatch) => {
    dispatch({
        type: DELETE_PWD_ITEM_LOAD,
        payload: id
    })
    axiosInstance().delete('/projectitems/' + id).then((res => {
        dispatch({
            type: DELETE_PWD_ITEM_SUCCESS,
            payload: id
        })
    })).catch((error) => {
        console.log(error)
        dispatch({
            type: DELETE_PWD_ITEM_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}