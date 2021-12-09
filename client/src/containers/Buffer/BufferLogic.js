import { useEffect, useState, useRef, useContext } from "react"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { baseURL } from "../../api/baseURL"
import { v4 as uuidv4 } from 'uuid'
import saveBuffer from "../../context/actions/notes/saveBuffer"
import { CONNECTION_ERROR } from "../../constants/api"
import getBuffer from "../../context/actions/notes/getBuffer"
import deleteBuffer from "../../context/actions/notes/deleteBuffer"
import {GlobalContext} from "../../context/Provider"
import createNote from "../../context/actions/notes/createNote"
import { toast } from 'react-toastify'

export default () => {
    const {notesState, notesDispatch} = useContext(GlobalContext)
    const [isConnected, setConnected] = useState(false)
    const [text, setText] = useState("")
    const [isSavedBuffer, setSavedBuffer] = useState(false)
    const [open, setOpen] = useState(false)
    const [noteName, setNoteName] = useState("")
    const webSocket = useRef(null); 

    const formInvalid=!noteName?.length
    const formIsHalfFillef = noteName.length > 0

    const onChange = (e, {value}) => {
        setText(value)
        if(isConnected){
            webSocket.current.send(value)
            e.preventDefault()
        }
    }

    const clearText = (e) => {
        setText("")
        if(isConnected){
            webSocket.current.send("")
            e.preventDefault()
        }
    }

    const saveBufferToRemote = async () => {
        const response =  await saveBuffer(text)
        if(response === CONNECTION_ERROR){
            toast.error("Failed.")
            return
        }
        setSavedBuffer(true)
        toast.success("Buffer saved!")
    }

    const deleteBufferFromRemote = async () => {
        const response = await deleteBuffer()
        if(response === CONNECTION_ERROR){
            toast.error("Failed.")
            return
        }
        setSavedBuffer(false)
        toast.success("Buffer deleted!")
    }

    const addNote = () => {
        createNote({'name': noteName, 'content': text})(notesDispatch)
        setOpen(false)
        setNoteName('')
    }

    const onChangeNewNoteName = (e, {value}) => {
        setNoteName(value)
    }

    useEffect(() => {
        const id = uuidv4()
        const url = baseURL.replace('http', 'ws')
        const token = localStorage.token?localStorage.token:''
        webSocket.current = new W3CWebSocket(`${url}/ws/${id}/${token}`)
        if(!isConnected){
            webSocket.current.onopen = async () => {
                setConnected(true)
                const buffer = await getBuffer()
                if(buffer !== undefined && buffer !== CONNECTION_ERROR ){
                    setText(buffer.content)
                    setSavedBuffer(true)
                }
            }
            webSocket.current.onmessage = (message) => {
                setText(message.data)
            }      
            webSocket.current.onerror = (error) => {
                setConnected(false)
            } 
            webSocket.current.onclose = () => {
                setConnected(false)
            } 
        }
        return () => {
            webSocket.current.close()
        }
    },[])

    return {
        onChange,
        isConnected,
        text,
        clearText,
        saveBufferToRemote,
        isSavedBuffer,
        deleteBufferFromRemote,
        notesState,
        open,
        setOpen,
        formInvalid,
        formIsHalfFillef,
        noteName,
        onChangeNewNoteName,
        addNote
    }
}