import React from 'react'
import { Container, Icon, Header, Modal, Message, Grid, Card, Placeholder } from 'semantic-ui-react'
import EditNoteForm from './EditNoteForml'

const NotesUI = ({Logic: {notesState, open, setOpen, editItem, setEditItem, openEditModal }}) => {
    return (
        <Container>
            <div className="c-container">
                <Header as='h2' inverted>
                    <Icon name='sticky note' />
                    <Header.Content style={{textAlign: 'left'}}>
                        Notes
                    <Header.Subheader>Here stores your saved notes</Header.Subheader>
                    </Header.Content>
                </Header>

                <Modal
                    closeIcon
                    open={open}
                    onClose={() => {
                                    setOpen(false)
                                    setEditItem({})
                                }}
                    onOpen={() => setOpen(true)}
                    >
                    <Header icon='edit' content={`Editing ${editItem.name}`} />
                    <Modal.Content>
                       <EditNoteForm editItem={editItem} loading={notesState.editNote.loading} setOpen={setOpen} setEditItem={setEditItem} 
                                     delLoading={notesState.deleteNote.loading} />
                    </Modal.Content>
                </Modal>

                {!notesState.notes.loading && notesState.notes.data.length === 0 && (
                    <Message
                        content={'Looks like no items was found.'}
                    />
                )}

                {!notesState.notes.loading && (notesState.notes.error || notesState.deleteNote.error || notesState.editNote.error || notesState.addNote.error) && (
                    <Message
                        content={'Could not connect. Try again later.'}
                        color={'red'}
                    />
                )}

                <Grid container style={{marginLeft: 0}} centered>
                    {!notesState.notes.loading && notesState.notes.data.length > 0 && notesState.notes.data.map((note) => 
                        <Grid.Column key={note.id} mobile={16} computer={5} style={{wordBreak: 'break-all'}}>
                            <Card fluid color='blue' style={{height: '100%', background: '#F2E772'}} onClick={() => openEditModal(note)}>
                                <Card.Content header={note.name} style={{display: 'flex', alignSelf: 'center', alignItems: 'center'}} />
                                <Card.Content description={note.content.length > 255?`${note.content.substring(0, 255)}...`:note.content} />
                            </Card>
                        </Grid.Column>
                    )}
                </Grid>

                {notesState.notes.loading && notesState.notes.data.length == 0 && <> 
                {" "}
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
                </Placeholder>
                </>} 

            </div>
        </Container>
    )
}

export default NotesUI
