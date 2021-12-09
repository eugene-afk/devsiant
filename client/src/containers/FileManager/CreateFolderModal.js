import React, { useState, useContext } from 'react'
import { Icon, Popup, Modal, Header, Form, Button } from 'semantic-ui-react'
import createFolder from '../../context/actions/files/createFolder'
import { GlobalContext } from '../../context/Provider'
import { useHistory } from 'react-router-dom'

const CreateFolderModal = ({dir}) => {
    const history = useHistory()
    const {fmState, fmDispatch} = useContext(GlobalContext)
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({})

    const onChange = (e, {name, value}) => {
        setForm({...form, [name]: value})
    }

    const onSubmit = () => {
        createFolder(history)(dir, form.name)(fmDispatch)
        setOpen(false)
        setForm({})
    }

    const formInvalid=!form.name?.length

    return (
        <Modal
            closeIcon
            open={open}
            trigger={
                <span>
                    <Popup content='Create folder' position='bottom center' trigger={
                        <Icon color={"blue"} name="folder" style={{cursor: 'pointer'}} />
                    } />
                </span>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            >
            <Header icon="add" content="Creating new folder" />
            <Modal.Content>
                <Form onSubmit={onSubmit} autoComplete="off">
                    <Form.Field>
                        <Form.Input placeholder='Name' name="name" onChange={onChange} autoFocus value={form.name || ""} />
                    </Form.Field>

                    <Button primary type='submit' loading={fmState.addFolder.loading} disabled={formInvalid || fmState.addFolder.loading}>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default CreateFolderModal
