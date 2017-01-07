import React from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

import MenuLeftCtrl from './main.ctrl';


export default class MenuLeft extends MenuLeftCtrl {
    state = {};
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
        this.session = this.props.store.getState().session;
    }
    handleItemClick = (e, { href }) => {
        e.preventDefault();
        this.props.router.push(href);
    }
    render = function() {
        const session = (() => {
            if (this.props.params.user && this.props.store.getState().usuario)
                return this.props.store.getState().usuario;
            return this.props.store.getState().session;
        })();
        const fullname = session.nombres + ' ' + session.apellidos;
        const prev = session !== this.session ? '/' + session.usuario: '';
        return (
            <div style={{margin:15}}>
                <Menu vertical>
                    <Menu.Item>
                        <Link to={prev + '/galery'}>
                            <Image src='/static/svg/user-3.svg' fluid />
                        </Link>
                        <br />
                        <Link to={'/' + session.usuario + '/news'}>{fullname}</Link><br />
                        <Link to={prev + '/profile'}>Perfil</Link>
                    </Menu.Item>
                    <Menu.Item as="a" href={prev + "/news"} onClick={this.handleItemClick}>
                        Noticias
                    </Menu.Item>
                    <Menu.Item as="a" href={prev + "/friends"} onClick={this.handleItemClick}>
                        Amigos
                    </Menu.Item>
                    <Menu.Item as="a" href={prev + "/groups"} onClick={this.handleItemClick}>
                        Grupos
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}