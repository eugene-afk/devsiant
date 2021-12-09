import axiosInstance from '../../../api/instance'
import { TREE_LOADING, TREE_LOAD_ERROR, TREE_LOAD_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

const getFiles = (history) => (dispatch) => (dir = '') => {
    dispatch({
        type: TREE_LOADING
    })
    axiosInstance(history).get("/files/", {params: {'directory_path': dir}})
    .then((res) => {
        dispatch({
            type: TREE_LOAD_SUCCESS,
            payload: res.data
        })
    })
    .catch((error) => {
        dispatch({
            type: TREE_LOAD_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}

export default getFiles