import React, { useState, useContext } from 'react'
import FileItem from '../../components/FilesItem'
import { Container, Grid, Icon, Message, Segment, Input, Popup, Placeholder, Header } from 'semantic-ui-react'
import UploadModal from '../../components/Upload/UploadModal'
import ContextifyMenu from '../../components/FilesItem/ContextifyMenu'
import { useContextMenu } from 'react-contexify'
import { MenuID } from '../../constants/MenuID'
import RenameModal from '../../components/FilesItem/RenameModal'
import CreateFolderModal from '../../containers/FileManager/CreateFolderModal'
import { GlobalContext } from '../../context/Provider'
import { CLEAR_ADD_FILE } from '../../constants/actionTypes'

const FilesManagerUI = ({logicFM: { goForward, goBack, dir, refresh, onSearchChange, selectEnable, toggleSelect,
                                    addToSelectedList, removeFromSelectedList, downloadMultipleFiles, selectedFiles,
                                    open, setOpen},
                                    state: {tree: {loading, isSearchActive, foundFiles, error, data}}, addFilesState, addFolderState, editItemState, deleteItemState})=>{

    const {fmDispatch} = useContext(GlobalContext)
    const [selectedItem, setSelectedItem] = useState({})

    const setContextSelectedItem = (itemName, itemDir, isFile) => {
        setSelectedItem({'itemName': itemName, 'itemDir': itemDir, 'isFile': isFile})
    }

    const { show } = useContextMenu({
        id: MenuID
      });

    const handleContextMenu = (event) => {
        show(event)
    }

    const items = isSearchActive?foundFiles:data

    return (
        <Container>

            <div className="c-container">
            <Header as='h2' inverted>
                <Icon name='file' />
                <Header.Content style={{textAlign: 'left'}}>
                    Files Manager
                <Header.Subheader>Download, upload, rename, delete and search files in your storage</Header.Subheader>
                </Header.Content>
            </Header>

            <Segment color={"blue"} inverted><strong>Note: </strong> You can rename or delete a single item by rigth click (long tap for mobile) on folder or file.</Segment>
                <div style={{display: 'flex', marginBottom: '1.5rem', marginTop: '1.5rem', fontSize: '2rem'}}>
                    <div style={{alignSelf: "center"}}>
                        <Popup content='Back' position='bottom center' trigger={
                            <Icon color={"blue"} name="arrow left" style={{cursor: 'pointer'}} onClick={() => goBack()} />
                        } />
                        
                    </div>
                    <div style={{fontSize: '1.3rem', marginLeft: '1rem'}}>
                        <Segment inverted style={{padding: '0.5rem'}}>
                            <div style={{wordBreak: 'break-word'}}>
                                {dir.full_dir?`root/${dir.full_dir}/`:'root/'}
                            </div>
                        </Segment>
                    </div>
                </div>

                {items[dir.dir] !== undefined &&  (
                    <div>
                        <Input icon='search' placeholder='Search in current directory...' name='search' onChange={onSearchChange} autoComplete="off"
                        style={{
                            width: '100%',
                            marginBottom: '1rem' 
                        }} />
                    </div>
                )}

                {items[dir.dir] !== undefined && (
                    <div style={{marginBottom: '1rem', marginTop: '1rem', fontSize: '2rem', textAlign: "right", width: '100%'}}>
                    <Popup content='Refresh' position='bottom center' trigger={
                        <Icon color={"blue"} name="refresh" style={{cursor: 'pointer'}} onClick={() => refresh()} /> 
                    } />

                    {items[dir.dir] !== undefined && (items[dir.dir]['files'].length > 0) && (
                        <Popup content='Select mode' position='bottom center' trigger={
                            <Icon color={"yellow"} name="selected radio" style={{cursor: 'pointer'}} onClick={() => toggleSelect()} />
                        } />
                    )}

                    <CreateFolderModal dir={dir.full_dir} />
                    
                    <UploadModal path={dir.full_dir} />
                    
                    {selectEnable && selectedFiles.length >= 1&&
                        <Popup content='Download selected' position='bottom center' trigger={
                            <Icon color={"green"} name="download" style={{cursor: 'pointer'}} onClick={() => downloadMultipleFiles()} />
                        } />
                    }           
                </div>
                )}

                {(error || addFolderState.error || editItemState.error || deleteItemState.error) && (
                    <Message
                        content={'Could not connect. Try again later.'}
                        color={"red"}
                    />
                )}
                
                {Object.keys(addFilesState.res).length !== 0 &&(
                    addFilesState.res['status'] === 'error'?
                        <Message
                            content={'Something goes wrong.'}
                            color={"red"}
                        />
                    :
                        <Message
                            content={`Successfully uploaded ${addFilesState.res['count_success']} files. Failed: ${addFilesState.res['count_failed']} files`}
                            color={"green"}
                            onDismiss={() => fmDispatch({
                                type: CLEAR_ADD_FILE
                            })}
                        />
                )}

                {items[dir.dir] !== undefined&& (
                    items[dir.dir]['children'].length === 0 && items[dir.dir]['files'].length === 0&&(
                        <Message
                            content={'Looks like no items was found.'}
                        />
                    )
                )}


                {loading &&(
                    <Placeholder fluid>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                )}

                <Grid centered>

                {!loading && items[dir.dir] !== undefined &&(
                    items[dir.dir]['children'].length > 0 &&(
                        items[dir.dir]['children'].map((item) =>
                            <Grid.Column computer={2} mobile={6} onClick={() => goForward(item)} key={items[dir.dir]['children'].indexOf(item)}>
                                <FileItem itemName={item} isFile={false} fullDir={dir.full_dir} handleContextMenu={handleContextMenu}
                                          setContextSelectedItem={setContextSelectedItem} />
                            </Grid.Column>
                        )                    
                    )
                )}

                {!loading && items[dir.dir] !== undefined &&(
                
                items[dir.dir]['files'].length > 0 &&(
                    items[dir.dir]['files'].map((item) =>
                            <Grid.Column computer={2} mobile={6} key={items[dir.dir]['files'].indexOf(item)}>
                                <FileItem itemName={item} selectEnable={selectEnable} fullDir={dir.full_dir}
                                          addToSelectedList={addToSelectedList} removeFromSelectedList={removeFromSelectedList} isFile={true}
                                          handleContextMenu={handleContextMenu} setContextSelectedItem={setContextSelectedItem} />
                            </Grid.Column>
                        )
                    )
                )}
                <RenameModal selectedItem={selectedItem} open={open} setOpen={setOpen} fullDir={dir.full_dir} />
                
                <ContextifyMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} setOpen={setOpen} />

                </Grid>
            </div>

        </Container>
    )
}

export default FilesManagerUI
