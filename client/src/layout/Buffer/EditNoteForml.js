import React, {useContext} from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { Prompt } from 'react-router-dom'
import editNote from '../../context/actions/notes/editNote'
import { GlobalContext } from '../../context/Provider'
import deleteNote from '../../context/actions/notes/deleteNote'

const EditNoteForm = ({editItem, loading, setOpen, setEditItem, delLoading}) => {
    const {notesDispatch} = useContext(GlobalContext)
    const formInvalid=!editItem.name?.length || !editItem.content?.length
    const formIsHalfFillef = Object.values(editItem).filter((item) => item && item !== "").length > 0

    const onSubmit = () => {
        editNote(editItem.id, {'name': editItem.name, 'content': editItem.content})(notesDispatch)
        setOpen(false)
    }

    const onChange = (e, {name, value}) => {
        setEditItem({...editItem, [name]: value})
    }

    const handleDelete = () => {
        deleteNote(editItem.id)(notesDispatch)
        setOpen(false)
    }

    return (
        <div>
            <Prompt when={formIsHalfFillef} message="Looks like you didn't save changes, leave now?" />
            <Form onSubmit={onSubmit} autoComplete="off">
                <Form.Field>
                    <Form.Input placeholder='Name' name="name" onChange={onChange} autoFocus value={editItem.name} />
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder='Content' name="content" onChange={onChange} value={editItem.content} />
                </Form.Field>

                <Button type="submit" loading={loading} disabled={formInvalid || loading} primary>Submit</Button>
                <Button type="button" loading={delLoading} disabled={delLoading} color={"red"} onClick={handleDelete}>Delete</Button>
            </Form>
        </div>
    )
}

export default EditNoteForm
