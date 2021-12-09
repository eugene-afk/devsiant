import React, { useState } from 'react'
import { Icon, Popup, Modal, Header } from 'semantic-ui-react'
import UploadComponent from '.'

const UploadModal = ({path}) => {
    const [open, setOpen] = useState(false)
    
    return (
        <Modal
        closeIcon
        open={open}
        trigger={
            <span>
                <Popup content='Upload' position='bottom center' trigger={
                    <Icon color={"blue"} name="upload" style={{cursor: 'pointer'}} />
                } />
            </span>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        <Header icon="upload" content="Uploading" />
        <Modal.Content>
            <UploadComponent path={path} setOpen={setOpen} />
        </Modal.Content>
    </Modal>
    )
}

export default UploadModal
