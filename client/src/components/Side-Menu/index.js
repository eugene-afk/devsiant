import React from 'react'
import { Menu } from 'semantic-ui-react'
import MenuItems from './MenuItems';

const SideMenu = ({activeItem, handleItemClick}) => {
    
    return (
        <Menu className="computer only grid" icon='labeled' vertical 
                style={{
                    position: "fixed",
                    top: 61.69, 
                    left: 0, 
                    margin: 0, 
                    borderRadius: 0, 
                    width: "7rem", 
                    height: "calc(100% - 61.6875px)"}} 
                    color={"blue"}
                    inverted
        >

            <MenuItems activeItem={activeItem} handleItemClick={handleItemClick} />

        </Menu>
    )    
}

export default SideMenu
