import React, { useContext, useState, useEffect } from 'react'
import { Prompt, useParams } from 'react-router-dom'
import { Form, TextArea, Button } from 'semantic-ui-react'
import clearCreateProjectItem from '../../context/actions/projects/clearCreateProjectItem'
import clearEditProjectItem from '../../context/actions/projects/clearEditProjectItem'
import createProjectItem from '../../context/actions/projects/createProjectItem'
import editProjectItem from '../../context/actions/projects/editProjectItem'
import { GlobalContext } from '../../context/Provider'

function CreateProjectItemForm({closeModal, pwdItem = null}) {
    const { id } = useParams();
    const {pwdState: {addPWDItem: {loading, error, data}}, pwdDispatch} = useContext(GlobalContext)
    const [pwdItemData, setPWDItemData] = useState({'name': '', 'password': '', 'login': '', 'desc': ''})
    const onChange = (e, {name, value}) => {
        setPWDItemData({...pwdItemData, [name]: value})
    }
    const onSubmit = () =>{
        if(pwdItem){
            edit()
            return
        }
        create()
    }
    const create = () => {
        createProjectItem(pwdItemData)(pwdDispatch)(id)
        clearCreateProjectItem()(pwdDispatch)
        closeModal()
    }
    const edit = () => {
        editProjectItem(pwdItemData)(pwdDispatch)
        clearEditProjectItem()(pwdDispatch)
        closeModal()
    }
    const formInvalid=!pwdItemData.name?.length||!pwdItemData.login?.length||!pwdItemData.password?.length 
    const formIsHalfFillef = Object.values(pwdItemData).filter((item) => item && item !== "").length > 0

    useEffect(() => {
        if(pwdItem){
            setPWDItemData(pwdItem)
        }
    }, []);

    return (
        <div>
            <Prompt when={formIsHalfFillef} message="Looks like you didn't save changes, leave now?" />
            <Form onSubmit={onSubmit} autoComplete="off">
            <Form.Field>
                <Form.Input placeholder='Name' name="name" onChange={onChange} autoFocus value={pwdItemData.name} />
            </Form.Field>
            <Form.Field>
                <Form.Input placeholder='Login' name="login" onChange={onChange} value={pwdItemData.login} />
            </Form.Field>
            <Form.Field>
                <Form.Input type="password" placeholder='Password' name="password" onChange={onChange} value={pwdItemData.password} />
            </Form.Field>
            <Form.Field>
                <TextArea placeholder='Description' name="desc" onChange={onChange} value={pwdItemData.desc} />
            </Form.Field>

            <Button type="submit" loading={loading} disabled={formInvalid || loading} primary type='submit'>Submit</Button>
        </Form>
        </div>
    )
}

export default CreateProjectItemForm