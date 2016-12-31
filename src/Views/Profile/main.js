import React from 'react';

import { Menu, Segment } from 'semantic-ui-react'

import ProfileCtrl from './main.ctrl';
import Basic from './basic';
import Contact from './contact';
import Interests from './interests';

const Views = {
    Basico: (store) => <Basic store={store} />,
    Contacto: (store) => <Contact store={store} />,
    Intereses: (store) => <Interests store={store} />
}

export default class Profile extends ProfileCtrl {
    state = { activeItem: 'Basico' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state;
        const activeView = Views[activeItem](this.props.store);
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item name='Basico' active={activeItem === 'Basico'} onClick={this.handleItemClick} />
                    <Menu.Item name='Contacto' active={activeItem === 'Contacto'} onClick={this.handleItemClick} />
                    <Menu.Item name='Intereses' active={activeItem === 'Intereses'} onClick={this.handleItemClick} />
                </Menu>
                <Segment>
                    {activeView}
                </Segment>
            </div>
        );
    }
}

//<img src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />