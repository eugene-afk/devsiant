import React, {useContext} from 'react'
import { Menu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'
import { MenuID } from '../../constants/MenuID';
import { Icon } from 'semantic-ui-react'
import deleteFile from '../../context/actions/files/deleteFile';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/Provider';
import { baseURL } from '../../api/baseURL'

const ContextifyMenu = ({selectedItem, setSelectedItem, setOpen, linkCopied}) => {
    const history = useHistory()
    const {fmDispatch} = useContext(GlobalContext)
    const openRenameFileOrDirModal = () => {
        setOpen(true)
    }

    const deleteFileOrDir = async () => {
        let path = `${selectedItem.itemDir}/${selectedItem.itemName}`
        if(selectedItem.itemDir === ''){
            path = selectedItem.itemName
        }
        deleteFile({'path': path, 'is_file': selectedItem.isFile, 'name': selectedItem.itemName})(history)(fmDispatch)
        setSelectedItem({})
    }

    const copyLinkToFile = async () => {
        const url = `${baseURL}/files/download?path=${selectedItem.itemDir}&filename=${selectedItem.itemName}&token=${localStorage.token?localStorage.token:''}`
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state === "granted" || result.state === "prompt") {
                linkCopied("", true)
                navigator.clipboard.writeText(url)
                return
            }
        });
        linkCopied(url, false)
    }

    return (
        <Menu id={MenuID}>
            <Item onClick={openRenameFileOrDirModal}><Icon color={"green"} name="edit" style={{fontSize: "1.3rem"}} /> Rename</Item>
            <Item onClick={deleteFileOrDir}><Icon color={"red"} name="trash" style={{fontSize: "1.3rem"}} /> Delete</Item>
            <Item onClick={copyLinkToFile}><Icon color={"blue"} name="copy" style={{fontSize: "1.3rem"}} /> Copy link</Item>
        </Menu>
    )
}

export default ContextifyMenu
