import axiosInstance from '../../../api/instance'
import { EDIT_FMITEM_ERROR, EDIT_FMITEM_LOAD, EDIT_FMITEM_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

const renameFile = (payload, setOpen) => (dispatch) => (history) => {
    dispatch({
        type: EDIT_FMITEM_LOAD
    })
    axiosInstance(history).post("/files/rename", payload)
    .then((res) => {
        dispatch({
            type: EDIT_FMITEM_SUCCESS,
            payload: res.data
        })
        setOpen(false)
    })
    .catch((error) => {
        dispatch({
            type: EDIT_FMITEM_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}

export default renameFile