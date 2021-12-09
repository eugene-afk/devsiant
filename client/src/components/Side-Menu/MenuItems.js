import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const MenuItems = ({activeItem, handleItemClick}) => {

    return (
        <div style={{padding: 0}}>
            <Menu.Item
            as={Link}
            to="/"
            name='buffer'
            active={activeItem.activeItem === 'buffer'}
            onClick={handleItemClick}
            >
                <Icon name='copy' />
                Buffer
            </Menu.Item>

            <Menu.Item
            as={Link}
            to="/pwds"
            name='pwds'
            active={activeItem.activeItem === 'pwds'}
            onClick={handleItemClick}
            >
                <Icon name='lock' />
                Passwords
            </Menu.Item>

            <Menu.Item
            as={Link}
            to="/filem"
            name='filem'
            active={activeItem.activeItem === 'filem'}
            onClick={handleItemClick}
            >
                <Icon name='file' />
                Files
            </Menu.Item>   
        </div>
    )
}

export default MenuItems
