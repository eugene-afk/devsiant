import { CLEAR_EDIT_PWD } from "../../../constants/actionTypes"

export default () => (dispatch) => {
    dispatch({
        type: CLEAR_EDIT_PWD
    })
}