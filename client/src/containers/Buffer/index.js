import React from 'react'
import BufferUI from '../../layout/Buffer'
import NotesUI from '../../layout/Buffer/NotesUI'
import BufferLogic from './BufferLogic'
import NotesLogic from './NotesLogic'

const BufferContainer = () => {
    return (
        <div>
            <BufferUI Logic={BufferLogic()} />
            <NotesUI Logic={NotesLogic()} />
        </div>
    ) 
}

export default BufferContainer
