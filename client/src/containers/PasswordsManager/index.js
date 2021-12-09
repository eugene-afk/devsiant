import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import GetProjects from '../../context/actions/projects/GetProjects'
import { GlobalContext } from '../../context/Provider'
import PwdsList from '../../layout/PWDS/PwdsList'

const PasswordsManagerContainer = () => {
    const { pwdsDispatch, pwdsState } = useContext(GlobalContext)
    const history = useHistory()

    useEffect(() => {
        GetProjects(history)(pwdsDispatch)
    }, [])

    return <PwdsList state={ pwdsState } delState={pwdsState.deletePWD} editState={pwdsState.editPWD} addState={pwdsState.addPWD} favoriteState={pwdsState.addStar} />
}

export default PasswordsManagerContainer
