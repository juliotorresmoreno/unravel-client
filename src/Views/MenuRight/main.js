import React from 'react';
import { Image, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

import MenuCtrl from './main.ctrl';


export default class MenuRight extends MenuCtrl {
    state = {};
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
    }
    handleItemClick = (e, { href }) => {
        e.preventDefault();
        this.props.router.push(href);
    }
    toGalery = (e) => {
        e.preventDefault();
        alert('sd');
    }
    render = function() {
        const session = this.props.store.getState().session;
        const fullname = session.nombres + ' ' + session.apellidos;
        return (
            <div style={{margin:15}}>
                <Menu vertical>
                    <Menu.Item>
                        <Link to={'/galery'}>
                            <Image src='/static/svg/user-3.svg' fluid />
                        </Link>
                        <br />
                        <Link to={'/'+session.usuario+'/news'}>{fullname}</Link><br />
                        <Link to={'/profile'}>Perfil</Link>
                    </Menu.Item>
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