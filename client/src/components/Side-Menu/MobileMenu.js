import { Menu, Sidebar } from 'semantic-ui-react'
import MenuItems from './MenuItems'

const MobileMenu = ({visible, setVisible, activeItem, handleItemClick}) => {

    return (
            <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            color={"blue"}
            style={{
                position: "fixed",
                    top: 61.69, 
                    left: 0, 
                    margin: 0, 
                    borderRadius: 0, 
                    width: "7rem", 
                    height: "calc(100% - 61.6875px) !important"
                }} 
            >
                <MenuItems activeItem={activeItem} handleItemClick={handleItemClick} />
            </Sidebar>
    )
}

export default MobileMenu
