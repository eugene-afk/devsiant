import axiosInstance from '../../../api/instance'
import { EDIT_PWD_ERROR, EDIT_PWD_LOAD, EDIT_PWD_SUCCESS } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default (payload) => (dispatch) => {
    dispatch({
        type: EDIT_PWD_LOAD
    })
    axiosInstance().put('/projects/' + payload.id, {'date': payload.date, 'name': payload.name, 'desc': payload.desc, 'favorite': payload.favorite}).then((res => {
        dispatch({
            type: EDIT_PWD_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        dispatch({
            type: EDIT_PWD_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}