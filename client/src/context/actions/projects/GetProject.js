import axiosInstance from '../../../api/instance'
import { PWD_ITEMS_LOADING, PWD_ITEMS_LOAD_ERROR, PWD_ITEMS_LOAD_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

export default (id, history) => (dispatch) => {
    dispatch({
        type: PWD_ITEMS_LOADING
    })
    axiosInstance(history).get("/projectitems/" + id)
    .then((res) => {
        dispatch({
            type: PWD_ITEMS_LOAD_SUCCESS,
            payload: res.data
        })
    })
    .catch((error) => {
        dispatch({
            type: PWD_ITEMS_LOAD_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}