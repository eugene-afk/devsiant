import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { List, Placeholder, Container, Segment, Image, Popup, Icon, Modal, Header, Message, Input, Button } from 'semantic-ui-react'
import SimpleUpload from '../../components/Upload/SimpleUpload'
import deleteProject from '../../context/actions/projects/deleteProject'
import favoriteProject from '../../context/actions/projects/favoriteProject'
import searchProjects from '../../context/actions/projects/searchProjects'
import GetProjects from '../../context/actions/projects/GetProjects'
import { GlobalContext } from '../../context/Provider'
import CreateProjectForm from './CreateProjectForm'
import { toast } from 'react-toastify'
import importCSV from '../../context/actions/projects/importCSV'
import { baseURL } from '../../api/baseURL'

function PwdsList({state: {pwds: {loading, isSearchActive, foundPWDS, error, data}}, delState, editState, addState, favoriteState}) {
    const {pwdsDispatch: dispatch} = useContext(GlobalContext)
    const [edit, setEdit] = useState(false)
    const [pwdEdit, setPWDEdit] = useState({})
    const history = useHistory()
    const pwdClick = (id, name) => {
        history.push({
            pathname: `/pwds/${id}`,
            state: {'detail': name}
        })
    }
    const [open, setOpen] = useState(false)
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

    const onChange = (e, {value}) => {
        const searchText = value.trim().replace(/" "/g, "")
        searchProjects(searchText)(dispatch)
    }

    const handleDeleteProject = (id) => {
        deleteProject(id)(dispatch)
    }

    const setFavorite = (id) => {
        favoriteProject(id)(dispatch)
    }

    const importProjects = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("file", file);
        await importCSV(formData, toast, 'projects')
        GetProjects(history)(dispatch)
    }

    const exportProjects = () => {
        window.open(`${baseURL}/reports/export/projects?token=${localStorage.token?localStorage.token:''}`, '_blank');
    }

    const currentPWDS = isSearchActive?foundPWDS:data

    return (
        <Container>

            <div className="c-container">
                <Header as='h2' inverted>
                    <Icon name='lock' />
                    <Header.Content style={{textAlign: 'left'}}>
                        Accounts Manager
                    <Header.Subheader>You can store here credentials for your local development projects</Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment color={"blue"} inverted><strong>Important! </strong> Please do <strong>NOT</strong> store here your real logins and passwords. 
                It's only for local development.</Segment>
                {!loading && (
                    <div>
                        <Input icon='search' placeholder='Search...' name='search' onChange={onChange} autoComplete="off"
                        style={{
                            width: '100%',
                            marginBottom: '1rem' 
                        }} />
                    </div>
                )}

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
                    <Header icon={edit?'edit':'add'} content={edit?'Editing ' + pwdEdit.name:'Adding new project'} />
                    <Modal.Content>
                        <CreateProjectForm closeModal={closeModal} pwd={edit?pwdEdit:null} />
                    </Modal.Content>
                </Modal>

                {!loading && (error || delState.error || editState.error || addState.error || favoriteState.error) && (
                    <Message
                        content={'Could not connect. Try again later.'}
                        color={'red'}
                    />
                )}

                {!loading && currentPWDS.length === 0 && (
                    <Message
                        content={'Looks like no items was found.'}
                    />
                )}
                <div style={{display: 'flex', marginBottom: '1rem', justifyContent: 'center'}}>
                    <SimpleUpload fileChange={importProjects} />
                    {!loading && !error && currentPWDS.length > 0 && (
                            <div>
                                <Button
                                    color={"green"}
                                    content="Export CSV"
                                    labelPosition="left"
                                    icon="file"
                                    onClick={exportProjects}
                                />
                            </div>
                        
                    )}
                </div>

                <List selection animated verticalAlign='middle' inverted style={{textAlign: 'left', fontSize: 24, marginTop: 0}} divided>
                    {currentPWDS.length > 0 && currentPWDS.map((pwd) => 
                        <List.Item key={pwd.id} disabled={pwd.deleting || pwd.busy}>
                            <List.Content floated='right'>

                                <Popup content='Favorite' position='bottom center' trigger={
                                    <Icon name={pwd.favorite?'star':'star outline'} onClick={() => setFavorite(pwd.id)} color={"yellow"} style={{marginLeft: 8}} />
                                } />

                                <Popup content='Edit' position='bottom center' trigger={
                                    <Icon name='edit' color={"blue"} onClick={() => openModalAsEdit(pwd)} style={{marginLeft: 8}} />
                                } />

                                <Popup content='Delete' position='bottom center' trigger={
                                    <Icon name='trash' color={"red"} onClick={() => handleDeleteProject(pwd.id)} style={{marginLeft: 8}} />
                                } />
                                
                            </List.Content>
                            <Popup
                                content={pwd.desc?pwd.desc:"No Desc."}
                                position='bottom center'
                                trigger={
                                        <List.Content onClick={() => pwdClick(pwd.id, pwd.name)}>
                                        <List.Header>
                                            <Image avatar src='https://image.flaticon.com/icons/png/512/2943/2943210.png' floted="left" onClick={() => pwdClick(pwd.id)} />
                                            <span style={{wordBreak: 'break-all', overflow: 'hidden'}}>{pwd.name}</span> 
                                        </List.Header>
                                        </List.Content>
                                }
                            >

                            </Popup>
                        </List.Item>
                    )}
                </List>

                {loading && currentPWDS.length === 0 && <>
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

export default PwdsList
