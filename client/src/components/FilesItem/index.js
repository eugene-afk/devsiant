import React from 'react'
import { Image, Segment, Checkbox, Popup } from 'semantic-ui-react'
import { baseURL } from '../../api/baseURL'
import { AVAILABLE_EXTENSIONS_THUMBS } from '../../constants/extensions'

const FileItem = ({itemName = '', fullDir = '', selectEnable = false, addToSelectedList, removeFromSelectedList, isFile, handleContextMenu,
                   setContextSelectedItem}) => {

    const thumbRoot = "/files-thumb/"
    const getThumb = () => {
        if(isFile){
            const fileExt = itemName.split('.').pop();
            const fileExtNormalized = fileExt.toLowerCase()
            if(AVAILABLE_EXTENSIONS_THUMBS.includes(fileExtNormalized)){
                return `${thumbRoot}${fileExtNormalized}.svg`
            }
            return `${thumbRoot}file.svg`
        }
        return `${thumbRoot}folder.png`
    }

    const handleFileClick = () => {
        if(isFile){
            window.open(`${baseURL}/files/download?path=${fullDir}&filename=${itemName}&token=${localStorage.token?localStorage.token:''}`, '_blank');
        }
    }

    const openContextMenu = (event) => {
        handleContextMenu(event)
        setContextSelectedItem(itemName, fullDir, isFile)
    }

    return (
        <div style={{textAlign: 'center'}}>
            <div style={{cursor: 'pointer', textAlign: '-webkit-center'}} onClick={() => handleFileClick()} onContextMenu={openContextMenu}>
                <Image src={getThumb()} size='tiny' />
            </div>
            {selectEnable?<Checkbox style={{marginTop: '1rem'}} onChange={(e, data) => {
                data.checked?addToSelectedList(itemName):removeFromSelectedList(itemName)
            }} />:''}
            <div style={{height: '5rem'}}>
                    <Segment inverted style={{
                        textAlign: 'left',
                        wordBreak: 'break-all',
                        padding: 0,
                        marginTop: '0.5rem'
                        }}>                    
                        <Popup content={itemName} position='bottom center' trigger={
                            <div style={{padding: '0.5rem'}}>{itemName.length > 25?`${itemName.substring(0, 25)}...`:itemName}</div>
                        } />
                    </Segment>
                </div>
        </div>
        
    )
}

export default FileItem
