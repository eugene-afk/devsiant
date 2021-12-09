import { CLEAR_ADD_PWD } from "../../../constants/actionTypes"

export default () => (dispatch) => {
    dispatch({
        type: CLEAR_ADD_PWD
    })
}