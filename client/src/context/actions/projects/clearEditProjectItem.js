import { CLEAR_EDIT_PWD_ITEM } from "../../../constants/actionTypes"

export default () => (dispatch) => {
    dispatch({
        type: CLEAR_EDIT_PWD_ITEM
    })
}