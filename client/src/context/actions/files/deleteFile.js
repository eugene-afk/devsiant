import axiosInstance from '../../../api/instance'
import { DELETE_FMITEM_ERROR, DELETE_FMITEM_LOAD, DELETE_FMITEM_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

const deleteFile = (payload) => (history) => (dispatch) => {
    dispatch({
        type: DELETE_FMITEM_LOAD
    })
    axiosInstance(history).post("/files/delete", payload)
    .then((res) => {
        dispatch({
            type: DELETE_FMITEM_SUCCESS,
            payload: res.data
        })
    })
    .catch((error) => {
        dispatch({
            type: DELETE_FMITEM_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}

export default deleteFile