import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import GetProject from '../../context/actions/projects/GetProject'
import { GlobalContext } from '../../context/Provider'
import PwdItemsList from '../../layout/PWDS/PwdItemsList'

const PasswordProjectItemContainer = () => {
    let { id } = useParams();
    const { pwdDispatch, pwdState } = useContext(GlobalContext)
    const history = useHistory()

    useEffect(() => {
        GetProject(id, history)(pwdDispatch)
    }, [])

    return <PwdItemsList state={ pwdState } delState={pwdState.deletePWDItem} editState={pwdState.editPWDItem} addState={pwdState.addPWDItem} />
}

export default PasswordProjectItemContainer