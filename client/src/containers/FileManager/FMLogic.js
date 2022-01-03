import { useState, useContext } from 'react'
import { baseURL } from '../../api/baseURL'
import getFiles from '../../context/actions/files/getFiles'
import { GlobalContext } from '../../context/Provider'
import { useHistory } from 'react-router-dom'
import { TREE_LOAD_SUCCESS } from '../../constants/actionTypes'
import searchFiles from '../../context/actions/files/searchFiles'
import {PRIVATE_FILES_ROOT_DIRECTORY} from '../../constants/api'

export default () => {
    const {fmState, fmDispatch} = useContext(GlobalContext)
    const history = useHistory()
    const [selectEnable, setSelectEnable] = useState(false)
    const [dir, setDir] = useState({'dir': PRIVATE_FILES_ROOT_DIRECTORY, 'full_dir': ''})
    const [prevTrees, setPrevTrees] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [open, setOpen] = useState(false)

    const goForward = (directory) => {
        if(fmState.tree.isSearchActive){
            fmState.tree.isSearchActive = false
            fmState.tree.foundFiles = []
        }
        setPrevTrees(prevTrees => [...prevTrees, fmState.tree.data])
        let newDir = dir
        newDir.dir = directory
        newDir.full_dir = newDir.full_dir !== ''?`${newDir.full_dir }/${directory}`:directory
        setDir(newDir)
        getFiles(history)(fmDispatch)(dir.full_dir)
        setSelectedFiles([])
        setSelectEnable(false)
    }

    const goBack = () => {
        if(dir.full_dir !== ''){
            if(fmState.tree.isSearchActive){
                fmState.tree.isSearchActive = false
                fmState.tree.foundFiles = []
            }
            const newTree = prevTrees[prevTrees.length - 1]
            const newDirName = Object.keys(newTree)[0]
            const oldDirName = Object.keys(fmState.tree.data)[0]
            console.log(newTree)
            fmDispatch({
                type: TREE_LOAD_SUCCESS,
                payload: newTree
            })
            const arr = prevTrees.filter(item => item !== newTree)
            setPrevTrees(arr)
            let newDir = dir
            newDir.dir = newDirName
            newDir.full_dir = newDir.full_dir.includes("/")?newDir.full_dir.replace(`/${oldDirName}`, ""):newDir.full_dir.replace(oldDirName, "")
            setDir(newDir)
            setSelectedFiles([])
            setSelectEnable(false)

        }
    }

    const refresh = async () => {
        getFiles(history)(fmDispatch)(dir.full_dir)
        setSelectedFiles([])
        setSelectEnable(false)
    }

    const onSearchChange = async (e, {value}) => {
        const searchText = value.trim().replace(/" "/g, "")
        searchFiles(searchText)(fmDispatch)
    }

    const toggleSelect = () => {
        const b = !selectEnable
        if(!b){
            setSelectedFiles([])
        }
        setSelectEnable(b)
    }

    const addToSelectedList = (file) => {
        setSelectedFiles(selectedFiles => [...selectedFiles, file])
    }

    const removeFromSelectedList = (file) => {
        const arr = selectedFiles.filter(item => item !== file)
        setSelectedFiles(arr)
    }

    const downloadMultipleFiles = () => {
        if(selectedFiles.length >= 1){
            let query = `${baseURL}/files/download/multiple?path=${dir.full_dir}&token=${localStorage.token?localStorage.token:''}`
            selectedFiles.map((item) => {
                query += `&f=${item}`
                return item
            })
            window.open(query, '_blank');
            setSelectedFiles([])
            setSelectEnable(false)
        }
    }

    return {
            goForward, 
            goBack,  
            dir, 
            refresh, 
            onSearchChange, 
            selectEnable, 
            toggleSelect, 
            addToSelectedList, 
            removeFromSelectedList, 
            downloadMultipleFiles,
            selectedFiles,
            open,
            setOpen
        }
}