import {
    PWD_ITEMS_LOADING,
    PWD_ITEMS_LOAD_SUCCESS,
    PWD_ITEMS_LOAD_ERROR,
    ADD_PWD_ITEM_LOAD,
    ADD_PWD_ITEM_SUCCESS,
    ADD_PWD_ITEM_ERROR,
    CLEAR_ADD_PWD_ITEM,
    DELETE_PWD_ITEM_SUCCESS,
    DELETE_PWD_ITEM_LOAD,
    DELETE_PWD_ITEM_ERROR,
    EDIT_PWD_ITEM_LOAD,
    EDIT_PWD_ITEM_ERROR,
    EDIT_PWD_ITEM_SUCCESS,
    CLEAR_EDIT_PWD_ITEM,
  } from "../../constants/actionTypes";

  const pwd = (state, { payload, type }) => {
    switch (type) {
      case PWD_ITEMS_LOADING: {
        return {
          ...state,
          pwd: {
            ...state.pwd,
            loading: true,
          },
        };
      }
  
      case PWD_ITEMS_LOAD_SUCCESS: {
        return {
          ...state,
          pwd: {
            ...state.pwd,
            error: null,
            loading: false,
            data: payload
          },
        };
      }
      case PWD_ITEMS_LOAD_ERROR: {
        return {
          ...state,
          pwd: {
            ...state.pwd,
            loading: false,
            error: payload,
          },
        };
      }
  
      case CLEAR_ADD_PWD_ITEM: {
        return {
          ...state,
          addPWDItem: {
            ...state.addPWDItem,
            error: null,
            loading: false,
            data: null,
          },
        };
      }

      case CLEAR_EDIT_PWD_ITEM: {
        return {
          ...state,
          editPWDItem: {
            ...state.editPWDItem,
            error: null,
            loading: false,
            data: null,
          },
        };
      }
  
      case ADD_PWD_ITEM_LOAD: {
        return {
          ...state,
          addPWDItem: {
            ...state.addPWDItem,
            error: null,
            loading: true,
          },
        };
      }
  
      case ADD_PWD_ITEM_ERROR: {
        return {
          ...state,
          addPWDItem: {
            ...state.addPWDItem,
            loading: false,
            error: payload
          },
        };
      }
  
      case ADD_PWD_ITEM_SUCCESS: {
        return {
          ...state,
          addPWDItem: {
            ...state.addPWDItem,
            loading: false,
            data: payload,
            error: null
          },
  
          pwd: {
            ...state.pwd,
            loading: false,
            data: [payload, ...state.pwd.data],
          },
        };
      }

      case EDIT_PWD_ITEM_LOAD: {
        return {
          ...state,
          editPWDItem: {
            ...state.editPWDItem,
            error: null,
            loading: true,
          },
        };
      }
  
      case EDIT_PWD_ITEM_ERROR: {
        return {
          ...state,
          editPWDItem: {
            ...state.editPWDItem,
            loading: false,
            error: payload
          },
        };
      }
  
      case EDIT_PWD_ITEM_SUCCESS: {
        state.pwd.data = state.pwd.data.filter((item) => {
          return item.id !== payload.id
        })
        return {
          ...state,
          editPWDItem: {
            ...state.editPWDItem,
            loading: false,
            data: payload,
            error: null
          },
          
          pwd: {
            ...state.pwd,
            loading: false,
            data: [payload, ...state.pwd.data],
          },
        };
      }
  
      case DELETE_PWD_ITEM_LOAD: {
        return {
          ...state,
          pwd: {
            ...state.pwd,
            loading: false,
            data: state.pwd.data.map((item) => {
              if (item.id === payload) {
                return { ...item, deleting: true };
              }
              return item;
            }),
          },
        };
      }

      case DELETE_PWD_ITEM_ERROR: {
        return {
          ...state,
          deletePWDItem: {
            ...state.deletePWDItem,
            loading: false,
            error: payload
          },
        };
      }
  
      case DELETE_PWD_ITEM_SUCCESS: {
        return {
          ...state,
          pwd: {
            ...state.pwd,
            loading: false,
            data: state.pwd.data.filter((item) => item.id !== payload),
            error: null
          },
        };
      }
  
      default:
        return state;
    }
  };
  
  export default pwd;