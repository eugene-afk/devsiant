import axiosInstance from '../../../api/instance'
import { EDIT_PWD_ITEM_ERROR, EDIT_PWD_ITEM_LOAD, EDIT_PWD_ITEM_SUCCESS, } from "../../../constants/actionTypes"
import { CONNECTION_ERROR } from '../../../constants/api';

export default (payload) => (dispatch) => {
    dispatch({
        type: EDIT_PWD_ITEM_LOAD
    })
    axiosInstance().put('/projectitems/' + payload.id, {
        'name': payload.name,
        'login': payload.login,
        'password': payload.password,
        'desc': payload.desc
    }).then((res => {
        dispatch({
            type: EDIT_PWD_ITEM_SUCCESS,
            payload: res.data
        })
    })).catch((error) => {
        console.log(error)
        dispatch({
            type: EDIT_PWD_ITEM_ERROR,
            payload: error.response?error.response: CONNECTION_ERROR
        })
    })
}