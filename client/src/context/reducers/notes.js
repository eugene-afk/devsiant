import {
    NOTE_LOADING,
    NOTE_LOAD_SUCCESS,
    NOTE_LOAD_ERROR,
    ADD_NOTE_LOAD,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_ERROR,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_LOAD,
    DELETE_NOTE_ERROR,
    EDIT_NOTE_LOAD,
    EDIT_NOTE_SUCCESS,
    EDIT_NOTE_ERROR,
} from '../../constants/actionTypes'

const notes = (state, { payload, type }) => {
    switch (type) {
        case NOTE_LOADING: {
            return {
              ...state,
              notes: {
                ...state.notes,
                loading: true,
              },
            };
          }
      
          case NOTE_LOAD_SUCCESS: {
            return {
              ...state,
              notes: {
                ...state.notes,
                error: null,
                loading: false,
                data: payload,
              },
            };
          }
          
          case NOTE_LOAD_ERROR: {
            return {
              ...state,
              notes: {
                ...state.notes,
                loading: false,
                error: payload,
              },
            };
          }

          case ADD_NOTE_LOAD: {
            return {
              ...state,
              addNote: {
                ...state.addNote,
                error: null,
                loading: true,
              },
            };
          }
      
          case ADD_NOTE_ERROR: {
            return {
              ...state,
              addNote: {
                ...state.addNote,
                loading: false,
                error: payload
              },
            };
          }
      
          case ADD_NOTE_SUCCESS: {
            return {
              ...state,
              addNote: {
                ...state.addNote,
                loading: false,
                data: payload,
              },
      
              notes: {
                ...state.notes,
                loading: false,
                data: [payload, ...state.notes.data],
                error: null
              },
            };
          }

          case EDIT_NOTE_LOAD: {
            return {
              ...state,
              editNote: {
                ...state.editNote,
                error: null,
                loading: true,
              },
            };
          }
      
          case EDIT_NOTE_ERROR: {
            return {
              ...state,
              editNote: {
                ...state.editNote,
                loading: false,
                error: payload
              },
            };
          }
      
          case EDIT_NOTE_SUCCESS: {
            state.notes.data = state.notes.data.filter((item) => {
              return item.id !== payload.id
            })
            return {
              ...state,
              editNote: {
                ...state.editNote,
                loading: false,
                data: payload,
                error: null
              },
              
              notes: {
                ...state.notes,
                loading: false,
                data: [payload, ...state.notes.data],
              },
            };
          }

          case DELETE_NOTE_SUCCESS: {
            return {
              ...state,
              notes: {
                ...state.notes,
                loading: false,
                data: state.notes.data.filter((item) => item.id !== payload),
              },
              deleteNote: {
                ...state.deleteNote,
                loading: false,
                error: null
              },
            };
          }
    
          case DELETE_NOTE_ERROR: {
            return {
              ...state,
              deleteNote: {
                ...state.deleteNote,
                loading: false,
                error: payload
              },
            };
          }

          case DELETE_NOTE_LOAD: {
            return {
                ...state,
                deleteNote: {
                  ...state.deleteNote,
                  loading: true,
                },
              };
          }

    }
}

export default notes