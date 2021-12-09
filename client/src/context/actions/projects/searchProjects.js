import { SEARCH_PWDS } from "../../../constants/actionTypes"

export default (searchText) => (dispatch) => {
    dispatch({
        type: SEARCH_PWDS,
        payload: searchText
    })
}