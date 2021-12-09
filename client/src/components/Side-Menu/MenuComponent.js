import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import SideMenu from '../Side-Menu'
import MobileMenu from '../Side-Menu/MobileMenu'

const MenuComponent = ({menuVisible, setMenuVisible}) => {
    const {authState} = useContext(GlobalContext)
    const [activeItem, setActiveItem] = useState({})
    
    const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })

    useEffect(() => {
        setActiveItem({activeItem: window.location.pathname.split("/")[1]?window.location.pathname.split("/")[1]:'buffer'})
        return () => {
         
        }
    }, [authState.auth.data])

    return (
        <div>
            <SideMenu activeItem={activeItem} handleItemClick={handleItemClick} />
            <MobileMenu visible={menuVisible} setVisible={setMenuVisible} activeItem={activeItem} handleItemClick={handleItemClick} />
        </div>
    )
}

export default MenuComponent
