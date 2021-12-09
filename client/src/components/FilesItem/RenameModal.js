import React, { useState, useContext } from 'react'
import { Modal, Header, Form, Button } from 'semantic-ui-react'
import renameFile from '../../context/actions/files/renameFile'
import { GlobalContext } from '../../context/Provider'
import { useHistory } from 'react-router-dom'

const RenameModal = ({selectedItem, open, setOpen, fullDir}) => {
    const {fmState, fmDispatch} = useContext(GlobalContext)
    const history = useHistory()
    const [form, setForm] = useState({})

    const onSubmit = () => {
        let path = `${fullDir}/${selectedItem.itemName}`
        if(fullDir === ''){
            path = selectedItem.itemName
        }
        renameFile({'old_name': selectedItem.itemName, 'new_name': form.name, 'path': path, 'is_file': selectedItem.isFile}, setOpen)(fmDispatch)(history)
        setForm({})
    }
    const onChange = (e, {name, value}) => {
        setForm({...form, [name]: value})
    }

    const formInvalid=!form.name?.length

    return (
        <Modal
            closeIcon
            open={open}
            onClose={() => {setOpen(false); setForm({});}}
            onOpen={() => setOpen(true)}
            >
            <Header icon="edit" content={`Renaming ${selectedItem.itemName}`} />
            <Modal.Content>
                <Form onSubmit={onSubmit} autoComplete="off">
                    <Form.Field>
                        <Form.Input placeholder='Name' name="name" onChange={onChange} autoFocus value={form.name || selectedItem.itemName} />
                    </Form.Field>

                    <Button primary type='submit' loading={fmState.editFMItem.loading} disabled={formInvalid || fmState.editFMItem.loading}>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default RenameModal
