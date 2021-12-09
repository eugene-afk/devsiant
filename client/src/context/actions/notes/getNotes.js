import axiosInstance from '../../../api/instance'
import { NOTE_LOADING, NOTE_LOAD_ERROR, NOTE_LOAD_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

const getNotes = (dispatch) => {
    dispatch({
        type: NOTE_LOADING
    })
    axiosInstance().get("/notes/")
    .then((res) => {
        dispatch({
            type: NOTE_LOAD_SUCCESS,
            payload: res.data
        })
    })
    .catch((error) => {
        dispatch({
            type: NOTE_LOAD_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}

export default getNotes