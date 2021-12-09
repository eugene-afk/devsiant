import { SEARCH_FILES } from "../../../constants/actionTypes"

export default (searchText) => (dispatch) => {
    dispatch({
        type: SEARCH_FILES,
        payload: searchText
    })
}