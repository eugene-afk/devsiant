import axiosInstance from '../../../api/instance'
import { ADD_TREE_FOLDER_ERROR, ADD_TREE_FOLDER_LOAD, ADD_TREE_FOLDER_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

const createFolder = (history) => (path, name) => (dispatch) => {
    dispatch({
        type: ADD_TREE_FOLDER_LOAD
    })
    axiosInstance(history).post("/files/folder", {}, {params:{'name': name, 'path': path}})
    .then((res) => {
        dispatch({
            type: ADD_TREE_FOLDER_SUCCESS,
            payload: res.data
        })
    })
    .catch((error) => {
        dispatch({
            type: ADD_TREE_FOLDER_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}

export default createFolder