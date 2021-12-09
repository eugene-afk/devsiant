import axiosInstance from '../../../api/instance'
import { PWDS_LOADING, PWDS_LOAD_ERROR, PWDS_LOAD_SUCCESS } from '../../../constants/actionTypes'
import { CONNECTION_ERROR } from '../../../constants/api'

export default (history) => (dispatch) => {
    dispatch({
        type: PWDS_LOADING
    })
    axiosInstance(history).get("/projects/")
    .then((res) => {
        dispatch({
            type: PWDS_LOAD_SUCCESS,
            payload: res.data
        })
    })
    .catch((error) => {
        dispatch({
            type: PWDS_LOAD_ERROR,
            payload: error.response?error.response.data:CONNECTION_ERROR
        })
    })
}