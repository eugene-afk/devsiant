import {
    TREE_LOADING,
    TREE_LOAD_SUCCESS,
    TREE_LOAD_ERROR,
    ADD_TREE_FOLDER_LOAD,
    ADD_TREE_FOLDER_SUCCESS,
    ADD_TREE_FOLDER_ERROR,
    ADD_TREE_FILE_LOAD,
    ADD_TREE_FILE_SUCCESS,
    ADD_TREE_FILE_ERROR,
    CLEAR_ADD_FOLDER,
    CLEAR_ADD_FILE,
    DELETE_FMITEM_SUCCESS,
    DELETE_FMITEM_LOAD,
    DELETE_FMITEM_ERROR,
    SEARCH_FILES,
    EDIT_FMITEM_SUCCESS,
    EDIT_FMITEM_ERROR,
    EDIT_FMITEM_LOAD,
    LOGOUT_USER
  } from "../../constants/actionTypes"

  import filesInitialState from "../initialstates/filesInitialState"

  const files = (state, { payload, type }) => {
    switch (type) {
      case TREE_LOADING: {
        return {
          ...state,
          tree: {
            ...state.tree,
            loading: true,
          },
        };
      }
  
      case TREE_LOAD_SUCCESS: {
        return {
          ...state,
          tree: {
            ...state.tree,
            error: null,
            loading: false,
            data: payload,
          },
        };
      }
      case TREE_LOAD_ERROR: {
        return {
          ...state,
          tree: {
            ...state.tree,
            loading: false,
            error: payload,
          },
        };
      }
  
      case CLEAR_ADD_FOLDER: {
        return {
          ...state,
          addFolder: {
            ...state.addFolder,
            error: null,
            loading: false,
            data: null,
          },
        };
      }

      case CLEAR_ADD_FILE: {
        return {
          ...state,
          addFile: {
            ...state.addFile,
            error: null,
            loading: false,
            data: null,
            res: {}
          },
        };
      }
  
      case LOGOUT_USER: {
        return {
          ...state,
          filesInitialState,
        };
      }
  
      case ADD_TREE_FOLDER_LOAD: {
        return {
          ...state,
          addFolder: {
            ...state.addFolder,
            error: null,
            loading: true,
          },
        };
      }
  
      case ADD_TREE_FOLDER_ERROR: {
        return {
          ...state,
          addFolder: {
            ...state.addFolder,
            loading: false,
            error: payload,
          },
        };
      }
  
      case ADD_TREE_FOLDER_SUCCESS: {
        const key = Object.keys(state.tree.data)[0]
        const value = Object.keys(payload)[0]
        if(!state.tree.data[key]['children'].includes(value)){
            state.tree.data[key]['children'].unshift(value)
        }
        return {
          ...state,
          addFolder: {
            ...state.addFolder,
            loading: false,
            data: payload,
            error: null
          },
  
          tree: {
            ...state.tree,
            loading: false,
            isSearchActive: false,
            foundFiles: []
          },
        };
      }

      case ADD_TREE_FILE_LOAD: {
        return {
          ...state,
          addFile: {
            ...state.addFile,
            error: null,
            loading: true,
          },
        };
      }
  
      case ADD_TREE_FILE_ERROR: {
        return {
          ...state,
          addFile: {
            ...state.addFile,
            loading: false,
            error: payload,
            res: {'status': 'error', 'count_success': 0, 'count_failed': 0}
          },
        };
      }
  
      case ADD_TREE_FILE_SUCCESS: {
        const filesNormalized = payload.replace(/'/g, '"');
        const filesJson = JSON.parse(filesNormalized)
        let res = {'status': '', 'count_success': 0, 'count_failed': 0}
        res['status'] = 'success'
        const mainKey = Object.keys(state.tree.data)[0]
        for (const [key, value] of Object.entries(filesJson)) {
            if(value === 'success'){
                if(!state.tree.data[mainKey]['files'].includes(key)){
                    state.tree.data[mainKey]['files'].unshift(key)
                }
                res['count_success'] += 1
            }
            if(value === 'failed'){
                res['count_failed'] += 1
            }
        }
        return {
          ...state,
          addFile: {
            ...state.addFile,
            loading: false,
            data: payload,
            res: res,
            error: null
          },
  
          tree: {
            ...state.tree,
            loading: false,
            isSearchActive: false,
            foundFiles: []
          },
        };
      }

      case EDIT_FMITEM_LOAD: {
        return {
          ...state,
          editFMItem: {
            ...state.editFMItem,
            error: null,
            loading: true,
          },
        };
      }
  
      case EDIT_FMITEM_ERROR: {
        return {
          ...state,
          editFMItem: {
            ...state.editFMItem,
            loading: false,
            error: payload,
          },
        };
      }
  
      case EDIT_FMITEM_SUCCESS: {
        let arrType = 'files'
        if(!payload.is_file){
            arrType = 'children'
        }
        const key = Object.keys(state.tree.data)[0]
        if(state.tree.data[key][arrType].includes(payload.old_name)){
            state.tree.data[key][arrType] = state.tree.data[key][arrType].filter(item => item !== payload.old_name)
            state.tree.data[key][arrType].unshift(payload.new_name)
        }
        return {
          ...state,
          editFMItem: {
            ...state.editFMItem,
            loading: false,
            data: payload,
            error: null
          },
          
          tree: {
            ...state.tree,
            loading: false,
            isSearchActive: false,
            foundFiles: []
          },
        };
      }
  
      case DELETE_FMITEM_LOAD: {
        return {
            ...state,
            deleteFMItem: {
              ...state.deleteFMItem,
              loading: true,
            },
          };
      }

      case DELETE_FMITEM_ERROR: {
        return {
          ...state,
          deleteFMItem: {
            ...state.deleteFMItem,
            loading: false,
            error: payload
          },
        };
      }
  
      case DELETE_FMITEM_SUCCESS: {
        const key = Object.keys(state.tree.data)[0]
        let type = 'files'
        if(!payload.is_file){
            type = 'children'
        }
        state.tree.data[key][type] = state.tree.data[key][type].filter((item) => item !== payload.name)
        return {
          ...state,
          tree: {
            ...state.tree,
            loading: false,
            isSearchActive: false,
            foundFiles: []
          },
          deleteFMItem: {
            ...state.deleteFMItem,
            loading: false,
            error: null
          },
        };
      }
  
      case SEARCH_FILES: {
        const key = Object.keys(state.tree.data)[0]
        const searchValue = payload?.toLowerCase();
        let newTree = JSON.parse(JSON.stringify(state.tree.data))
        newTree[key]['children'] = newTree[key]['children'].filter((item) => {
            try {
              return (
                item.toLowerCase().search(searchValue) !== -1
              )
            }
             catch{
              return []
            }
        })
        newTree[key]['files'] = newTree[key]['files'].filter((item) => {
            try {
              return (
                item.toLowerCase().search(searchValue) !== -1
              )
            }
             catch{
              return []
            }
        })
        return {
          ...state,
          tree: {
            ...state.tree,
            loading: false,
            isSearchActive: !!payload.length > 0 || false,
            foundFiles: newTree
          }
        };
      }
      default:
        return state;
    }
  };
  
  export default files;