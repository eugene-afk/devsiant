import React, {useContext, useEffect} from 'react'
import getFiles from '../../context/actions/files/getFiles'
import { GlobalContext } from '../../context/Provider'
import FilesManagerUI from '../../layout/Files'
import FMLogic from './FMLogic'
import { useHistory } from 'react-router-dom'

const FileManagerContainer = () => {
    const {fmState, fmDispatch} = useContext(GlobalContext)
    const history = useHistory()

    useEffect(() => {
        getFiles(history)(fmDispatch)()
    }, [])
    return <FilesManagerUI logicFM={FMLogic()} state={fmState} addFilesState={fmState.addFile} addFolderState={fmState.addFolder} editItemState={fmState.editFMItem} 
                           deleteItemState={fmState.deleteFMItem} />
}

export default FileManagerContainer
