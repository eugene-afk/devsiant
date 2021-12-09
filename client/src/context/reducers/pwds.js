import {
    PWDS_LOADING,
    PWDS_LOAD_SUCCESS,
    PWDS_LOAD_ERROR,
    LOGOUT_USER,
    ADD_PWD_LOAD,
    ADD_PWD_SUCCESS,
    ADD_PWD_ERROR,
    CLEAR_ADD_PWD,
    DELETE_PWD_SUCCESS,
    DELETE_PWD_LOAD,
    DELETE_PWD_ERROR,
    ADD_REMOVE_STAR_SUCCESS,
    SEARCH_PWDS,
    EDIT_PWD_SUCCESS,
    EDIT_PWD_ERROR,
    EDIT_PWD_LOAD,
    ADD_REMOVE_STAR_ERROR,
    ADD_REMOVE_STAR_LOAD,
  } from "../../constants/actionTypes"
import pwdsInitialState from "../initialstates/pwdsInitialState"

  const pwds = (state, { payload, type }) => {
    switch (type) {
      case PWDS_LOADING: {
        return {
          ...state,
          pwds: {
            ...state.pwds,
            loading: true,
          },
        };
      }
  
      case PWDS_LOAD_SUCCESS: {
        return {
          ...state,
          pwds: {
            ...state.pwds,
            error: null,
            loading: false,
            data: payload,
          },
        };
      }
      
      case PWDS_LOAD_ERROR: {
        return {
          ...state,
          pwds: {
            ...state.pwds,
            loading: false,
            error: payload,
          },
        };
      }
  
      case CLEAR_ADD_PWD: {
        return {
          ...state,
          addPWD: {
            ...state.addPWD,
            error: null,
            loading: false,
            data: null,
          },
        };
      }
  
      case LOGOUT_USER: {
        return {
          ...state,
          pwdsInitialState,
        };
      }
  
      case ADD_PWD_LOAD: {
        return {
          ...state,
          addPWD: {
            ...state.addPWD,
            error: null,
            loading: true,
          },
        };
      }
  
      case ADD_PWD_ERROR: {
        return {
          ...state,
          addPWD: {
            ...state.addPWD,
            loading: false,
            error: payload
          },
        };
      }
  
      case ADD_PWD_SUCCESS: {
        return {
          ...state,
          addPWD: {
            ...state.addPWD,
            loading: false,
            data: payload,
            error: null
          },
  
          pwds: {
            ...state.pwds,
            loading: false,
            data: [payload, ...state.pwds.data],
          },
        };
      }

      case EDIT_PWD_LOAD: {
        return {
          ...state,
          editPWD: {
            ...state.editPWD,
            error: null,
            loading: true,
          },
        };
      }
  
      case EDIT_PWD_ERROR: {
        return {
          ...state,
          editPWD: {
            ...state.editPWD,
            loading: false,
            error: payload
          },
        };
      }
  
      case EDIT_PWD_SUCCESS: {
        state.pwds.data = state.pwds.data.filter((item) => {
          return item.id !== payload.id
        })
        return {
          ...state,
          editPWD: {
            ...state.editPWD,
            loading: false,
            data: payload,
            error: null
          },
          
          pwds: {
            ...state.pwds,
            loading: false,
            data: [payload, ...state.pwds.data],
          },
        };
      }
  
      case DELETE_PWD_LOAD: {
        return {
          ...state,
          pwds: {
            ...state.pwds,
            loading: false,
            data: state.pwds.data.map((item) => {
              if (item.id === payload) {
                return { ...item, deleting: true };
              }
              return item;
            }),
          },
        };
      }

      case ADD_REMOVE_STAR_LOAD: {
        return {
          ...state,
          pwds: {
            ...state.pwds,
            data: state.pwds.data.map((item) => {
              if (item.id === payload) {
                return { ...item, busy: true };
              }
              return item;
            }),
          },
        };
      }

      case ADD_REMOVE_STAR_ERROR: {
        return {
          ...state,
          addStar: {
            ...state.addStar,
            error: payload
          },
        };
      }

      case ADD_REMOVE_STAR_SUCCESS: {
        state.pwds.data = state.pwds.data.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        })
              
        return {
          ...state,
          pwds: {
            ...state.pwds,
            error: null,
            data: state.pwds.data.sort((x, y) =>{return (x.favorite === y.favorite)? 0 : x.favorite? -1: 1} )
          },
        };
      }
  
      case DELETE_PWD_SUCCESS: {
        return {
          ...state,
          pwds: {
            ...state.pwds,
            loading: false,
            data: state.pwds.data.filter((item) => item.id !== payload),
          },
          deletePWD: {
            ...state.deletePWD,
            error: null
          },
        };
      }

      case DELETE_PWD_ERROR: {
        return {
          ...state,
          deletePWD: {
            ...state.deletePWD,
            loading: false,
            error: payload
          },
        };
      }
  
      case SEARCH_PWDS: {
        const searchValue = payload?.toLowerCase();
        return {
          ...state,
          pwds: {
            ...state.pwds,
            loading: false,
            isSearchActive: !!payload.length > 0 || false,
            foundPWDS: state.pwds.data.filter((item) => {
              try {
                return (
                  item.name.toLowerCase().search(searchValue) !== -1 ||
                  item.desc.toLowerCase().search(searchValue) !== -1
                );
              } catch (error) {
                return [];
              }
            }),
          },
        };
      }
      default:
        return state;
    }
  };
  
  export default pwds;