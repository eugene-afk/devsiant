import React, { useContext, useState, useEffect } from 'react'
import { Prompt } from 'react-router-dom'
import { Form, TextArea, Button } from 'semantic-ui-react'
import clearCreateProject from '../../context/actions/projects/clearCreateProject'
import clearEditProject from '../../context/actions/projects/clearEditProject'
import CreateProject from '../../context/actions/projects/CreateProject'
import editProject from '../../context/actions/projects/editProject'
import { GlobalContext } from '../../context/Provider'

function CreateProjectForm({closeModal, pwd = null}) {
    const {pwdsState: {addPWD: {loading, error, data}}, pwdsDispatch} = useContext(GlobalContext)
    const [pwdData, setPWDData] = useState({'name': '', 'desc': ''})
    const onChange = (e, {name, value}) => {
        setPWDData({...pwdData, [name]: value})
    }
    const onSubmit = () =>{
        if(pwd){
            edit()
            return
        }
        create()
    }
    const create = () => {
        CreateProject(pwdData)(pwdsDispatch)
        clearCreateProject()(pwdsDispatch)
        closeModal()
    }
    const edit = () => {
        editProject(pwdData)(pwdsDispatch)
        clearEditProject(pwdData)(pwdsDispatch)
        closeModal()
    }
    const formInvalid=!pwdData.name?.length
    const formIsHalfFillef = Object.values(pwdData).filter((item) => item && item !== "").length > 0

    useEffect(() => {
        if(pwd){
            setPWDData(pwd)
        }
    }, []);

    return (
        <div>
            <Prompt when={formIsHalfFillef} message="Looks like you didn't save changes, leave now?" />
            <Form onSubmit={onSubmit} autoComplete="off">
                <Form.Field>
                    <Form.Input placeholder='Name' name="name" onChange={onChange} autoFocus value={pwdData.name} />
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder='Description' name="desc" onChange={onChange} value={pwdData.desc} />
                </Form.Field>

                <Button type="submit" loading={loading} disabled={formInvalid || loading} primary type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default CreateProjectForm
