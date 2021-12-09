import React, { useContext, useState } from 'react'
import { Menu, Image, Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { GlobalContext } from '../../context/Provider'
import logout from '../../context/actions/logout'
import isAuthenticated from '../../utils/isAuthenticated'
import MenuComponent from '../Side-Menu/MenuComponent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const history = useHistory()
    const {pwdsDispatch: dispatch} = useContext(GlobalContext)
    const { authDispatch } = useContext(GlobalContext)
    const [menuVisible, setMenuVisible] = useState(false)

    const handleUserLogOut = () => {
        if(isAuthenticated()){
            logout(history)(dispatch)(authDispatch)
            return
        }
        history.push('/login')
    }

    const handleMenuBtnClick = () => {
        setMenuVisible(true)
    }

    return (
        <div>
            <ToastContainer />  
            <div className="ui stuck-container fixed-container">
                <div style={{height: 61.6875}}>
                    <div className="ui fixed top sticky" style={{width: '100%'}}>
                        <Menu secondary color={"blue"} inverted style={{height: 61.6875}}>
                            <div className="mobile-menu-btn" style={{width: '4rem'}}></div>
                            <Icon className="mobile-menu-btn" name="bars" onClick={handleMenuBtnClick} style={
                                {
                                    position: 'absolute',
                                    top: '1.5rem', 
                                    left: '1rem', 
                                    fontSize: '2rem',
                                    cursor: 'pointer'
                                }
                            } />
                            <Image src={logo} height={60} style={{marginLeft: '1.7rem', padding: '4px'}} />
                            {/* <Menu.Item className="header-title">devsiant</Menu.Item> */}
                            <Menu.Item position="right" style={{marginRight: '1.5rem', paddingRight: 0}}>
                                <Button className="computer only column" onClick={() => handleUserLogOut()}>
                                    {isAuthenticated()?'Logout':'Login'}
                                </Button>
                        </Menu.Item>
                    </Menu>
                    </div>
                </div>
            </div>

            <MenuComponent menuVisible={menuVisible} setMenuVisible={setMenuVisible} />

        </div>
    )
}

export default Header
