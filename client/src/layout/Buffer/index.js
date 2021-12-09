import React from 'react'
import { Container, Popup, Icon, Header, Form, TextArea, Button, Message, Modal } from 'semantic-ui-react'
import { Prompt } from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const BufferUI = ({Logic: {onChange, isConnected, text, clearText, saveBufferToRemote, isSavedBuffer, deleteBufferFromRemote, notesState,
                            open, setOpen, formInvalid, formIsHalfFillef, noteName, onChangeNewNoteName, addNote}}) => {
    
    return (
        <Container>
            <div className="c-container">
            <Header as='h2' inverted>
                <Icon name='copy' />
                <Header.Content style={{textAlign: 'left'}}>
                    Global Buffer
                <Header.Subheader>Type any text here and it will real time updated on other clients</Header.Subheader>
                </Header.Content>
            </Header>

            <Modal
                    closeIcon
                    open={open}
                    onClose={() => {setOpen(false)}}
                    onOpen={() => setOpen(true)}>
                    <Header icon='plus' content='Adding Note' />
                    <Modal.Content>
                        <Prompt when={formIsHalfFillef} message="Looks like you didn't save changes, leave now?" />
                        <Form onSubmit={addNote} autoComplete="off">
                            <Form.Field>
                                <Form.Input placeholder='Name' name="name" onChange={onChangeNewNoteName} autoFocus value={noteName} />
                            </Form.Field>

                            <Button type="submit" disabled={formInvalid} primary>Submit</Button>
                        </Form>
                    </Modal.Content>
                </Modal>

            {notesState.addNote.error && (
                <Message
                    content={'Could not connect. Try again later.'}
                    color={'red'}
                />
            )}

            <div style={{textAlign: 'left'}}>
                <Popup content={isConnected?'Connected':'Disconnected'} position='right center' trigger={
                        <Icon name='circle' color={isConnected?'green':'red'} style={{fontSize: '1.5rem', margin: '0.5rem'}} />
                } />
            </div>
            <Form>
                <TextArea placeholder='Start writing...' style={{ minHeight: 300 }} onChange={onChange} value={text} />
            </Form>
                <div style={{textAlign: 'center', marginTop: '1rem'}}>
                    {text && (
                        <div>
                            <Popup content={'Copy text to clipboard'} position='top center' trigger={
                                <CopyToClipboard text={text}>
                                    <Button primary>Copy</Button>
                                </CopyToClipboard>
                            } />
                            <Popup content={'Clear text'} position='top center' trigger={
                                <Button color={'red'} onClick={clearText}>Clear</Button>
                            } />
                            {isSavedBuffer && (
                                <Popup content={'Delete last saved text from remote'} position='top center' trigger={
                                    <Button color={'red'} onClick={deleteBufferFromRemote}>Delete</Button>
                                } />
                            )}
                            {!isSavedBuffer && (
                                <Popup content={'Save current text to remote'} position='top center' trigger={
                                        <Button color={'green'} onClick={saveBufferToRemote}>Save</Button>
                                } />
                            )}

                            <Popup content={'Save text as note'} position='top center' trigger={
                                    <Button color={'yellow'} onClick={() => setOpen(true)} style={{marginTop: '0.5rem'}}>Save as Note</Button>
                            } />
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default BufferUI
