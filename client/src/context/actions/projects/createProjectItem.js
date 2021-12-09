import axiosInstance from '../../../api/instance'
import { ADD_PWD_ITEM_ERROR, ADD_PWD_ITEM_LOAD, ADD_PWD_ITEM_SUCCESS } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default (payload) => (dispatch) => (id) => {
    dispatch({
        type: ADD_PWD_ITEM_LOAD
    })
    axiosInstance().post('/projectitems', {
        'name': payload.name,
        'login': payload.login,
        'password': payload.password,
        'desc': payload.desc,
        'project_parent_id': id
    }).then((res => {
        dispatch({
            type: ADD_PWD_ITEM_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        console.log(error)
        dispatch({
            type: ADD_PWD_ITEM_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}