import axiosInstance from '../../../api/instance'
import { ADD_TREE_FILE_ERROR, ADD_TREE_FILE_LOAD, ADD_TREE_FILE_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

const uploadFiles = (payload, path, setPercent, setOpen) => (dispatch) => (history) => {
    dispatch({
        type: ADD_TREE_FILE_LOAD
    })
    axiosInstance(history).post("/files/upload", payload, {headers: { 'Content-Type': 'multipart/form-data' }, params: {'path': path}, 
    onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setPercent(percentCompleted)
    }})
    .then((res) => {
        setPercent(0)
        dispatch({
            type: ADD_TREE_FILE_SUCCESS,
            payload: res.data
        })
        setOpen(false)
    })
    .catch((error) => {
        dispatch({
            type: ADD_TREE_FILE_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}

export default uploadFiles