import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'

const Error404 = () => {
    return (
        <div className="c-container">
            <Segment placeholder>
                <Header icon style={{color: '#f7f7f7'}}>
                    <Icon name='search' />
                    Nothing was found on this page.
                </Header>
            </Segment>
        </div>
    )
}

export default Error404