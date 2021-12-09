import React, { createContext, useReducer } from 'react'
import authInitialState from './initialstates/authInitialState'
import pwdsInitialState from './initialstates/pwdsInitialState'
import pwdInitialState from './initialstates/pwdInitialState'
import filesInitialState from './initialstates/filesInitialState'
import notesInitialState from './initialstates/notesInitialState'
import auth from './reducers/auth'
import pwds from './reducers/pwds'
import pwd from './reducers/pwd'
import files from './reducers/files'
import notes from './reducers/notes'

export const GlobalContext = createContext({})
export const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(auth, authInitialState)
    const [pwdsState, pwdsDispatch] = useReducer(pwds, pwdsInitialState)
    const [pwdState, pwdDispatch] = useReducer(pwd, pwdInitialState)
    const [fmState, fmDispatch] = useReducer(files, filesInitialState)
    const [notesState, notesDispatch] = useReducer(notes, notesInitialState)

    return (
        <GlobalContext.Provider value={{
            authState,
            authDispatch,
            pwdsState,
            pwdsDispatch,
            pwdState,
            pwdDispatch,
            fmState,
            fmDispatch,
            notesState,
            notesDispatch
        }}>{ children }</GlobalContext.Provider>
    )
}