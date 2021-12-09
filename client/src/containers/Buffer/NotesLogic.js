import {useEffect, useContext, useState} from 'react'
import getNotes from '../../context/actions/notes/getNotes'
import { GlobalContext } from '../../context/Provider'

export default () => {
    const {notesState, notesDispatch} = useContext(GlobalContext)
    const [open, setOpen] = useState(false)
    const [editItem, setEditItem] = useState({})

    const openEditModal = (item) => {
        setEditItem(item)
        setOpen(true)
    }

    useEffect(() => {
        getNotes(notesDispatch)
        return () => {

        }
    }, [])

    return{
        notesState,
        open,
        setOpen,
        editItem,
        setEditItem,
        openEditModal
    }

}