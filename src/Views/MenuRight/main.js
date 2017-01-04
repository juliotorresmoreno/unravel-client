import React from 'react';
import { Menu } from 'semantic-ui-react';

import MenuRightCtrl from './main.ctrl';


export default class MenuRight extends MenuRightCtrl {
    state = {};
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    handleItemClick = (e, { href }) => {
        e.preventDefault();
        this.props.router.push(href);
    }
    render = function() {
        return (
            <div style={{margin:15}}>
                <Menu vertical>
                    <Menu.Item as="a" href="/news" onClick={this.handleItemClick}>
                        Noticias
                    </Menu.Item>
                    <Menu.Item as="a" href="/messages" onClick={this.handleItemClick}>
                        Mensajes
                    </Menu.Item>
                    <Menu.Item as="a" href="/friends" onClick={this.handleItemClick}>
                        Amigos
                    </Menu.Item>
                    <Menu.Item as="a" href="/groups" onClick={this.handleItemClick}>
                        Grupos
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}