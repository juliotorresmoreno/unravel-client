import React from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

import MenuLeftCtrl from './index.ctrl';


export default class MenuLeft extends MenuLeftCtrl {
    state = {};
    constructor(args) {
        super(args);
        this.render = this.render.bind(this);
        this.session = this.props.store.getState().session;
        this.props.route.store.subscribe(this, ['fotoPerfil'], "MenuLeft");
    }
    handleItemClick = (e, { href }) => {
        e.preventDefault();
        this.props.router.push(href);
    }
    getSession = () => {
        if (this.props.params.user && this.props.store.getState().usuario)
            return this.props.store.getState().usuario;
        return this.props.store.getState().session;
    }
    render = function() {
        const session = this.getSession();
        const store = this.props.store;
        const fullname = session.nombres + ' ' + session.apellidos;
        const prev = session !== this.session ? '/' + session.usuario: '';
        const random = Math.random() * 9000 + 1000;
        const url = store.getState().config.api + "/galery/fotoPerfil" + prev +
                    "?token=" + store.getState().session.token +
                    "&t=" + random;
        return (
            <div className="MenuLeft" style={{margin:15}}>
                <Menu vertical>
                    <Menu.Item>
                        <Link to={prev + '/galery'}>
                            <Image src={url} fluid />
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