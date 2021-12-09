import React from 'react'
import { Button } from 'semantic-ui-react'

const SimpleUpload = ({fileChange}) => {
    const fileInputRef = React.createRef()

    return (
        <div> 
        <Button
            primary
            content="Import CSV"
            labelPosition="left"
            icon="file"
            onClick={() => fileInputRef.current.click()}
        />
        <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={fileChange}
        />
    </div> 
    )
}

export default SimpleUpload
