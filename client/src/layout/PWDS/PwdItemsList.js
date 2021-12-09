import React, { useState, useContext, useEffect } from 'react'
import { List, Placeholder, Container, Card, Grid, Header, Modal, Icon, Message, Popup, Button } from 'semantic-ui-react'
import deleteProjectItem from '../../context/actions/projects/deleteProjectItem'
import { GlobalContext } from '../../context/Provider'
import CreateProjectItemForm from './CreateProjectItemForm'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useLocation, useParams} from "react-router-dom";
import getProjectName from '../../context/actions/projects/getProjectName'
import { CONNECTION_ERROR } from '../../constants/api'
import { toast } from 'react-toastify'
import importCSV from '../../context/actions/projects/importCSV'
import SimpleUpload from '../../components/Upload/SimpleUpload'
import GetProject from '../../context/actions/projects/GetProject'
import { baseURL } from '../../api/baseURL'
import { useHistory } from 'react-router-dom'

function PwdItemsList({state: {pwd: {loading, error, data}}, delState, editState, addState}) {
    const {pwdDispatch} = useContext(GlobalContext)
    const [edit, setEdit] = useState(false)
    const [pwdEdit, setPWDEdit] = useState({})
    const [open, setOpen] = useState(false)
    const [showPasswordID, setShowPassword] = useState([])
    const location = useLocation()
    const [projectName, setProjectName] = useState("")
    const history = useHistory()
    let id = useParams()

    const showPassword = (id) => {
        if(!showPasswordID.includes(id)){
            setShowPassword(showPasswordID => [...showPasswordID, id])
            return
        }
        const arr = showPasswordID.filter(item => item !== id)
        setShowPassword(arr)
    }
    const closeModal = () =>{
        setOpen(false)
        if(edit){
            setEdit(false)
            setPWDEdit({})
        }
    }
    const openModalAsEdit = (pwd) => {
        setPWDEdit(pwd)
        setEdit(true)
        setOpen(true)
    }

    const handleDeleteItem = (id) => {
        deleteProjectItem(id)(pwdDispatch)
    }

    const importProjectItems = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("file", file);
        await importCSV(formData, toast, `projectitems?project_id=${id.id}`)
        GetProject(id.id, history)(pwdDispatch)
    }

    const exportProjectItems = () => {
        window.open(`${baseURL}/reports/export/projectitems?token=${localStorage.token?localStorage.token:''}&project_id=${id.id}`, '_blank');
    }
    
    useEffect(async () => {
        if(location.state !== undefined){
            setProjectName(location.state.detail)
            document.title = location.state.detail
            return
        }
        const name = await getProjectName(id)
        if(name === CONNECTION_ERROR){
            return
        }
        document.title = name.name
        setProjectName(name.name)
    }, [])

    return (
        <Container>

            <div className="c-container">
            <Header as='h2' inverted>
                    <Icon name='lock' />
                    <Header.Content style={{textAlign: 'left'}}>
                        {projectName}
                    <Header.Subheader>Here you can add credentials for single project</Header.Subheader>
                    </Header.Content>
            </Header>
            <Modal
                    closeIcon
                    open={open}
                    trigger={
                        <div style={{marginBottom: '0.5rem', display: "flex", justifyContent: "center"}}>
                            <Popup content='Add' position='bottom center' trigger={
                                    <Icon name='add' color={"green"} style={{fontSize: "2rem", cursor: "pointer"}} />
                            } />
                        </div>
                    }
                    onClose={() => {
                                    setOpen(false)
                                    if(edit){setEdit(false)
                                            setPWDEdit({})
                                            }
                                    
                                }}
                    onOpen={() => setOpen(true)}
                    >
                    <Header icon={edit?'edit':'add'} content={edit?'Editing ' + pwdEdit.name:'Adding new item'} />
                    <Modal.Content>
                        <CreateProjectItemForm closeModal={closeModal} pwdItem={edit?pwdEdit:null} />
                    </Modal.Content>
                </Modal>
                
                {!loading && (error || delState.error || editState.error || addState.error) && (
                    <Message
                        content={'Could not connect. Try again later.'}
                        color={'red'}
                    />
                )}

                {!loading && data.length === 0 && (
                    <Message
                        content={'Looks like no items was found.'}
                    />
                )}

                <div style={{display: 'flex', marginBottom: '1rem', justifyContent: 'center'}}>
                    <SimpleUpload fileChange={importProjectItems} />
                    {!loading && !error && data.length > 0 && (
                        <div>
                            <Button
                                color={"green"}
                                content="Export CSV"
                                labelPosition="left"
                                icon="file"
                                onClick={exportProjectItems}
                            />
                        </div>
                    )}
                </div>

                <Grid container style={{marginLeft: 0}}>
                    {data.length > 0 && data.map((pwd) => 
                        <Grid.Column key={pwd.id} mobile={16} computer={8}>
                            <Card fluid color='red' style={{height: '100%'}}>
                                <Card.Content header={pwd.name} style={{display: 'flex', alignSelf: 'center', alignItems: 'center'}} />
                                <Card.Content description={pwd.desc?pwd.desc:'No Desc.'} />
                                <Card.Content>
                                <List verticalAlign='middle' divided style={{color: '#222', fontSize: "1.5rem"}}>
                                    <List.Item key={`${pwd.id}-login`} disabled={pwd.deleting}>
                                        <List.Icon name='user circle' />
                                        <List.Content style={{textAlign: 'left'}}>{pwd.login}</List.Content>

                                        <Popup content='Copy' position='bottom center' trigger={
                                            <CopyToClipboard text={pwd.login}>
                                                <List.Icon name='copy' color={"blue"} style={{cursor: 'pointer'}} />                                        
                                            </CopyToClipboard>
                                        } />

                                    </List.Item>
                                    <List.Item key={`${pwd.id}-pw`} disabled={pwd.deleting}>
                                        <List.Icon name='lock' />
                                        <List.Content style={{textAlign: 'left'}}>
                                            {showPasswordID.includes(pwd.id)?pwd.password:'••••••••••'}
                                        </List.Content>

                                        <Popup content='Show password' position='bottom center' trigger={
                                            <List.Icon name='eye' color={"grey"} style={{cursor: 'pointer', paddingRight: "1rem"}} onClick={() => showPassword(pwd.id)} />
                                        } />

                                        <Popup content='Copy' position='bottom center' trigger={
                                            <CopyToClipboard text={pwd.password}>
                                                <List.Icon name='copy' color={"blue"} style={{cursor: 'pointer'}} />
                                            </CopyToClipboard>
                                        } />

                                    </List.Item>
                                    <List.Item style={{display: "flex", justifyContent: "center"}} key={`${pwd.id}-actions`} disabled={pwd.deleting}>

                                        <Popup content='Edit' position='bottom center' trigger={
                                            <List.Icon name='edit' onClick={() => openModalAsEdit(pwd)} color={"blue"} style={{cursor: 'pointer', marginRight: "0.7rem"}} />
                                        } />

                                        <Popup content='Delete' position='bottom center' trigger={
                                            <List.Icon name='trash' onClick={() => handleDeleteItem(pwd.id)} color={"red"} style={{cursor: 'pointer'}} />
                                        } />
                                        
                                    </List.Item>
                                </List>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    )}
                </Grid>

                {loading && data.length == 0 && <> 
                {" "}
                <Placeholder fluid>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                </>} 
            </div>

        </Container>
    )
}

export default PwdItemsList
